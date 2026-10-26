'use strict';

const crypto = require('crypto');

const COOKIE = 'gi_session';
const MAX_AGE = 30 * 24 * 3600;

const sha = (s) => crypto.createHash('sha256').update(String(s)).digest();
function safeEqual(a, b) { return crypto.timingSafeEqual(sha(a), sha(b)); }
const hmac = (secret, data) => crypto.createHmac('sha256', secret).update(data).digest('base64url');

function secretOf(env) { return env.SESSION_SECRET || ''; }

function checkPassphrase(given, env) {
  const real = env.INBOX_PASSPHRASE || '';
  if (!real || typeof given !== 'string' || !given) return false;
  return safeEqual(given, real);
}

function makeSession(env, now) {
  const exp = Math.floor((now || Date.now()) / 1000) + MAX_AGE;
  const body = exp + '.' + crypto.randomBytes(9).toString('base64url');
  return body + '.' + hmac(secretOf(env), body);
}

function validSession(token, env, now) {
  if (!secretOf(env) || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const body = parts[0] + '.' + parts[1];
  const want = hmac(secretOf(env), body);
  if (want.length !== parts[2].length || !crypto.timingSafeEqual(Buffer.from(want), Buffer.from(parts[2]))) return false;
  return Number(parts[0]) > Math.floor((now || Date.now()) / 1000);
}

function readCookie(req, name) {
  const h = req.headers && req.headers.cookie; if (!h) return '';
  for (const p of String(h).split(';')) { const i = p.indexOf('='); if (i > 0 && p.slice(0, i).trim() === name) return p.slice(i + 1).trim(); }
  return '';
}

const cookieHeader = (token) => COOKIE + '=' + token + '; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=' + MAX_AGE;
const clearCookie = () => COOKIE + '=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0';

function isOwner(req, env) { return validSession(readCookie(req, COOKIE), env); }
function isMachine(req, env) {
  const h = String((req.headers && req.headers.authorization) || '');
  const m = /^Bearer (.+)$/.exec(h);
  return !!(m && env.INBOX_TOKEN && safeEqual(m[1], env.INBOX_TOKEN));
}
function ipHash(req, env) {
  const ip = String((req.headers && (req.headers['x-forwarded-for'] || '')) || '').split(',')[0].trim() || 'unknown';
  return crypto.createHmac('sha256', secretOf(env) || 'x').update(ip).digest('hex').slice(0, 24);
}

module.exports = { COOKIE, checkPassphrase, makeSession, validSession, readCookie, cookieHeader, clearCookie, isOwner, isMachine, ipHash };
