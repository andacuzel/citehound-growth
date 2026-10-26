'use strict';
const test = require('node:test');
const assert = require('node:assert');
const Store = require('../lib/store.js');
const Auth = require('../lib/auth.js');
const { handler } = require('../api/index.js');

const env = { INBOX_PASSPHRASE: 'test-pass-phrase', SESSION_SECRET: 'unit-secret', INBOX_TOKEN: 'unit-token', NTFY_TOPIC: 'unit-topic', INBOX_URL: 'https://inbox.test', OWNER_EMAIL: 'me@example.test', RESEND_API_KEY: 'k', PRO_MAIL_FROM: 'Citehound <reports@mail.example.test>' };

function call(store, fetchLog, method, route, o) {
  o = o || {};
  const headers = Object.assign({ 'x-forwarded-for': '1.2.3.4' }, o.headers || {});
  const req = { method, url: '/api?r=' + route, headers, body: o.body };
  const res = { headers: {}, setHeader(k, v) { this.headers[k.toLowerCase()] = v; }, end(b) { this.body = JSON.parse(b); } };
  return handler(req, res, { env: Object.assign({}, env, o.env || {}), store, fetch: async (u, init) => { fetchLog.push({ u, init }); return { ok: true, status: 200 }; } }).then(() => res);
}
const machine = { authorization: 'Bearer unit-token' };

async function owner(store, log) {
  const r = await call(store, log, 'POST', 'login', { body: { passphrase: 'test-pass-phrase' } });
  assert.strictEqual(r.statusCode, 200);
  return { cookie: r.headers['set-cookie'].split(';')[0] };
}

test('login refuses a wrong passphrase and rate limits', async () => {
  const store = Store.create(); const log = [];
  for (let i = 0; i < 8; i++) assert.strictEqual((await call(store, log, 'POST', 'login', { body: { passphrase: 'no' } })).statusCode, 401);
  assert.strictEqual((await call(store, log, 'POST', 'login', { body: { passphrase: 'no' } })).statusCode, 429);
});

test('owner routes need the cookie, machine routes need the bearer token', async () => {
  const store = Store.create(); const log = [];
  assert.strictEqual((await call(store, log, 'GET', 'cards')).statusCode, 401);
  assert.strictEqual((await call(store, log, 'GET', 'm/decisions')).statusCode, 401);
  assert.strictEqual((await call(store, log, 'GET', 'm/decisions', { headers: machine })).statusCode, 200);
  assert.strictEqual((await call(store, log, 'GET', 'cards', { headers: machine })).statusCode, 401);
});

test('card lifecycle: ingest, approve, reject reasons, edit request, regenerate, done, ack', async () => {
  const store = Store.create(); const log = [];
  const o = await owner(store, log);
  const mk = (id, extra) => call(store, log, 'POST', 'm/cards', { headers: machine, body: Object.assign({ id, type: 'social', pillar: 'hot-takes', title: 'T ' + id, drafts: [{ platform: 'x', text: 'hello' }] }, extra || {}) });
  assert.strictEqual((await mk('test-a')).statusCode, 200);
  assert.strictEqual((await mk('test-b')).statusCode, 200);
  assert.strictEqual((await mk('test-c')).statusCode, 200);
  const pend = await call(store, log, 'GET', 'cards&status=pending', { headers: o });
  assert.strictEqual(pend.statusCode, 200);
  assert.strictEqual((await call(store, log, 'POST', 'decide', { headers: o, body: { id: 'test-a', decision: 'approve' } })).body.card.status, 'approved');
  assert.strictEqual((await call(store, log, 'POST', 'decide', { headers: o, body: { id: 'test-b', decision: 'reject' } })).statusCode, 422);
  assert.strictEqual((await call(store, log, 'POST', 'decide', { headers: o, body: { id: 'test-b', decision: 'reject', reason: 'too bold', note: 'drop the claim' } })).body.card.status, 'rejected');
  assert.strictEqual((await call(store, log, 'POST', 'decide', { headers: o, body: { id: 'test-c', decision: 'edit' } })).statusCode, 422);
  assert.strictEqual((await call(store, log, 'POST', 'decide', { headers: o, body: { id: 'test-c', decision: 'edit', note: 'shorter' } })).body.card.status, 'edit_requested');
  const dec = await call(store, log, 'GET', 'm/decisions', { headers: machine });
  assert.deepStrictEqual(dec.body.decisions.map((d) => d.status).sort(), ['approved', 'edit_requested', 'rejected']);
  assert.ok(dec.body.decisions.find((d) => d.id === 'test-c').drafts, 'edit requests carry the drafts');
  await call(store, log, 'POST', 'm/ack', { headers: machine, body: { ids: ['test-a', 'test-b', 'test-c'] } });
  assert.strictEqual((await call(store, log, 'GET', 'm/decisions', { headers: machine })).body.decisions.length, 0);
  // regenerate: new card replaces the edit-requested one
  assert.strictEqual((await mk('test-c2', { replaces: 'test-c' })).statusCode, 200);
  assert.strictEqual((await store.getJson('card:test-c')).status, 'superseded');
  // done only after approve
  assert.strictEqual((await call(store, log, 'POST', 'decide', { headers: o, body: { id: 'test-c2', decision: 'done' } })).statusCode, 422);
  assert.strictEqual((await call(store, log, 'POST', 'decide', { headers: o, body: { id: 'test-a', decision: 'done', platforms: ['x'] } })).body.card.status, 'done');
  // an already decided card is not overwritten by a re-ingest
  assert.strictEqual((await mk('test-a')).statusCode, 409);
  const del = await call(store, log, 'POST', 'm/delete', { headers: machine, body: { ids: ['test-a', 'test-b', 'test-c', 'test-c2', 'real-1'] } });
  assert.strictEqual(del.body.deleted, 4);
});

test('hot cards push at most three a day', async () => {
  const store = Store.create(); const log = [];
  const hot = (i) => call(store, log, 'POST', 'm/cards', { headers: machine, body: { id: 'test-h' + i, type: 'social', title: 'Hot ' + i, hot: true, score: 9, drafts: [{ platform: 'x', text: 'x' }] } });
  const r = []; for (let i = 0; i < 5; i++) r.push(await hot(i));
  assert.deepStrictEqual(r.map((x) => x.body.hot), [true, true, true, false, false]);
  assert.strictEqual(log.filter((l) => /ntfy\.sh/.test(l.u)).length, 3);
  assert.ok(!/@/.test(JSON.stringify(log.map((l) => l.init.body))), 'push text holds no address');
});

test('prospect cards refuse email addresses', async () => {
  const store = Store.create(); const log = [];
  const bad = await call(store, log, 'POST', 'm/cards', { headers: machine, body: { type: 'prospect', title: 'Acme', body: 'finding. write to jane@acme.com' } });
  assert.strictEqual(bad.statusCode, 422);
  const ok = await call(store, log, 'POST', 'm/cards', { headers: machine, body: { type: 'prospect', title: 'Acme', body: 'finding: no llms.txt. draft: ...' } });
  assert.strictEqual(ok.statusCode, 200);
});

test('brief emails only OWNER_EMAIL and carries no tracking', async () => {
  const store = Store.create(); const log = [];
  const r = await call(store, log, 'POST', 'm/brief', { headers: machine, body: { subject: 'Brief', text: 'hello <b>', to: 'attacker@example.test' } });
  assert.strictEqual(r.body.email.sent, true);
  const sent = JSON.parse(log[0].init.body);
  assert.deepStrictEqual(sent.to, ['me@example.test']);
  assert.ok(!/<img|pixel|track/i.test(sent.html));
  assert.ok(sent.html.includes('&lt;b&gt;'));
});

test('sessions expire and cannot be forged', () => {
  const t = Auth.makeSession(env, 1000);
  assert.ok(Auth.validSession(t, env, 2000));
  assert.ok(!Auth.validSession(t, env, 1000 + 31 * 24 * 3600 * 1000));
  assert.ok(!Auth.validSession(t.slice(0, -2) + 'xx', env));
  assert.ok(!Auth.validSession(t, { SESSION_SECRET: 'other' }));
});
