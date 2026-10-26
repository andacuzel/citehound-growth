#!/usr/bin/env node
'use strict';

// First step of every scheduled run: pull the owner's decisions, turn rejections and notes into learned rules in VOICE.md,
// list edit requests to regenerate, then acknowledge what was consumed.
//   node scripts/decisions.js pull          (needs INBOX_URL, INBOX_TOKEN)
//   node scripts/decisions.js apply <file>  (apply a decisions JSON file; used by tests)

const fs = require('fs');
const path = require('path');
const inbox = require('./inbox.js');

const VOICE = path.join(__dirname, '..', 'VOICE.md');
const START = '<!-- learned-rules:start -->';
const END = '<!-- learned-rules:end -->';

const RULE = {
  'too bold': 'Soften the claim: say what we measured, give the sample, drop the verdict.',
  'off-topic': 'Stay on AI readiness for small and mid-size B2B sites; skip news that does not change what a practitioner does.',
  'boring': 'Lead with the tension (expected vs found), not the topic.',
  'factually wrong': 'Re-check every fact against CONTEXT.md and the source before drafting; cite the date.'
};

function ruleFor(d, date) {
  const tag = d.pillar ? ' [' + d.pillar + ']' : '';
  if (d.status === 'rejected') {
    const base = RULE[d.reason] || 'Rejected without a stock reason.';
    return { key: 'Card: ' + d.id, line: '- ' + date + tag + ' rejected as "' + d.reason + '"' + (d.note ? ' (note: ' + d.note + ')' : '') + ': ' + base + ' Card: ' + d.id };
  }
  if (d.status === 'edit_requested') return { key: 'Card: ' + d.id, line: '- ' + date + tag + ' edit requested (note: ' + d.note + '): apply to the card and treat as a style rule for similar drafts. Card: ' + d.id };
  if (d.status === 'approved') return { key: 'card ' + d.id + ' is a good', line: '- ' + date + tag + ' approved as written: the tone of card ' + d.id + ' is a good example.' };
  return null;
}

function apply(decisions, date, voicePath) {
  const vp = voicePath || VOICE;
  let text = fs.readFileSync(vp, 'utf8');
  if (!text.includes(START) || !text.includes(END)) throw new Error('VOICE.md markers missing');
  const existing = text.slice(text.indexOf(START) + START.length, text.indexOf(END));
  const rules = decisions.map((d) => ruleFor(d, date)).filter(Boolean).filter((r) => !existing.includes(r.key));
  if (rules.length) text = text.replace(END, rules.map((r) => r.line).join('\n') + '\n' + END);
  fs.writeFileSync(vp, text);
  return { rules: rules.map((r) => r.line), edits: decisions.filter((d) => d.status === 'edit_requested'), done: decisions.filter((d) => d.status === 'done') };
}

module.exports = { apply, ruleFor };

if (require.main === module) {
  (async () => {
    const [cmd, file] = process.argv.slice(2);
    const date = new Date().toISOString().slice(0, 10);
    if (cmd === 'pull') {
      const { decisions } = await inbox.call('m/decisions', 'GET');
      const res = apply(decisions, date);
      if (decisions.length) await inbox.call('m/ack', 'POST', { ids: decisions.map((d) => d.id) });
      console.log(JSON.stringify({ consumed: decisions.length, new_rules: res.rules.length, edit_requests: res.edits.map((e) => ({ id: e.id, note: e.note })), done: res.done.map((d) => d.id) }));
    } else if (cmd === 'apply') {
      console.log(JSON.stringify(apply(JSON.parse(fs.readFileSync(file, 'utf8')).decisions, date)));
    } else { console.error('usage: decisions.js pull|apply <file>'); process.exit(2); }
  })().catch((e) => { console.error(e.message); process.exit(1); });
}
