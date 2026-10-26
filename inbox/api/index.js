'use strict';

// One function for the whole inbox (Hobby plan). Routes are selected with ?r=..., e.g. /api?r=cards.
//   Owner (session cookie):  login, logout, me, cards, decide, metrics, metrics-add, brief, settings
//   Machine (Bearer INBOX_TOKEN):  m/cards, m/decisions, m/ack, m/notify, m/delete, m/brief

const Store = require('../lib/store.js');
const Auth = require('../lib/auth.js');
const Cards = require('../lib/cards.js');
const Notify = require('../lib/notify.js');

const HOT_MAX_PER_DAY = 3;
let store = null;

function send(res, code, body, headers) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  for (const k of Object.keys(headers || {})) res.setHeader(k, headers[k]);
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw = '';
  for await (const c of req) { raw += c; if (raw.length > 200000) throw new Error('too large'); }
  try { return raw ? JSON.parse(raw) : {}; } catch (e) { return {}; }
}

const today = () => new Date().toISOString().slice(0, 10);

async function limit(s, key, max, ttl) { return (await s.incr(key, ttl)) > max; }

async function listCards(s, status) {
  const ids = await s.zrevrange('cards', 0, 199);
  const cards = (await s.mgetJson(ids.map((i) => 'card:' + i))).filter(Boolean);
  return status && status !== 'all' ? cards.filter((c) => c.status === status) : cards;
}

async function handler(req, res, deps) {
  const env = (deps && deps.env) || process.env;
  const s = (deps && deps.store) || (store = store || Store.create());
  const fetchImpl = deps && deps.fetch;
  const url = new URL(req.url, 'http://x');
  const r = url.searchParams.get('r') || '';
  const method = req.method;
  const machine = r.startsWith('m/');

  try {
    if (r === 'login' && method === 'POST') {
      const ip = Auth.ipHash(req, env);
      if (await limit(s, 'rl:login:' + ip, 8, 900)) return send(res, 429, { error: 'too many attempts, wait 15 minutes' });
      const b = await readBody(req);
      if (!Auth.checkPassphrase(b.passphrase, env)) return send(res, 401, { error: 'wrong passphrase' });
      return send(res, 200, { ok: true }, { 'Set-Cookie': Auth.cookieHeader(Auth.makeSession(env)) });
    }
    if (r === 'logout') return send(res, 200, { ok: true }, { 'Set-Cookie': Auth.clearCookie() });

    if (machine) {
      if (!Auth.isMachine(req, env)) return send(res, 401, { error: 'unauthorized' });
      if (await limit(s, 'rl:m:' + today(), 3000, 86400)) return send(res, 429, { error: 'daily machine cap' });
    } else if (!Auth.isOwner(req, env)) {
      return send(res, 401, { error: 'login required' });
    } else if (await limit(s, 'rl:o:' + Math.floor(Date.now() / 60000), 240, 120)) {
      return send(res, 429, { error: 'slow down' });
    }

    if (r === 'me') return send(res, 200, { ok: true, persistent: s.persistent, backend: s.backend });

    if (r === 'cards' && method === 'GET') return send(res, 200, { cards: await listCards(s, url.searchParams.get('status') || 'pending') });

    if (r === 'decide' && method === 'POST') {
      const b = await readBody(req);
      const card = await s.getJson('card:' + b.id);
      if (!card) return send(res, 404, { error: 'no such card' });
      const out = Cards.decide(card, b);
      if (out.error) return send(res, 422, { error: out.error });
      await s.setJson('card:' + card.id, out.card);
      return send(res, 200, { ok: true, card: out.card });
    }

    if (r === 'metrics' && method === 'GET') return send(res, 200, { rows: (await s.getJson('metrics')) || [] });
    if (r === 'metrics-add' && method === 'POST') {
      const b = await readBody(req);
      const rows = (await s.getJson('metrics')) || [];
      const num = (v) => (Number.isFinite(Number(v)) && Number(v) >= 0 ? Number(v) : 0);
      rows.push({ week: String(b.week || today()).slice(0, 10), platform: String(b.platform || '').slice(0, 30), pillar: String(b.pillar || '').slice(0, 30), card: String(b.card || '').slice(0, 64), impressions: num(b.impressions), clicks: num(b.clicks), scans: num(b.scans), waitlist: num(b.waitlist), quotes: num(b.quotes), applications: num(b.applications) });
      await s.setJson('metrics', rows.slice(-2000));
      return send(res, 200, { ok: true });
    }

    if (r === 'brief' && method === 'GET') return send(res, 200, { brief: await s.getJson('brief:latest') });
    if (r === 'settings' && method === 'GET') return send(res, 200, { ntfy_topic: env.NTFY_TOPIC || '', ntfy_server: env.NTFY_SERVER || 'https://ntfy.sh', email: env.OWNER_EMAIL ? 'set' : 'not set', push: env.NTFY_TOPIC ? 'set' : 'not set' });

    // ---- machine routes
    if (r === 'm/cards' && method === 'POST') {
      const b = await readBody(req);
      const out = Cards.normalize(b);
      if (out.error) return send(res, 422, { error: out.error });
      const card = out.card;
      const old = await s.getJson('card:' + card.id);
      if (old && old.status !== 'pending') return send(res, 409, { error: 'card already decided', status: old.status });
      let hot = card.hot;
      if (hot && card.type === 'social') {
        const n = await s.incr('hot:' + today(), 172800);
        if (n > HOT_MAX_PER_DAY) { hot = false; card.hot_capped = true; }
      }
      card.hot = hot;
      await s.setJson('card:' + card.id, old ? Object.assign({}, old, card, { created: old.created }) : card);
      if (!old) await s.zadd('cards', Date.now(), card.id);
      if (card.replaces) {
        const prev = await s.getJson('card:' + card.replaces);
        if (prev && prev.status === 'edit_requested') { prev.status = 'superseded'; prev.delivered = true; await s.setJson('card:' + prev.id, prev); }
      }
      let pushed = null;
      if (hot && !old) {
        const link = Notify.inboxUrl(env) + '/#' + card.id;
        pushed = await Notify.push(env, { title: 'HOT: ' + card.title, message: 'Score ' + card.score + '. Open the inbox.', click: link, priority: 'high', tags: 'fire' }, fetchImpl).catch((e) => ({ sent: false, why: 'push failed' }));
      }
      return send(res, 200, { ok: true, id: card.id, hot: hot, push: pushed });
    }

    if (r === 'm/decisions' && method === 'GET') {
      const all = await listCards(s, 'all');
      return send(res, 200, { decisions: all.filter((c) => ['approved', 'rejected', 'edit_requested', 'done'].includes(c.status) && !c.delivered).map((c) => ({ id: c.id, type: c.type, pillar: c.pillar, title: c.title, status: c.status, reason: c.reason || '', note: c.note || '', posted: c.posted || [], decidedAt: c.decidedAt, body: c.status === 'edit_requested' ? c.body : undefined, drafts: c.status === 'edit_requested' ? c.drafts : undefined })) });
    }
    if (r === 'm/ack' && method === 'POST') {
      const b = await readBody(req);
      let n = 0;
      for (const id of (Array.isArray(b.ids) ? b.ids : []).slice(0, 200)) {
        const c = await s.getJson('card:' + id); if (!c) continue;
        c.delivered = true;
        await s.setJson('card:' + id, c); n++;
      }
      return send(res, 200, { ok: true, acked: n });
    }
    if (r === 'm/metrics' && method === 'GET') {
      const all = await listCards(s, 'all');
      const posted = all.filter((c) => c.status === 'done').map((c) => ({ id: c.id, pillar: c.pillar, platforms: c.posted || [], at: c.decidedAt }));
      const counts = {}; for (const c of all) counts[c.status] = (counts[c.status] || 0) + 1;
      return send(res, 200, { rows: (await s.getJson('metrics')) || [], posted: posted, card_status_counts: counts });
    }
    if (r === 'm/delete' && method === 'POST') {
      const b = await readBody(req);
      let n = 0;
      for (const id of (Array.isArray(b.ids) ? b.ids : []).slice(0, 200)) { if (!/^test-/.test(id)) continue; await s.del('card:' + id); await s.zrem('cards', id); n++; }
      return send(res, 200, { ok: true, deleted: n });
    }
    if (r === 'm/brief' && method === 'POST') {
      const b = await readBody(req);
      const brief = { date: today(), subject: String(b.subject || 'Daily brief').slice(0, 150), text: String(b.text || '').slice(0, 20000) };
      await s.setJson('brief:latest', brief);
      const link = Notify.inboxUrl(env) + '/#brief';
      const mail = b.email === false ? { sent: false, why: 'skipped' } : await Notify.email(env, { subject: brief.subject, text: brief.text, link: link }, fetchImpl).catch(() => ({ sent: false, why: 'email failed' }));
      return send(res, 200, { ok: true, email: mail });
    }
    if (r === 'm/notify' && method === 'POST') {
      const b = await readBody(req);
      const link = Notify.inboxUrl(env) + '/';
      const p = await Notify.push(env, { title: String(b.title || 'Growth Desk test').slice(0, 80), message: String(b.message || 'Test push. Nothing to do.').slice(0, 200), click: link }, fetchImpl).catch(() => ({ sent: false, why: 'push failed' }));
      return send(res, 200, { ok: true, push: p });
    }

    return send(res, 404, { error: 'not found' });
  } catch (e) {
    return send(res, 500, { error: 'server error' });
  }
}

module.exports = (req, res) => handler(req, res);
module.exports.handler = handler;
