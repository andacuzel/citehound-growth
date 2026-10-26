#!/usr/bin/env node
'use strict';

// Analyze a scan file (JSONL from insight-scan.js). Output is JSON with every figure carrying its n and a confidence flag.
//   node scripts/insight-analyze.js <scans.jsonl>
// The model reads this output and picks three ranked candidates. Nothing here names a site.

const fs = require('fs');

const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);
const q = (a, p) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); const i = (s.length - 1) * p; const lo = Math.floor(i); return s[lo] + (s[Math.ceil(i)] - s[lo]) * (i - lo); };
const r1 = (x) => (x === null ? null : Math.round(x * 10) / 10);
function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function bootDiff(a, b, n) { if (a.length < 5 || b.length < 5) return null; const R = rng(7); const d = []; for (let k = 0; k < (n || 2000); k++) { const ma = mean(a.map(() => a[Math.floor(R() * a.length)])); const mb = mean(b.map(() => b[Math.floor(R() * b.length)])); d.push(ma - mb); } d.sort((x, y) => x - y); return [r1(d[Math.floor(d.length * 0.025)]), r1(d[Math.floor(d.length * 0.975)])]; }
function pearson(x, y) { const n = x.length; if (n < 8) return null; const mx = mean(x), my = mean(y); let sxy = 0, sxx = 0, syy = 0; for (let i = 0; i < n; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; syy += (y[i] - my) ** 2; } return sxx && syy ? r1(100 * sxy / Math.sqrt(sxx * syy)) / 100 : null; }
const conf = (n, effect) => (n < 30 ? 'low (n<30)' : effect !== undefined && Math.abs(effect) < 5 ? 'low (effect<5 points)' : n < 80 ? 'medium' : 'medium-high');

function analyze(recs) {
  const scored = recs.filter((r) => r.ok);
  const out = { sample: { frame: recs.length, scored: scored.length, failed: recs.filter((r) => r.ok === false).length, skipped_by_robots: recs.filter((r) => r.skipped).length, note: 'Purposive sample found by web search, not random. Homepage only. One scan each. Scanned from a data-center address.' } };
  const failKinds = {}; for (const r of recs.filter((x) => x.ok === false)) failKinds[r.fail] = (failKinds[r.fail] || 0) + 1;
  out.sample.fail_kinds = failKinds;
  out.sample.waf_suspect = recs.filter((r) => r.waf_suspect).length;

  const segs = [...new Set(scored.map((r) => r.segment))];
  out.by_segment = {};
  for (const s of segs) { const sc = scored.filter((r) => r.segment === s).map((r) => r.score); out.by_segment[s] = { n: sc.length, mean: r1(mean(sc)), median: r1(q(sc, 0.5)), p25: r1(q(sc, 0.25)), p75: r1(q(sc, 0.75)), confidence: conf(sc.length) }; }
  out.segment_gaps = [];
  for (let i = 0; i < segs.length; i++) for (let j = i + 1; j < segs.length; j++) {
    const a = scored.filter((r) => r.segment === segs[i]).map((r) => r.score); const b = scored.filter((r) => r.segment === segs[j]).map((r) => r.score);
    const d = r1(mean(a) - mean(b)); const ci = bootDiff(a, b);
    out.segment_gaps.push({ a: segs[i], b: segs[j], diff: d, ci95: ci, excludes_zero: ci ? (ci[0] > 0 || ci[1] < 0) : null, confidence: conf(Math.min(a.length, b.length), d) });
  }

  const labels = [...new Set(scored.flatMap((r) => Object.keys(r.checks || {})))];
  out.checks = labels.map((l) => {
    const rows = scored.filter((r) => r.checks && r.checks[l]);
    const fails = rows.filter((r) => !r.checks[l].ok);
    const max = rows.length ? rows[0].checks[l].max : 0;
    const lost = mean(rows.map((r) => r.checks[l].max - r.checks[l].pts));
    return { check: l, n: rows.length, fail_rate: r1(100 * fails.length / (rows.length || 1)), max_points: max, mean_points_lost: r1(lost) };
  }).sort((a, b) => b.mean_points_lost - a.mean_points_lost);
  out.single_fix_moving_scores_most = out.checks[0] ? { check: out.checks[0].check, mean_points_lost: out.checks[0].mean_points_lost, fail_rate: out.checks[0].fail_rate, note: 'mean points lost per scored site; the biggest bucket, not a promise of what fixing it changes outside the score' } : null;

  // Top 5% vs the rest: what the best sites share.
  const sorted = [...scored].sort((a, b) => b.score - a.score);
  const k = Math.max(3, Math.ceil(sorted.length * 0.05));
  const top = sorted.slice(0, k); const rest = sorted.slice(k);
  out.top5 = { n_top: top.length, min_score_in_top: top.length ? top[top.length - 1].score : null, confidence: top.length < 8 ? 'low (fewer than 8 sites in the top group)' : 'medium',
    shared: labels.map((l) => { const pt = top.filter((r) => r.checks[l] && r.checks[l].ok).length / top.length; const pr = rest.filter((r) => r.checks[l] && r.checks[l].ok).length / (rest.length || 1); return { check: l, top_pass: r1(100 * pt), rest_pass: r1(100 * pr), lift: r1(100 * (pt - pr)) }; }).sort((a, b) => b.lift - a.lift).slice(0, 6) };

  // Correlation between pillars, and each check with the other pillars' points.
  const col = (f) => scored.map(f);
  out.pillar_correlations = { discover_vs_tech: pearson(col((r) => r.pillars.discover), col((r) => r.pillars.tech)), discover_vs_trust: pearson(col((r) => r.pillars.discover), col((r) => r.pillars.trust)), tech_vs_trust: pearson(col((r) => r.pillars.tech), col((r) => r.pillars.trust)), n: scored.length, note: 'Pearson r; |r| < 0.3 is weak. Correlation in a purposive sample, not cause.' };

  // Crawler access: accidental blocking by CDN, WAF, CMS defaults.
  const group = (key) => { const g = {}; for (const r of scored) { const v = key(r) || 'unknown'; (g[v] = g[v] || []).push(r); } return Object.keys(g).filter((v) => g[v].length >= 5).map((v) => ({ group: v, n: g[v].length, share_blocking_any_ai_bot: r1(100 * g[v].filter((r) => r.blocked_bots.length).length / g[v].length), share_open_all_10: r1(100 * g[v].filter((r) => (r.bots.open || 0) === 10).length / g[v].length), mean_score: r1(mean(g[v].map((r) => r.score))) })).sort((a, b) => b.n - a.n); };
  out.access_by_platform = group((r) => r.platform);
  out.access_by_cdn = group((r) => r.cdn);
  const blockers = scored.filter((r) => r.blocked_bots.length);
  out.blocking = { n_blocking_any: blockers.length, share: r1(100 * blockers.length / (scored.length || 1)), cloudflare_managed_robots: scored.filter((r) => r.robots && r.robots.cf_managed).length, with_content_signal: scored.filter((r) => r.robots && r.robots.content_signal).length, blocking_with_cf_managed: blockers.filter((r) => r.robots && r.robots.cf_managed).length, no_ai_specific_rule_but_blocked: blockers.filter((r) => r.robots && r.robots.ai_rule_groups === 0).length, note: 'no_ai_specific_rule_but_blocked means a wildcard or default rule does the blocking: possibly unintended' };
  out.blocking.crawlers = {}; for (const r of blockers) for (const b of r.blocked_bots) out.blocking.crawlers[b] = (out.blocking.crawlers[b] || 0) + 1;
  out.robots_state = { present: scored.filter((r) => r.robots && r.robots.present).length, served_html: recs.filter((r) => r.robots && r.robots.served_html).length, no_sitemap_line: scored.filter((r) => r.robots && r.robots.present && !r.robots.sitemap_lines).length };
  return out;
}

module.exports = { analyze, pearson, bootDiff };
if (require.main === module) {
  const f = process.argv[2]; if (!f) { console.error('usage: insight-analyze.js scans.jsonl'); process.exit(2); }
  console.log(JSON.stringify(analyze(fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))), null, 1));
}
