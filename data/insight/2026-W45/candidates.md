# Insight lab 2026-W45: candidates (7 Nov 2026)

Sample: 240 new domains found by web search (purposive, not random), none shared with the two W44 frames (488 domains). 215 homepages scored, 17 failed (6 HTTP 202 host challenges, 5 HTTP 403, 5 flagged as likely WAF), 8 skipped because robots.txt disallows our crawler. Scored by segment: SaaS 77, agency 71, professional services 67. Homepage only, one scan each, data-center address. The SaaS pass leans to vertical SMB vendors that publish heavy comparison content; the prof pass is clustered by city and leans on HR consulting.

Verdict: **No candidate is strong enough to publish this week.** The one result that looks strong in this sample fails replication against our two earlier samples.

## 1. Professional-services homepages score lower (confidence: do not publish)
- Claim: in this sample, professional-services homepages score 7.6 points below SaaS and agency homepages combined.
- Evidence, this sample: prof 76.7 (n=67) vs SaaS 83.6 (n=77) and agency 85.0 (n=71). Prof minus rest: -7.6, bootstrap 95% interval -11.2 to -4.1. It holds inside WordPress alone (-6.0, -11.0 to -1.1, prof n=36).
- Tension: one would expect firms that sell expertise to look after their homepage at least as well as agencies. Here they do not.
- Why not published: it does not replicate. The same comparison was -2.3 (-5.8 to 1.0) on 26 Oct and -0.3 (-3.6 to 3.0) on 31 Oct. Three purposive samples, three different answers. The gap is also spread thin over seven checks (llms.txt 25% vs 55% present, single H1 60% vs 84%, meta description 63% vs 86%, H2s, Organization schema, author signals, crawler access), each under 1.5 points, with no single mechanism. This week's prof frame includes 9 Squarespace sites (vs 2 and 2 before), and Squarespace scores lowest of any platform in the pooled data. The most likely reading is frame composition, not a segment trait.
- Monday morning (internal): stop reporting segment-level gaps from single samples; they have now failed to reproduce twice.

## 2. llms.txt presence is mostly a platform default (confidence: low; do not publish yet)
- Claim: whether a small B2B homepage has an llms.txt file depends on the site builder more than on the team.
- Evidence, pooled over all three samples (647 scored homepages, 26 Oct to 7 Nov 2026): Wix 21 of 22 (95%) present, Squarespace 2 of 17 (12%), WordPress 44% (n=307), Next.js 63% (n=57). Wix sites still score below average (76.1 vs WordPress 84.0), so a file being there says little about readiness effort.
- Tension: practitioners read an llms.txt file as a sign someone thought about AI crawlers. On Wix it is there whether or not anyone did.
- Mechanism (guess, not tested): Wix appears to generate the file by default; Squarespace appears not to. We did not check settings or file contents.
- Why not published: Wix n=22 and Squarespace n=17, both under the 30-site floor; 15 of the 22 Wix sites came from one sample (26 Oct). The research page already says Shopify generates llms.txt, so the framing is not new. Worth a targeted frame of 30+ Wix and 30+ Squarespace sites before any post.

## 3. Bytespider-only blocks make up most non-managed AI blocking (confidence: do not publish)
- Claim: of 9 sites this week that block an AI crawler without Cloudflare's managed robots.txt, 6 block only Bytespider. The other 6 blockers use the managed file (Content-Signal `ai-train=no`), as on 31 Oct (5 of 8).
- Why not published: n=15 blockers (7% of 215), n=6 for the claim. It matches the Launch Edition finding that Bytespider is the most blocked crawler, so there is nothing new. The 26 Oct scans predate the managed-robots field, so the pooled rate cannot be compared.

Discarded: "Technical and trust pillars correlate (r = 0.55)" because the schema checks sit in both pillars; same artifact as W44.
Discarded: "AI crawler access is the single biggest fix (7.9 points lost on average, 59% fail)" because, as in both W44 runs, it is mostly ordinary admin-path Disallow rules scored as limited. The check is still awaiting the owner's review.
Discarded: "The top 5% all have llms.txt and open access" because the top group is 11 sites at 100 points: passing every check is the definition of the group.

Replication note on the pending WordPress cards: WordPress 83.2 (n=106) vs Next.js 84.3 (n=20) this week; Next.js ties WordPress for the third time. The 31 Oct correction (do not say WordPress beats modern stacks) still stands.

Note for the owner (method): failures were lower this week (17 of 240; 6 HTTP 202 challenges vs 12 on 31 Oct). Scanner versions differ across the three samples (the 26 Oct scans lack the managed-robots and blocked-crawler fields), which limits pooled blocking analysis.
