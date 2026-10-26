#!/usr/bin/env node
'use strict';

// Weekly table: impressions, clicks, scans, waitlist joins, quote requests, applications, by pillar and platform.
// Source: the rows the owner enters in the inbox "Numbers" tab, plus the cards he marked done. Empty columns stay empty and are named.
//   node scripts/metrics.js [--weeks 4]

const inbox = require('./inbox.js');

function isoWeek(d) { const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())); const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day); const y = new Date(Date.UTC(t.getUTCFullYear(), 0, 1)); return t.getUTCFullYear() + '-W' + String(Math.ceil(((t - y) / 86400000 + 1) / 7)).padStart(2, '0'); }

function build(data, weeks) {
  const cols = ['impressions', 'clicks', 'scans', 'waitlist', 'quotes', 'applications'];
  const agg = {};
  const cell = (w, pillar, platform) => { const k = [w, pillar || '-', platform || '-'].join('|'); return (agg[k] = agg[k] || { posts: 0, impressions: 0, clicks: 0, scans: 0, waitlist: 0, quotes: 0, applications: 0, entered: false }); };
  for (const r of data.rows || []) { const c = cell(isoWeek(new Date(r.week + 'T00:00:00Z')), r.pillar, r.platform); cols.forEach((k) => { c[k] += Number(r[k]) || 0; }); c.entered = true; }
  for (const p of data.posted || []) for (const pf of p.platforms.length ? p.platforms : ['-']) cell(isoWeek(new Date(p.at)), p.pillar, pf).posts++;
  const keys = Object.keys(agg).sort().reverse();
  const wk = [...new Set(keys.map((k) => k.split('|')[0]))].slice(0, weeks || 4);
  const lines = ['| Week | Pillar | Platform | Posts | Impr. | Clicks | Scans | Waitlist | Quotes | Applications |', '|---|---|---|---|---|---|---|---|---|---|'];
  for (const k of keys) { const [w, pillar, platform] = k.split('|'); if (!wk.includes(w)) continue; const c = agg[k]; lines.push('| ' + [w, pillar, platform, c.posts].concat(cols.map((x) => (c.entered ? c[x] : 'n/a'))).join(' | ') + ' |'); }
  const empty = !(data.rows || []).length;
  return lines.join('\n') + (empty ? '\n\nNo numbers have been entered yet. Conversions here are waitlist joins, quote requests and applications, not sales: payments are closed.' : '');
}

module.exports = { build, isoWeek };
if (require.main === module) {
  (async () => { const wi = process.argv.indexOf('--weeks'); console.log(build(await inbox.call('m/metrics', 'GET'), wi > 0 ? Number(process.argv[wi + 1]) : 4)); })().catch((e) => { console.error(e.message); process.exit(1); });
}
