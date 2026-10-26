#!/usr/bin/env node
'use strict';

// Wording check for everything the desk writes. Exit 1 and print the reasons when a text fails.
//   node scripts/lint.js file.md [more files]      or      echo "text" | node scripts/lint.js -

const fs = require('fs');

const BANNED = ['quietly', 'actually', 'seamlessly', 'effortless', 'powerful', 'unlock', 'elevate', 'supercharge', 'game-changing', 'game changing', 'revolutionize', 'landscape', 'delve', 'crucial', 'robust'];
const RULES = [
  [/\bnot just\b[^.!?]{0,80}\bbut\b/i, 'banned construction "not just X, but Y"'],
  [/\b(guarantee[sd]?|guaranteed)\b/i, 'outcome promise ("guarantee")'],
  [/\b(will|can) (boost|increase|improve|grow|double|triple) (your )?(traffic|rankings?|citations?|revenue|sales|visibility)\b/i, 'outcome promise about traffic, rankings, citations or revenue'],
  [/\b(rank(s|ed|ing)? (#?1|first)|top of (chatgpt|claude|perplexity|gemini|google))\b/i, 'ranking promise'],
  [/\b(chatgpt|claude|perplexity|gemini|ai assistants?|llms?)\b[^.!?]{0,60}\b(recommends?|cites?|names?|picks?)\b[^.!?]{0,40}\b(you|your brand|your site|citehound)\b/i, 'implies an assistant recommends or cites the brand'],
  [/\b(official|verified)\b/i, '"official" or "verified" (only our own GitHub Action may be "official")'],
  [/\bpartner(s|ship)?\b/i, '"partner" about someone (not allowed until a partnership exists)'],
  [/anthropic('s)? (plugin )?directory/i, 'Anthropic directory (the listing is not live)'],
  [/\bcoming soon\b/i, '"coming soon" must be "In preparation"'],
  [/\bai visibility\b/i, '"AI visibility" (never use it for the score or the citation check)'],
  [/\bpayments? (are|is) (open|live)\b|\bbuy (citehound )?pro\b|\bsubscribe to pro\b/i, 'says payments are open (they are not)'],
  [/\b(award[- ]winning|#1|best[- ]in[- ]class|industry[- ]leading)\b/i, 'unsupported superlative'],
  [/\bhustle|10x|crush it|grind\b/i, 'hustle-culture wording']
];

function lint(text) {
  const problems = [];
  const lower = String(text).toLowerCase();
  for (const w of BANNED) if (new RegExp('\\b' + w.replace(/[-]/g, '[- ]') + '\\b', 'i').test(lower)) problems.push('banned word: ' + w);
  for (const [re, why] of RULES) if (re.test(text)) problems.push(why);
  for (const para of String(text).split(/\n{2,}/)) {
    const dashes = (para.match(/—/g) || []).length;
    if (dashes > 1) problems.push('more than one em dash in a paragraph');
  }
  if (/\b(testimonial|as seen on|trusted by)\b/i.test(text)) problems.push('testimonial or logo-wall wording (we have none to show)');
  return Array.from(new Set(problems));
}

module.exports = { lint, BANNED };

if (require.main === module) {
  const args = process.argv.slice(2);
  let bad = 0;
  if (!args.length) { console.error('usage: lint.js <file>|-'); process.exit(2); }
  for (const a of args) {
    const text = a === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(a, 'utf8');
    const p = lint(text);
    if (p.length) { bad++; console.log((a === '-' ? 'stdin' : a) + ': FAIL'); p.forEach((x) => console.log('  - ' + x)); } else console.log((a === '-' ? 'stdin' : a) + ': ok');
  }
  process.exit(bad ? 1 : 0);
}
