#!/usr/bin/env node
'use strict';

// Build a tracked link and the share-intent links for one draft.
//   node scripts/utm.js --url https://getcitehound.com/ --platform x --pillar field-notes --card 20261026-ab12cd
// Platforms: x, linkedin_personal, linkedin_page, instagram, reddit, hn

const SOURCES = { x: 'x', linkedin_personal: 'linkedin_personal', linkedin_page: 'linkedin_page', instagram: 'instagram', reddit: 'reddit', hn: 'hn' };
const PILLARS = ['field-notes', 'hot-takes', 'teardown-fix', 'founder-log', 'blog', 'page'];

function tracked(url, o) {
  const u = new URL(url);
  if (u.hostname !== 'getcitehound.com' && u.hostname !== 'www.getcitehound.com') throw new Error('only getcitehound.com links are tracked');
  u.searchParams.set('utm_source', SOURCES[o.platform] || 'other');
  u.searchParams.set('utm_medium', 'social');
  u.searchParams.set('utm_campaign', PILLARS.includes(o.pillar) ? o.pillar : 'other');
  if (o.card) u.searchParams.set('utm_content', String(o.card).slice(0, 40));
  return u.toString();
}

function shareLink(platform, text) {
  const t = encodeURIComponent(text);
  if (platform === 'x') return 'https://twitter.com/intent/tweet?text=' + t;
  if (platform === 'linkedin_personal' || platform === 'linkedin_page') return 'https://www.linkedin.com/feed/?shareActive=true&text=' + t;
  return '';
}

module.exports = { tracked, shareLink, PILLARS };

if (require.main === module) {
  const a = {}; const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i += 2) a[argv[i].replace(/^--/, '')] = argv[i + 1];
  if (!a.url) { console.error('usage: utm.js --url U --platform P --pillar K --card ID'); process.exit(2); }
  console.log(tracked(a.url, { platform: a.platform, pillar: a.pillar, card: a.card }));
}
