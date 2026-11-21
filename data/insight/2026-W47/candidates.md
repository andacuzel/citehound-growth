# Insight lab 2026-W47: candidates (21 Nov 2026)

Sample: 227 new domains found by web search (purposive, not random), none shared with the four earlier frames (962 domains). 205 homepages scored, 16 failed (6 HTTP 202 host challenges, 2 HTTP 403, 2 HTTP 500, 2 DNS, the rest single cases), 6 skipped because robots.txt disallows our crawler. Scored by segment: SaaS 63, agency 73, professional services 69. Homepage only, one scan each, data-center address. Each search pass had its own query cap this week; the SaaS pass hit its cap at 66 domains (directories dominate the results), and developer tools are 22 of 66 (W46: about 70%).

Verdict: **No candidate is strong enough to publish this week.** The largest gap in this sample is mostly frame composition, and the two platform findings either duplicate the pending W44 cards or are still under the 30-site floor.

## 1. Professional-services homepages score lower (confidence: low; do not publish)
- Claim: professional-services homepages score below SaaS and agency homepages.
- Evidence, this sample: prof 72.8 (n=69) vs SaaS 84.2 (n=63) and agency 84.8 (n=73); prof minus rest -11.7, bootstrap 95% interval -16.0 to -7.6. Five samples so far: -0.3, -2.3, -7.6, -2.9, -11.7. Direction is the same in all five; size swings from 0 to 12 points. Pooled over 1,063 scored homepages (26 Oct to 21 Nov 2026, 338 prof): -5.0 (-6.6 to -3.3), which treats five purposive samples as one.
- Tension: one would expect firms that sell expertise to keep a homepage as tidy as a marketing agency's. In every sample they trail, by a varying amount.
- Mechanism, as far as the data goes: it is mostly which platform the firm sits on. Within WordPress the pooled gap is -2.9 (-4.6 to -1.1; 188 prof vs 297 other sites). The big gaps come from prof sites on platforms our detector does not recognize (pooled -10.1, -15.5 to -4.6; 58 prof sites), likely older custom or legacy builds (a guess; we did not identify them). This week 58% of prof sites are not WordPress, the highest share of the five samples, which matches the largest gap. The point loss is spread over many checks (single H1 +1.6, llms.txt +1.5, Organization schema +1.5, author signals +1.4, meta description +1.3), with no single fix.
- Measurement caveat: 4 prof homepages this week failed the page title and html lang checks together, which looks like an interstitial or challenge page scored as a real page from our data-center address (none in earlier samples). Excluding them leaves -9.4 (-12.8 to -5.9), so it does not explain the gap, but it is a scanner issue to look at.
- Why not published: within a platform the gap is under 5 points (low at best under our rules), and the headline size depends on how many legacy-build firms a frame happens to catch. A post saying "professional firms score 12 points lower" would report our frame, not the firms.
- Monday morning (internal): if this is ever written up, the honest framing is "older custom builds trail", tested with a frame that records the platform on purpose.

## 2. llms.txt presence follows the site builder (confidence: low; do not publish yet)
- Claim: Wix homepages have an llms.txt file; Squarespace homepages almost never do.
- Evidence, pooled over five samples: Wix 26 of 27 present (96%), Squarespace 2 of 29 (7%). This week added 3 Wix (3 present) and 10 Squarespace (0 present).
- Tension: an llms.txt file is read as a sign someone thought about AI crawlers. On Wix it appears to be there regardless.
- Mechanism (guess, not tested): Wix appears to generate the file by default; Squarespace appears not to. We did not check settings or file contents.
- Why not published: both groups are still just under the 30-site floor, the research page already reports that Shopify generates the file (so the framing is not new), and five frames built the same way share one selection bias. One more targeted frame of Wix and Squarespace sites would settle it.

## 3. Webflow homepages lack Organization/WebSite schema more often than WordPress (confidence: medium as a fact; do not publish separately)
- Evidence, pooled over five samples: Webflow 42 of 82 fail (51%), WordPress 27 of 485 (6%). This week: Webflow 4 of 8, WordPress 6 of 87. Fifth replication.
- Why not a separate post: it is the mechanism of the pending W44 WordPress cards. Webflow is 8 sites this week. It adds a fifth sample to those cards and nothing more.

Discarded: "Vercel-served sites block AI crawlers more (3 of 17)" because n=3 blockers.
Discarded: "Technical and trust pillars correlate (r = 0.64)" because the schema checks sit in both pillars; same artifact as every earlier run.
Discarded: "AI crawler access is the single biggest fix (8.0 points lost on average, 61% fail)" because it is mostly ordinary admin-path Disallow rules scored as limited; still awaiting the owner's review of that check.
Discarded: "The top 5% share llms.txt and open access" because the top group is 11 sites at 100 points: passing every check defines the group.
Discarded: "Bytespider and CCBot are the most blocked crawlers" because only 7 sites block anything (3.4%), and it repeats the Launch Edition finding.

Replication note: Next.js 78.0 (n=17) vs WordPress 83.0 (n=87) this week; pooled within-platform comparisons are unchanged. The 31 Oct correction still stands.

Note for the owner (method): per-pass query caps fixed the W46 developer-tools skew. Four likely interstitial pages were scored as real pages this week; worth a scanner check that flags a page with no title and no lang as a failed fetch. The next useful run is the targeted Wix/Squarespace frame (30+ each) rather than a sixth general frame.
