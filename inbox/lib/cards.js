'use strict';

const TYPES = ['social', 'page', 'wording', 'prospect'];
const PLATFORMS = ['x', 'linkedin_personal', 'linkedin_page', 'instagram', 'reddit', 'hn', 'other'];
const REASONS = ['too bold', 'off-topic', 'boring', 'factually wrong', 'other'];
const DECISIONS = ['approve', 'reject', 'edit', 'done'];
const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const clip = (s, n) => String(s === undefined || s === null ? '' : s).slice(0, n);

function newId(now) {
  const d = new Date(now || Date.now());
  return d.toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 8);
}

// Returns { card } or { error }. Prospect cards may carry company, finding and draft only: an address anywhere is refused.
function normalize(input, now) {
  if (!input || typeof input !== 'object') return { error: 'body must be an object' };
  const type = String(input.type || '');
  if (!TYPES.includes(type)) return { error: 'type must be one of ' + TYPES.join(', ') };
  const title = clip(input.title, 160).trim();
  if (!title) return { error: 'title is required' };
  const card = {
    id: /^[a-z0-9][a-z0-9_-]{2,60}$/i.test(String(input.id || '')) ? String(input.id) : newId(now),
    type: type,
    pillar: clip(input.pillar, 40),
    title: title,
    summary: clip(input.summary, 600),
    why: clip(input.why, 600),
    source_url: /^https?:\/\//i.test(String(input.source_url || '')) ? clip(input.source_url, 500) : '',
    score: Number.isFinite(Number(input.score)) ? Number(input.score) : null,
    hot: input.hot === true,
    body: clip(input.body, 12000),
    drafts: [],
    meta: {},
    replaces: input.replaces ? clip(input.replaces, 64) : '',
    status: 'pending',
    created: new Date(now || Date.now()).toISOString()
  };
  for (const d of Array.isArray(input.drafts) ? input.drafts.slice(0, 8) : []) {
    const platform = PLATFORMS.includes(d && d.platform) ? d.platform : 'other';
    const thread = Array.isArray(d && d.thread) ? d.thread.slice(0, 12).map((t) => clip(t, 1200)) : [];
    card.drafts.push({ platform: platform, text: clip(d && d.text, 3000), thread: thread, url: /^https?:\/\//i.test(String(d && d.url || '')) ? clip(d.url, 600) : '' });
  }
  if (input.meta && typeof input.meta === 'object') {
    for (const k of Object.keys(input.meta).slice(0, 12)) card.meta[clip(k, 40)] = clip(input.meta[k], 300);
  }
  if (type === 'prospect' && EMAIL.test(JSON.stringify(card))) return { error: 'prospect cards must not contain email addresses' };
  if (card.type === 'social' && !card.drafts.length) return { error: 'a social card needs at least one draft' };
  return { card: card };
}

// A decision from the owner. Returns { card } (updated copy) or { error }.
function decide(card, d, now) {
  const decision = String(d && d.decision || '');
  if (!DECISIONS.includes(decision)) return { error: 'decision must be one of ' + DECISIONS.join(', ') };
  const next = Object.assign({}, card);
  const at = new Date(now || Date.now()).toISOString();
  if (decision === 'approve') {
    if (!['pending', 'edit_requested'].includes(card.status) && card.status !== 'approved') return { error: 'card is ' + card.status };
    next.status = 'approved';
  } else if (decision === 'reject') {
    const reason = REASONS.includes(d.reason) ? d.reason : '';
    if (!reason) return { error: 'reason must be one of ' + REASONS.join(', ') };
    next.status = 'rejected'; next.reason = reason; next.note = clip(d.note, 200);
  } else if (decision === 'edit') {
    const note = clip(d.note, 200).trim();
    if (!note) return { error: 'an edit request needs a one-line note' };
    next.status = 'edit_requested'; next.note = note;
  } else if (decision === 'done') {
    if (card.status !== 'approved') return { error: 'only an approved card can be marked done' };
    next.status = 'done'; next.posted = (Array.isArray(d.platforms) ? d.platforms : []).filter((p) => PLATFORMS.includes(p));
  }
  next.decidedAt = at; next.delivered = false;
  return { card: next };
}

module.exports = { TYPES, PLATFORMS, REASONS, DECISIONS, normalize, decide, newId };
