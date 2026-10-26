#!/usr/bin/env node
'use strict';

// Scan a sampling frame with the Citehound scanner module itself (same scoring code as the site, no second copy, no API quota).
//   node scripts/insight-scan.js <frame.csv> <out.jsonl> [--concurrency 3]
// frame.csv: domain,segment   (segment: saas | agency | prof)
// Needs a copy of the public repo: CITEHOUND_REPO=/path/to/clone (default ../citehound or .cache/citehound).
// Polite by design: robots.txt is read first and a site that disallows our crawler is skipped (and counted as skipped);
// one homepage fetch, one robots.txt, one llms.txt and a sitemap probe per site; a delay between sites; our own honest user agent.
// Raw results stay in this private repo's data/ folder. Nothing here is ever published with a site name.

const fs = require('fs');
const path = require('path');

function findScanner() {
  const cands = [process.env.CITEHOUND_REPO, path.join(__dirname, '..', '.cache', 'citehound'), path.join(__dirname, '..', '..', 'citehound')].filter(Boolean);
  for (const c of cands) { const f = path.join(c, 'lib', 'scanner.js'); if (fs.existsSync(f)) return require(f); }
  throw new Error('scanner not found: clone https://github.com/andacuzel/cited-geo-guide.git into .cache/citehound or set CITEHOUND_REPO');
}

const PLATFORMS = [
  ['wordpress', /wp-content|wp-includes|<meta name="generator" content="WordPress/i], ['shopify', /cdn\.shopify\.com|Shopify\.theme/i], ['webflow', /webflow\.(com|io)|data-wf-(page|site)/i],
  ['wix', /static\.wixstatic\.com|wix-/i], ['squarespace', /squarespace\.com|static1\.squarespace/i], ['framer', /framerusercontent\.com|framer\.com\/m\//i], ['hubspot-cms', /hs-scripts\.com|hubspot\.net|hsforms\.net/i],
  ['ghost', /<meta name="generator" content="Ghost/i], ['nextjs', /__NEXT_DATA__|_next\/static/i], ['gatsby', /___gatsby/i], ['astro', /astro-island|<meta name="generator" content="Astro/i], ['hugo', /<meta name="generator" content="Hugo/i]
];
function platformOf(html) { for (const [n, re] of PLATFORMS) if (re.test(html)) return n; return 'unknown'; }
function cdnOf(h) {
  h = h || {}; const g = (k) => String(h[k] || '');
  if (h['cf-ray'] || /cloudflare/i.test(g('server'))) return 'cloudflare';
  if (h['x-vercel-id'] || /vercel/i.test(g('server'))) return 'vercel';
  if (h['x-amz-cf-id'] || /cloudfront/i.test(g('via'))) return 'cloudfront';
  if (/fastly/i.test(g('via')) || h['x-served-by']) return 'fastly';
  if (/akamai/i.test(g('server')) || h['x-akamai-transformed']) return 'akamai';
  if (/netlify/i.test(g('server'))) return 'netlify';
  return 'other';
}

function robotsFacts(text) {
  const t = String(text || '');
  return {
    cf_managed: /BEGIN Cloudflare Managed|Cloudflare Managed (content|robots)/i.test(t),
    content_signal: (/^\s*Content-Signal:\s*(.+)$/im.exec(t) || [null, ''])[1].trim().slice(0, 120),
    sitemap_lines: (t.match(/^\s*Sitemap:/gim) || []).length,
    ai_rule_groups: (t.match(/^\s*User-agent:\s*(GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|CCBot|Bytespider)\s*$/gim) || []).length,
    disallow_all_star: /User-agent:\s*\*\s*[\r\n]+(?:\s*(?:Crawl-delay|Allow)[^\r\n]*[\r\n]+)*\s*Disallow:\s*\/\s*$/im.test(t)
  };
}

async function scanOne(S, domain, segment, delay) {
  const rec = { domain: domain, segment: segment, at: new Date().toISOString() };
  const origin = 'https://' + domain;
  const UA = S.CRAWLER_UA;
  const rob = await S.fetchText(origin + '/robots.txt', 12000, 'robots.txt', UA);
  if (rob.ok && rob.text && !/^\s*</.test(rob.text)) {
    const parsed = S.parseRobots(rob.text);
    rec.robots = Object.assign({ present: true, served_html: false }, robotsFacts(rob.text));
    if (!S.isPathAllowed('/', 'CitehoundBot', parsed)) { rec.skipped = 'robots_disallow'; return rec; }
  } else if (rob.ok && /^\s*</.test(rob.text || '')) rec.robots = { present: false, served_html: true };
  else if (rob.notFound) rec.robots = { present: false, served_html: false };
  else { rec.robots = { present: false, fetch_failed: rob.status || rob.kind || 'error' }; }
  await new Promise((r) => setTimeout(r, delay));
  const page = await S.fetchText(origin + '/', 12000, 'page', UA);
  if (!page.ok) { rec.ok = false; rec.fail = page.status ? 'http_' + page.status : (page.kind || 'error'); rec.waf_suspect = [401, 403, 429, 503].includes(page.status); return rec; }
  rec.cdn = cdnOf(page.headers); rec.platform = platformOf(page.text || '');
  await new Promise((r) => setTimeout(r, delay));
  const sc = await S.scanPage(origin + '/', { userAgent: UA });
  if (!sc.ok) { rec.ok = false; rec.fail = sc.kind || sc.stage || 'scan_failed'; return rec; }
  rec.ok = true; rec.score = sc.result.total;
  rec.pillars = { discover: sc.result.discover, tech: sc.result.tech, trust: sc.result.trust };
  rec.checks = {}; for (const c of sc.result.checks) rec.checks[c.label.replace(/\s*\(\d+\/\d+ open\)/, '')] = { ok: !!c.ok, pts: c.pts, max: c.max };
  rec.bots = {}; rec.blocked_bots = [];
  for (const b of sc.botResults || []) { rec.bots[b.state] = (rec.bots[b.state] || 0) + 1; if (b.state === 'blocked') rec.blocked_bots.push(b.name); }
  return rec;
}

async function main() {
  const [frame, out] = process.argv.slice(2);
  if (!frame || !out) { console.error('usage: insight-scan.js frame.csv out.jsonl [--concurrency 3]'); process.exit(2); }
  const ci = process.argv.indexOf('--concurrency'); const conc = ci > 0 ? Number(process.argv[ci + 1]) : 3;
  const S = findScanner();
  const done = new Set(fs.existsSync(out) ? fs.readFileSync(out, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l).domain) : []);
  const rows = fs.readFileSync(frame, 'utf8').split('\n').slice(1).map((l) => l.trim().split(',')).filter((r) => /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(r[0]) && !done.has(r[0].toLowerCase()));
  let i = 0; const errlog = console.error; console.error = () => {}; // the scanner logs failed fetches with site names; keep them out of run logs
  async function worker() { while (i < rows.length) { const [d, seg] = rows[i++]; let rec; try { rec = await scanOne(S, d.toLowerCase(), seg || 'unknown', 1500); } catch (e) { rec = { domain: d.toLowerCase(), segment: seg, ok: false, fail: 'exception' }; } fs.appendFileSync(out, JSON.stringify(rec) + '\n'); await new Promise((r) => setTimeout(r, 1500)); } }
  await Promise.all(Array.from({ length: conc }, worker));
  console.error = errlog;
  const all = fs.readFileSync(out, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  console.log(JSON.stringify({ frame: rows.length + done.size, scored: all.filter((r) => r.ok).length, failed: all.filter((r) => r.ok === false).length, skipped_robots: all.filter((r) => r.skipped).length }));
}

module.exports = { platformOf, cdnOf, robotsFacts };
if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
