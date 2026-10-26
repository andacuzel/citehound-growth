'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { lint } = require('../scripts/lint.js');
const { tracked, shareLink } = require('../scripts/utm.js');
const news = require('../scripts/news.js');
const dec = require('../scripts/decisions.js');
const ia = require('../scripts/insight-analyze.js');
const is = require('../scripts/insight-scan.js');

test('lint rejects banned words, promises and false claims', () => {
  assert.deepStrictEqual(lint('Short note. Numbers before adjectives.'), []);
  assert.ok(lint('A powerful way to unlock traffic').length >= 2);
  assert.ok(lint('This is not just a scan, but a plan').some((p) => /not just/.test(p)));
  assert.ok(lint('Our plugin is in the Anthropic directory').length);
  assert.ok(lint('Citehound is coming soon').length);
  assert.ok(lint('ChatGPT recommends your site after this fix').length);
  assert.ok(lint('Payments are open for Pro').length);
  assert.ok(lint('One — two — three in one paragraph').length);
  assert.deepStrictEqual(lint('One — two.\n\nThree — four.'), []);
});

test('utm links carry source, medium, campaign and content; only our domain', () => {
  const u = new URL(tracked('https://getcitehound.com/', { platform: 'linkedin_personal', pillar: 'field-notes', card: 'abc' }));
  assert.strictEqual(u.searchParams.get('utm_source'), 'linkedin_personal');
  assert.strictEqual(u.searchParams.get('utm_medium'), 'social');
  assert.strictEqual(u.searchParams.get('utm_campaign'), 'field-notes');
  assert.strictEqual(u.searchParams.get('utm_content'), 'abc');
  assert.throws(() => tracked('https://example.com/', { platform: 'x' }));
  assert.ok(shareLink('x', 'hi there').startsWith('https://twitter.com/intent/tweet?text=hi%20there'));
});

test('feed parser reads RSS and Atom, ids ignore tracking parameters, similar titles are caught', () => {
  const rss = '<rss><channel><item><title><![CDATA[Google updates robots.txt docs]]></title><link>https://a.test/x?utm_source=z</link><pubDate>Mon, 26 Oct 2026 08:00:00 GMT</pubDate><description>Text &amp; more</description></item></channel></rss>';
  const atom = '<feed><entry><title>Atom one</title><link href="https://b.test/y"/><updated>2026-10-26T08:00:00Z</updated><summary>s</summary></entry></feed>';
  const a = news.parseFeed(rss, { id: 'a', name: 'A' }); const b = news.parseFeed(atom, { id: 'b', name: 'B' });
  assert.strictEqual(a.length, 1); assert.strictEqual(b.length, 1);
  assert.strictEqual(a[0].snippet, 'Text & more');
  assert.strictEqual(news.idOf('https://a.test/x?utm_source=z'), news.idOf('https://www.a.test/x/'));
  assert.ok(news.similar('Google updates robots.txt documentation for crawlers', 'Google updates robots.txt documentation for crawlers today') >= 0.8);
  assert.ok(news.similar('Google updates robots.txt docs', 'OpenAI ships a new browser') < 0.3);
});

test('decisions become learned rules once, and edit requests are listed', () => {
  const f = path.join(os.tmpdir(), 'voice-' + Date.now() + '.md');
  fs.writeFileSync(f, 'x\n<!-- learned-rules:start -->\n<!-- learned-rules:end -->\n');
  const ds = [{ id: 'c1', status: 'rejected', reason: 'too bold', note: 'no verdict', pillar: 'hot-takes' }, { id: 'c2', status: 'edit_requested', note: 'shorter', pillar: 'field-notes' }, { id: 'c3', status: 'approved' }];
  const r1 = dec.apply(ds, '2026-10-26', f);
  assert.strictEqual(r1.rules.length, 3); assert.strictEqual(r1.edits.length, 1);
  const txt = fs.readFileSync(f, 'utf8');
  assert.ok(txt.includes('rejected as "too bold"') && txt.includes('Soften the claim'));
  assert.strictEqual(dec.apply(ds, '2026-10-27', f).rules.length, 0, 'applied twice adds nothing');
  fs.unlinkSync(f);
});

test('insight analysis flags weak evidence and never prints a domain', () => {
  const R = (n, seg, score, pass) => Array.from({ length: n }, (_, i) => ({ domain: seg + i + '.test', segment: seg, ok: true, score: score + (i % 5), pillars: { discover: 20 + (i % 3), tech: 10, trust: 20 }, checks: { 'llms.txt present': { ok: pass, pts: pass ? 4 : 0, max: 4 }, 'Canonical tag': { ok: true, pts: 4, max: 4 } }, bots: { open: 10 }, blocked_bots: [], platform: 'wordpress', cdn: 'other', robots: { present: true, ai_rule_groups: 0, sitemap_lines: 1 } }));
  const out = ia.analyze(R(40, 'saas', 70, true).concat(R(12, 'agency', 66, false)));
  assert.strictEqual(out.sample.scored, 52);
  assert.match(out.by_segment.agency.confidence, /low/);
  assert.strictEqual(out.single_fix_moving_scores_most.check, 'llms.txt present');
  assert.ok(!/\.test/.test(JSON.stringify(out)), 'no domain in the output');
});

test('platform and CDN fingerprints', () => {
  assert.strictEqual(is.platformOf('<script src="/wp-content/x.js">'), 'wordpress');
  assert.strictEqual(is.cdnOf({ 'cf-ray': '1' }), 'cloudflare');
  assert.strictEqual(is.robotsFacts('# BEGIN Cloudflare Managed content\nContent-Signal: search=yes,ai-train=no\nUser-agent: GPTBot\nDisallow: /').ai_rule_groups, 1);
});

test('metrics table groups by week, pillar and platform and says when nothing was entered', () => {
  const m = require('../scripts/metrics.js');
  const empty = m.build({ rows: [], posted: [{ id: 'a', pillar: 'hot-takes', platforms: ['x'], at: '2026-10-26T10:00:00Z' }] }, 4);
  assert.match(empty, /hot-takes \| x \| 1 \| n\/a/); assert.match(empty, /No numbers have been entered/);
  const full = m.build({ rows: [{ week: '2026-10-26', pillar: 'hot-takes', platform: 'x', impressions: 1200, clicks: 30, scans: 5, waitlist: 1, quotes: 0, applications: 0 }], posted: [] }, 4);
  assert.match(full, /\| 1200 \| 30 \| 5 \| 1 \| 0 \| 0 \|/);
});
