# Insight lab 2026-W44 r2: candidates (31 Oct 2026)

Sample: 244 new domains found by web search (purposive, not random), none shared with Monday's 26 Oct frame. 219 homepages scored, 19 failed (12 of them HTTP 202 host challenges), 6 skipped because robots.txt disallows our crawler. Scored by segment: SaaS 80, agency 65, professional services 74. Homepage only, one scan each, data-center address. The SaaS pass leans toward vendors that publish their own "alternatives" posts (SEO-active); the prof pass is about half legal.

Verdict: **No candidate is strong enough to publish this week.** This run's real value is a replication check on Monday's kept candidate, and it changes how that candidate should be worded.

## 1. Replication: the WordPress readiness gap is a schema-default gap (confidence: medium; nothing new to publish, correction to pending cards)
- Claim: in a second, independent sample, WordPress homepages again score higher, and again almost all of the gap sits in the three schema checks.
- Evidence, this sample: WordPress 84.3 (n=108) vs others 79.0 (n=111), gap 5.3, bootstrap 95% interval 2.0 to 8.6. Schema points 13.9 vs 9.3. Gap left after removing the schema checks: 0.7 (interval -2.0 to 3.3). Content schema passes on 74% vs 27%; Organization/WebSite schema 93% vs 68%. By segment: SaaS +7.4 (1.9 to 12.7; 21 vs 59, WordPress group under 30), agency +4.9 (-1.2 to 11.3), prof +7.1 (0.8 to 13.4; other group 23).
- Pooled, both samples (n=432; 201 WordPress vs 231): gap 6.1 (3.8 to 8.4); without schema checks 1.2 (-0.6 to 3.0). Content schema 74% vs 27% (difference interval 38 to 55 points).
- Where the replication pushes back: the gap is mostly against sites whose platform we could not detect (pooled WordPress minus "unknown": 9.6, interval 5.7 to 13.6, n=87). Against identified non-WordPress platforms it is 4.0 (1.7 to 6.4), under the 5-point rule. Next.js homepages match WordPress in both samples (84.9 n=14; 83.2 n=23). Webflow moved from 77.4 (n=18) to 82.1 (n=20) between samples. So "WordPress beats modern stacks" is not supported. What holds is narrower: "WordPress sites get homepage schema by default; others get it only when someone adds it."
- Mechanism: unchanged from Monday (SEO plugin output, BreadcrumbList counted as content schema). Not re-tested this run. The content-schema pass on WordPress is largely BreadcrumbList, a thin signal.
- Monday morning: unchanged. On a non-WordPress site, check the homepage source for Organization and WebSite JSON-LD and add both if missing.
- Why not new content: Monday's cards for this insight are still in the inbox. A second set would duplicate them. The replication goes to the owner as a correction: the X r2 hook ("We expected Webflow and custom builds to beat WordPress... They did not") overstates. Next.js, a common custom-build stack, ties WordPress in both samples.

## 2. Cloudflare's managed robots.txt accounts for most deliberate AI-crawler blocking this week (confidence: do not publish)
- Claim: 5 of the 8 blocking sites serve Cloudflare's managed robots.txt (Content-Signal `search=yes,ai-train=no`), blocking the six training crawlers and leaving search and user agents open. One of the five is served from Vercel, so the file was likely copied.
- Tension: practitioners read "blocks GPTBot" as a choice someone made. Here it comes from a dashboard toggle and a block of text pasted into robots.txt.
- Why not published: n=5. Monday's sample had 0 of 105 Cloudflare sites with the managed file, and this week has 5 of 123, so the rate is unstable. We cannot tell intent: the file states a policy (no training), and the owner may have chosen it. Each of these sites loses 16 of 26 crawler-access points, which is a scoring choice to review, not a site problem. Worth re-testing with a frame built for Cloudflare-served sites.

## 3. Segment gaps do not hold (confidence: do not publish)
- This week: SaaS 82.1, agency 81.3, prof 81.4; every gap under 1 point, every interval spans zero. Monday's agency-over-prof gap of 4.5 is gone, and SaaS moved from 79.5 to 82.1.
- Use: a method lesson for the owner only. Segment-level claims from one purposive sample of about 70 per segment do not reproduce, so none should be published.

Discarded: "Technical and trust pillars correlate (r = 0.53)" because the schema checks sit in both pillars. It is candidate 1 again.
Discarded: "19 sites publish a Content-Signal line" because most come from managed defaults (candidate 2). The count is small, and there is no behavior to compare it against.
Discarded: "AI crawler access is the single biggest fix (7.5 points lost on average, 57.5% fail)" because, as on Monday, most of it is ordinary admin-path Disallow rules scored as "limited". The check is still open for the owner's review, so the result is not a finding.

Note for the owner (method): 12 of 19 failures were HTTP 202 host challenges, the same pattern as Monday. Rescanning them from a residential address would tell us whether this is a data-center artifact.
