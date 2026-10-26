#!/usr/bin/env node
'use strict';

// Deterministic half of news-watch: fetch the sources in sources.yaml, drop what the desk has seen, print new candidates as JSON.
// The scoring and drafting are done by the scheduled task (a model), which then records its verdicts with `mark`.
//   node scripts/news.js fetch [--hours 6] [--mark-all]   print new candidates; --mark-all records them as seen right away (tests)
//   node scripts/news.js mark <id>=<outcome>[:<score>] ...   outcome: card | hot | skip | opportunity
//   node scripts/news.js health                               sources that failed lately
// No account, no login, no scraping behind a paywall. Feeds are fetched as feeds; a plain web page only if its robots.txt allows it.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const SEEN = path.join(ROOT, 'state', 'seen.json');
const HEALTH = path.join(ROOT, 'state', 'sources-health.json');
const LAST = path.join(ROOT, 'state', 'last-fetch.json');
const UA = 'CitehoundGrowthDesk/1.0 (+https://getcitehound.com; reads public feeds)';
const KEEP_DAYS = 90;

function readJson(f, d) { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return d; } }
function writeJson(f, v) { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(v, null, 1) + '\n'); }

// Minimal reader for sources.yaml (only the shapes used there).
function loadSources(file) {
  const txt = fs.readFileSync(file || path.join(ROOT, 'sources.yaml'), 'utf8');
  const out = [];
  for (const line of txt.split('\n')) {
    const m = /^\s*-\s*\{(.*)\}\s*$/.exec(line);
    if (!m) continue;
    const o = {};
    const re = /(\w+):\s*("(?:[^"\\]|\\.)*"|[^,}]+)/g; let x;
    while ((x = re.exec(m[1]))) o[x[1]] = x[2].trim().replace(/^"|"$/g, '').replace(/\\"/g, '"');
    if (o.id && o.url) out.push(o);
  }
  const opp = /opportunity_only:\s*\[([^\]]*)\]/.exec(txt);
  const oppIds = opp ? opp[1].split(',').map((s) => s.trim()) : [];
  return out.map((s) => Object.assign(s, { opportunity_only: oppIds.includes(s.id) }));
}

const dec = (s) => String(s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&#(\d+);/g, (m, n) => String.fromCharCode(Number(n))).replace(/\s+/g, ' ').trim();

function normUrl(u) {
  try { const x = new URL(u); x.hash = ''; for (const k of [...x.searchParams.keys()]) if (/^(utm_|ref|fbclid|gclid)/i.test(k)) x.searchParams.delete(k); return x.hostname.replace(/^www\./, '') + x.pathname.replace(/\/$/, '') + x.search; } catch (e) { return String(u); }
}
const idOf = (u) => crypto.createHash('sha1').update(normUrl(u)).digest('hex').slice(0, 12);
const words = (t) => new Set(String(t).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 3));
function similar(a, b) { const A = words(a), B = words(b); if (!A.size || !B.size) return 0; let n = 0; for (const w of A) if (B.has(w)) n++; return n / (A.size + B.size - n); }

function parseFeed(xml, source) {
  const items = [];
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) || [];
  for (const b of blocks) {
    const tag = (n) => { const m = new RegExp('<' + n + '[^>]*>([\\s\\S]*?)</' + n + '>', 'i').exec(b); return m ? m[1] : ''; };
    let link = dec(tag('link'));
    if (!link) { const m = /<link[^>]*href=["']([^"']+)["']/i.exec(b); link = m ? m[1] : ''; }
    const title = dec(tag('title'));
    if (!title || !/^https?:\/\//.test(link)) continue;
    const date = dec(tag('pubDate') || tag('published') || tag('updated') || tag('dc:date'));
    items.push({ source: source.id, source_name: source.name, title: title, url: link, published: date ? new Date(date).toISOString() : '', snippet: dec(tag('description') || tag('summary') || tag('content')).slice(0, 400) });
  }
  return items;
}

async function get(url, extra) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 20000);
  try { const r = await fetch(url, { headers: Object.assign({ 'User-Agent': UA, Accept: '*/*' }, extra || {}), signal: ctl.signal, redirect: 'follow' }); return { ok: r.ok, status: r.status, text: r.ok ? (await r.text()).slice(0, 2e6) : '' }; }
  catch (e) { return { ok: false, status: 0, text: '' }; } finally { clearTimeout(t); }
}

async function robotsAllows(url) {
  const u = new URL(url); const r = await get(u.origin + '/robots.txt');
  if (!r.ok) return r.status === 404;
  let applies = false; const dis = [];
  for (const raw of r.text.split('\n')) {
    const l = raw.replace(/#.*/, '').trim(); const m = /^([a-z-]+):\s*(.*)$/i.exec(l); if (!m) continue;
    const k = m[1].toLowerCase();
    if (k === 'user-agent') applies = m[2].trim() === '*'; else if (applies && k === 'disallow' && m[2]) dis.push(m[2]);
  }
  return !dis.some((p) => u.pathname.startsWith(p));
}

async function fromHn(src, hours) {
  const since = Math.floor(Date.now() / 1000) - hours * 3600;
  const queries = ['llms.txt', 'GEO generative engine', 'AI search optimization', 'GPTBot', 'AI crawlers robots.txt', 'ChatGPT search', 'AI Overviews'];
  const seenIds = new Set(); const items = [];
  for (const q of queries) {
    const r = await get('https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=20&numericFilters=created_at_i>' + since + '&query=' + encodeURIComponent(q));
    if (!r.ok) return { ok: false, items: items };
    let j = {}; try { j = JSON.parse(r.text); } catch (e) { return { ok: false, items: items }; }
    for (const h of j.hits || []) {
      if (seenIds.has(h.objectID)) continue; seenIds.add(h.objectID);
      items.push({ source: src.id, source_name: src.name, title: h.title || '', url: 'https://news.ycombinator.com/item?id=' + h.objectID, external_url: h.url || '', published: h.created_at || '', snippet: (h.points || 0) + ' points, ' + (h.num_comments || 0) + ' comments' });
    }
  }
  return { ok: true, items: items };
}

async function fromWeb(src) {
  if (!(await robotsAllows(src.url))) return { ok: false, items: [], why: 'robots.txt disallows' };
  const r = await get(src.url); if (!r.ok) return { ok: false, items: [] };
  const origin = new URL(src.url).origin; const out = []; const seen = new Set();
  const pat = (src.pattern || '/news/').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('<a[^>]+href=["\'](' + pat + '[a-z0-9-]+)["\'][^>]*>([\\s\\S]*?)<\\/a>', 'gi'); let m;
  while ((m = re.exec(r.text))) { const url = origin + m[1]; if (seen.has(url)) continue; seen.add(url); const t = dec(m[2]); if (t.length > 8) out.push({ source: src.id, source_name: src.name, title: t.slice(0, 200), url: url, published: '', snippet: '' }); }
  return { ok: true, items: out };
}

async function fetchAll(o) {
  o = o || {};
  const hours = o.hours || 6;
  const srcs = loadSources(o.sources);
  const seen = readJson(SEEN, { items: {} });
  const health = readJson(HEALTH, {});
  const all = [];
  for (const s of srcs) {
    await new Promise((r) => setTimeout(r, o.noPause ? 0 : 2000));
    let res;
    try {
      if (s.type === 'hn') res = await fromHn(s, hours);
      else if (s.type === 'web') res = await fromWeb(s);
      else { const r = await get(s.url); res = { ok: r.ok, items: r.ok ? parseFeed(r.text, s) : [] }; }
    } catch (e) { res = { ok: false, items: [] }; }
    const h = health[s.id] || { fails: 0 };
    health[s.id] = res.ok ? { fails: 0, last_ok: new Date().toISOString(), last_count: res.items.length } : { fails: h.fails + 1, last_ok: h.last_ok || '', last_count: 0 };
    for (const it of res.items) { it.opportunity_only = !!s.opportunity_only; all.push(it); }
  }
  writeJson(HEALTH, health);

  const cutoff = Date.now() - hours * 3600 * 1000 * 4; // a feed item older than 4 windows is not news for this run
  const recentTitles = Object.values(seen.items).filter((v) => Date.now() - Date.parse(v.first) < 7 * 86400000).map((v) => v.title);
  const batch = new Set(); const fresh = [];
  for (const it of all) {
    it.id = idOf(it.url);
    if (seen.items[it.id] || batch.has(it.id)) continue;
    if (it.published && Date.parse(it.published) < cutoff) continue;
    if (recentTitles.some((t) => similar(t, it.title) >= 0.8)) { it.near_duplicate = true; }
    batch.add(it.id); fresh.push(it);
  }
  const kept = fresh.filter((i) => !i.near_duplicate);
  for (const i of fresh.filter((x) => x.near_duplicate)) seen.items[i.id] = { first: new Date().toISOString(), title: i.title, outcome: 'duplicate-story' };
  if (o.markAll) for (const i of kept) seen.items[i.id] = { first: new Date().toISOString(), title: i.title, outcome: 'seen' };
  for (const k of Object.keys(seen.items)) if (Date.now() - Date.parse(seen.items[k].first) > KEEP_DAYS * 86400000) delete seen.items[k];
  writeJson(SEEN, seen);
  const last = {}; for (const i of kept) last[i.id] = { title: i.title, url: i.url, source: i.source };
  writeJson(LAST, last); // so `mark` can keep the title of what it skips (the daily brief names skipped items)
  return { fetched: all.length, new: kept.length, duplicates_dropped: fresh.length - kept.length, items: kept, failing_sources: Object.keys(health).filter((k) => health[k].fails >= 3) };
}

function mark(args) {
  const seen = readJson(SEEN, { items: {} }); const last = readJson(LAST, {}); let n = 0;
  for (const a of args) {
    const m = /^([a-f0-9]{12})=(card|hot|skip|opportunity)(?::(\d+(?:\.\d+)?))?$/.exec(a); if (!m) continue;
    const cur = seen.items[m[1]] || { first: new Date().toISOString(), title: (last[m[1]] || {}).title || '', source: (last[m[1]] || {}).source || '' };
    seen.items[m[1]] = Object.assign(cur, { outcome: m[2], score: m[3] ? Number(m[3]) : undefined, marked: new Date().toISOString() }); n++;
  }
  writeJson(SEEN, seen); return n;
}

module.exports = { parseFeed, idOf, similar, loadSources, fetchAll, mark };

if (require.main === module) {
  (async () => {
    const [cmd, ...rest] = process.argv.slice(2);
    if (cmd === 'fetch') {
      const hi = rest.indexOf('--hours');
      console.log(JSON.stringify(await fetchAll({ hours: hi >= 0 ? Number(rest[hi + 1]) : 6, markAll: rest.includes('--mark-all') }), null, 1));
    } else if (cmd === 'mark') console.log(JSON.stringify({ marked: mark(rest) }));
    else if (cmd === 'health') console.log(JSON.stringify(readJson(HEALTH, {}), null, 1));
    else { console.error('usage: news.js fetch|mark|health'); process.exit(2); }
  })().catch((e) => { console.error(e.message); process.exit(1); });
}
