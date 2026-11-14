# Insight lab 2026-W46: candidates (14 Nov 2026)

Sample: 234 new domains found by web search (purposive, not random), none shared with the three earlier frames (728 domains). 211 homepages scored, 19 failed (4 HTTP 202 host challenges, 4 HTTP 403, 5 flagged as likely WAF, the rest timeouts, DNS and other errors), 4 skipped because robots.txt disallows our crawler. Scored by segment: SaaS 76, agency 77, professional services 58. Homepage only, one scan each, data-center address. The SaaS pass is about 70% developer tools and API utilities (target was about 40%); the search budget ran out before the prof pass reached 80.

Verdict: **No candidate is strong enough to publish this week.** The one finding that holds up is the same story as the WordPress schema cards still waiting in the inbox (W44). It adds replication to those cards but is not a new insight.

## 1. Half of Webflow homepages lack Organization/WebSite schema; WordPress homepages almost never do (confidence: medium as a fact; do not publish separately)
- Claim: across four independent search samples, 51% of Webflow homepages fail the Organization/WebSite schema check against 5% of WordPress homepages.
- Evidence: pooled over 26 Oct, 31 Oct, 7 Nov and 14 Nov 2026 (845 scored homepages): Webflow 38 of 74 fail, WordPress 20 of 398 fail. Each sample alone: Webflow 61%, 45%, 40%, 57% (n=18, 20, 15, 21); WordPress 5%, 7%, 7%, 1%. It holds inside each segment: SaaS 54% vs 3% (48 vs 64 sites), agency 45% vs 3% (11 vs 175), prof 47% vs 9% (15 vs 159). Total score gap Webflow minus WordPress: -4.9 points pooled, bootstrap 95% interval -7.9 to -2.1; Webflow loses 3.7 more points on Organization schema and 2.8 more on content schema, but 3.8 fewer on crawler access.
- Tension: practitioners treat Webflow as the modern, SEO-friendly builder. On basic site-identity schema, it trails WordPress by a wide margin in every sample.
- Mechanism (guess, not tested): WordPress SEO plugins appear to emit Organization and WebSite JSON-LD by default; on Webflow it seems to need custom code. We did not check plugin or site settings.
- Why not a new post: this is the mechanism of the pending W44 WordPress cards ("the plugin did the work"), whose r2 edit already uses the hook "We expected Webflow and custom builds to beat WordPress". A separate set would duplicate them. Four samples built the same way share the same selection bias (SEO-active sites found through search), so replication shows stability, not that it holds for the web. Webflow is under 30 sites in every single sample, and the total score gap is under 5 points.
- Monday morning (for the owner): if the W44 cards go ahead, they can cite four samples and the within-segment split above, and add one Webflow-specific step: add Organization and WebSite JSON-LD in the site-wide custom code.

## 2. Professional-services homepages score lower (confidence: low; do not publish)
- Claim: prof homepages score about 3 points below SaaS and agency combined.
- Evidence: this week -2.9 (interval -7.2 to 0.8, spans zero; 58 vs 153 sites). By sample: -2.3, -0.3, -7.6, -2.9; only the 7 Nov sample excludes zero. Pooled -3.2 (interval -5.0 to -1.4, 269 prof sites), which treats four purposive samples as one.
- Why not published: gap under 5 points (low at best under our rules), and the per-sample results swing with frame composition. Direction is consistent, size is not.

## 3. llms.txt presence follows the site builder (confidence: low; do not publish)
- Claim: Wix generates llms.txt; Squarespace does not.
- Evidence, pooled over four samples: Wix 23 of 24 present, Squarespace 2 of 19. This week added only 2 Wix and 2 Squarespace sites.
- Why not published: both groups still under 30, and general search frames will not get there. Needs the targeted builder frame proposed on 7 Nov.

Discarded: "Technical and trust pillars correlate (r = 0.62)" because the schema checks sit in both pillars; same artifact as W44 and W45.
Discarded: "AI crawler access is the single biggest fix (6.4 points lost on average, 49% fail)" because it is mostly ordinary admin-path Disallow rules scored as limited; still awaiting the owner's review of that check.
Discarded: "The top 5% share llms.txt and open access" because the top group is 11 sites at 100 points: passing every check defines the group.
Discarded: "Bytespider is the most blocked crawler (10 of 11 blockers)" because n=11 and it repeats the Launch Edition finding.
Discarded: "llms.txt adoption rose this week (WordPress 56% vs 41% to 47% before; SaaS 71%)" because the frames differ (this SaaS pass is mostly dev tools); four cross-sections from different frames are not a time series.
Discarded: "Cloudflare's managed robots.txt is fading (1 site this week vs 6 on 7 Nov)" because Cloudflare-served sites were the same share (104 of 211 vs 99 of 215); the drop is frame composition with n of 1 to 6.

Replication note: Next.js ties WordPress for the fourth time (84.1 vs 86.2 this week, interval not computed; pooled 84.0 vs 84.5). The 31 Oct correction (do not say WordPress beats modern stacks) still stands; Webflow is the builder that trails, not modern stacks in general.

Note for the owner (method): the SaaS pass overshot on developer tools, and the shared 200-query search budget limited the prof pass to 67 domains. Next week, either cap queries per pass or run the targeted Wix/Squarespace frame instead.
