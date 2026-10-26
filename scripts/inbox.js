#!/usr/bin/env node
'use strict';

// Client for the growth-inbox machine routes. INBOX_URL defaults to the production inbox; the token comes from INBOX_TOKEN or the Keychain (never from a file).
//   node scripts/inbox.js card <file.json>      send one card (runs the wording lint on every draft first)
//   node scripts/inbox.js decisions             print undelivered decisions as JSON
//   node scripts/inbox.js ack <id> [id...]
//   node scripts/inbox.js brief <file.md> [--no-email]
//   node scripts/inbox.js notify "title" "message"
//   node scripts/inbox.js delete <test-id> [...]

const fs = require('fs');
const path = require('path');
const { lint } = require('./lint.js');

const { execFileSync } = require('child_process');
const base = () => (process.env.INBOX_URL || 'https://growth-inbox.vercel.app').replace(/\/$/, '');
// On the owner's Mac the token lives in the Keychain item "citehound-growth-inbox-token"; in the cloud it is the INBOX_TOKEN variable. Never printed.
function token() {
  if (process.env.INBOX_TOKEN) return process.env.INBOX_TOKEN;
  try { return execFileSync('security', ['find-generic-password', '-s', 'citehound-growth-inbox-token', '-w'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch (e) { return ''; }
}

async function call(route, method, body) {
  const tk = token(); if (!tk) throw new Error('INBOX_TOKEN is not set and no Keychain item was found');
  const r = await fetch(base() + '/api?r=' + route, { method, headers: { Authorization: 'Bearer ' + tk, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(route + ' ' + r.status + ' ' + (j.error || ''));
  return j;
}

function cardText(c) { return [c.title, c.summary, c.why, c.body].concat((c.drafts || []).flatMap((d) => [d.text].concat(d.thread || []))).filter(Boolean).join('\n\n'); }

async function sendCard(c, opts) {
  const problems = lint(cardText(c));
  if (problems.length && !(opts && opts.skipLint)) throw new Error('lint failed: ' + problems.join('; '));
  return call('m/cards', 'POST', c);
}

module.exports = { call, sendCard, cardText };

if (require.main === module) {
  (async () => {
    const [cmd, ...rest] = process.argv.slice(2);
    let out;
    if (cmd === 'card') out = await sendCard(JSON.parse(fs.readFileSync(rest[0], 'utf8')));
    else if (cmd === 'decisions') out = await call('m/decisions', 'GET');
    else if (cmd === 'ack') out = await call('m/ack', 'POST', { ids: rest });
    else if (cmd === 'brief') { const text = fs.readFileSync(rest[0], 'utf8'); const p = lint(text); if (p.length) throw new Error('lint failed: ' + p.join('; ')); out = await call('m/brief', 'POST', { subject: 'Growth Desk brief ' + new Date().toISOString().slice(0, 10), text, email: !rest.includes('--no-email') }); }
    else if (cmd === 'notify') out = await call('m/notify', 'POST', { title: rest[0], message: rest[1] });
    else if (cmd === 'delete') out = await call('m/delete', 'POST', { ids: rest });
    else { console.error('usage: inbox.js card|decisions|ack|brief|notify|delete'); process.exit(2); }
    console.log(JSON.stringify(out));
  })().catch((e) => { console.error(e.message); process.exit(1); });
}
