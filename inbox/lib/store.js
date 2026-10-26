'use strict';

// Three interchangeable backends behind one small interface:
//   Upstash Redis (REST)  when UPSTASH_REDIS_REST_URL/TOKEN (or KV_REST_API_URL/TOKEN) are set
//   Vercel Blob (private) when BLOB_READ_WRITE_TOKEN is set
//   memory                for tests and local runs
// This is a one-person tool: the Blob backend reads, changes and writes whole small JSON files, which is fine for one owner and one agent.

const URL_VARS = ['UPSTASH_REDIS_REST_URL', 'KV_REST_API_URL'];
const TOKEN_VARS = ['UPSTASH_REDIS_REST_TOKEN', 'KV_REST_API_TOKEN'];
const pick = (names) => { for (const n of names) if (process.env[n]) return process.env[n]; return ''; };
const safe = (k) => String(k).replace(/[^a-zA-Z0-9._-]/g, '_');

function memoryPrim() {
  const m = new Map();
  return { async read(p) { return m.has(p) ? m.get(p) : null; }, async write(p, s) { m.set(p, s); }, async remove(p) { m.delete(p); } };
}

function blobPrim() {
  const B = require('@vercel/blob');
  return {
    async read(p) {
      const r = await B.get('gi/' + p, { access: 'private', useCache: false }).catch((e) => { if (/not.?found/i.test(String(e && e.name + e.message))) return null; throw e; });
      if (!r || r.statusCode !== 200) return null;
      return new Response(r.stream).text();
    },
    async write(p, s) { await B.put('gi/' + p, s, { access: 'private', allowOverwrite: true, addRandomSuffix: false, contentType: 'application/json', cacheControlMaxAge: 60 }); },
    async remove(p) { await B.del('gi/' + p).catch(() => {}); }
  };
}

function emulated(prim, persistent) {
  const rd = async (p, d) => { const s = await prim.read(p); if (s === null) return d; try { return JSON.parse(s); } catch (e) { return d; } };
  const wr = (p, v) => prim.write(p, JSON.stringify(v));
  return {
    persistent: persistent,
    async getJson(key) { const e = await rd('kv/' + safe(key), null); if (!e) return null; if (e.exp && e.exp < Date.now()) return null; return e.v; },
    async setJson(key, val, ttl) { return wr('kv/' + safe(key), { v: val, exp: ttl ? Date.now() + ttl * 1000 : 0 }); },
    async del(key) { return prim.remove('kv/' + safe(key)); },
    async incr(key, ttl) {
      const p = 'kv/' + safe(key); let e = await rd(p, null);
      if (!e || (e.exp && e.exp < Date.now())) e = { v: 0, exp: ttl ? Date.now() + ttl * 1000 : 0 };
      e.v = Number(e.v) + 1; await wr(p, e); return e.v;
    },
    async zadd(key, score, member) { const p = 'z/' + safe(key); const z = await rd(p, {}); z[member] = Number(score); return wr(p, z); },
    async zrem(key, member) { const p = 'z/' + safe(key); const z = await rd(p, {}); delete z[member]; return wr(p, z); },
    async zrevrange(key, from, to) { const z = await rd('z/' + safe(key), {}); const s = Object.keys(z).sort((a, b) => z[b] - z[a]); return s.slice(Number(from), Number(to) < 0 ? undefined : Number(to) + 1); },
    async mgetJson(keys) { return Promise.all(keys.map((k) => this.getJson(k))); },
    async sadd(key, m) { const p = 's/' + safe(key); const s = new Set(await rd(p, [])); s.add(m); return wr(p, [...s]); },
    async srem(key, m) { const p = 's/' + safe(key); const s = new Set(await rd(p, [])); s.delete(m); return wr(p, [...s]); },
    async smembers(key) { return rd('s/' + safe(key), []); }
  };
}

function redis(url, token) {
  const exec = async (args) => {
    const r = await fetch(url, { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, body: JSON.stringify(args) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.error) throw new Error('store error');
    return j.result;
  };
  const K = (s) => 'gi:' + s;
  return {
    persistent: true,
    async getJson(key) { const v = await exec(['GET', K(key)]); if (v === null || v === undefined) return null; try { return JSON.parse(v); } catch (e) { return null; } },
    async setJson(key, val, ttl) { return ttl ? exec(['SET', K(key), JSON.stringify(val), 'EX', ttl]) : exec(['SET', K(key), JSON.stringify(val)]); },
    async del(key) { return exec(['DEL', K(key)]); },
    async incr(key, ttl) { const n = await exec(['INCR', K(key)]); if (n === 1 && ttl) await exec(['EXPIRE', K(key), ttl]); return n; },
    async zadd(key, score, member) { return exec(['ZADD', K(key), score, member]); },
    async zrem(key, member) { return exec(['ZREM', K(key), member]); },
    async zrevrange(key, from, to) { return exec(['ZREVRANGE', K(key), from, to]); },
    async mgetJson(keys) { if (!keys.length) return []; const r = await exec(['MGET'].concat(keys.map(K))); return r.map((v) => { try { return v ? JSON.parse(v) : null; } catch (e) { return null; } }); },
    async sadd(key, m) { return exec(['SADD', K(key), m]); },
    async srem(key, m) { return exec(['SREM', K(key), m]); },
    async smembers(key) { return exec(['SMEMBERS', K(key)]); }
  };
}

function create() {
  const url = pick(URL_VARS); const token = pick(TOKEN_VARS);
  if (url && token) return Object.assign(redis(url, token), { backend: 'upstash' });
  if (process.env.BLOB_READ_WRITE_TOKEN) return Object.assign(emulated(blobPrim(), true), { backend: 'blob' });
  return Object.assign(emulated(memoryPrim(), false), { backend: 'memory' });
}

module.exports = { create, emulated, memoryPrim };
