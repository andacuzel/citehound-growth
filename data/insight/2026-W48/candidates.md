# Insight lab 2026-W48: candidates (28 Nov 2026)

Sample: 214 new domains found by web search (purposive, not random), none shared with the five earlier frames (1,189 domains). 190 homepages scored, 19 failed (8 HTTP 202 host challenges, 4 HTTP 403, 4 HTTP 200 with no usable page, 2 HTTP 503, 1 network), 5 skipped because robots.txt disallows our crawler. Scored by segment: SaaS 53, agency 67, professional services 70. Homepage only, one scan each, data-center address. Pooled figures below cover six independent frames: 1,253 scored homepages, 26 Oct to 28 Nov 2026, no domain in two frames.

Verdict: **one candidate kept (medium)**. The other two stay unpublished for the same reasons as last week.

## 1. On Wix, an llms.txt file says which builder you use, not what you decided (confidence: medium; keep)
- Claim: in our six samples, almost every Wix homepage has an llms.txt file and almost no Squarespace homepage does, so the file's presence mostly reflects the site builder.
- Evidence, pooled: Wix 32 of 33 (97%), Squarespace 3 of 33 (9%), every other platform 591 of 1,187 (50%). Wix minus Squarespace: 88 points, bootstrap 95% interval 76 to 97. Per sample, Wix: 14/15, 3/3, 4/4, 2/2, 3/3, 6/6; Squarespace: 1/3, 0/3, 1/11, 0/2, 0/10, 1/4. Same direction in all six samples. This week took both groups past the 30-site floor for the first time.
- Segment check: both groups are mostly professional-services firms (Wix 27 of 33, Squarespace 24 of 33), so the gap is not a segment-mix effect.
- Tension: auditors, our own research included, read an llms.txt file as a sign that someone thought about AI crawlers. On Wix it is there whether anyone thought about it or not, and on Squarespace it is almost never there.
- Mechanism: Wix's help center (support.wix.com, "Understanding your site's llms.txt file", read 28 Nov 2026) says "Wix automatically generates and maintains your llms.txt file"; once the owner edits it, it stops updating automatically; owners can opt out with a toggle. Prerequisites listed: an upgraded site, a custom domain, search indexing on. Every Wix site in our frames is on its own domain, which fits. The three Wix files we read this week (robots.txt allowed it) all follow one machine-written template: a heading and a generated summary of the firm. That supports the default. Squarespace: third-party guides (July to October 2026) describe an opt-in setting on 7.1 sites; we did not confirm this in Squarespace's own documentation, so "not on by default" is a guess from the 3 of 33.
- Side effect worth saying: on Wix, the description an AI crawler finds in that file was written by Wix's generator, and the firm may never have read it.
- Effect on our score: the llms.txt check is worth 4 of 100 points, so the builder hands Wix sites those points. The scan cannot tell a generated file from a written one. Honest note for the owner.
- Confidence: medium. Large effect, replicated six times, mechanism documented by the vendor. Not high because: 33 sites per group, six frames built the same way (web search, SEO-active sites), platform detected by a regex on page source, one scan each, and the Squarespace side rests on third-party write-ups.
- Monday morning: open yourdomain.com/llms.txt. On Wix, read what the generator wrote about your firm and correct it if it is wrong (editing stops the automatic updates). On any builder: before you treat a site's llms.txt as a sign of intent, check which builder made the site.
- Method note: 1,253 homepages of small B2B SaaS, agency and professional-services sites found by web search, six frames, 26 Oct to 28 Nov 2026, not random. Homepage, robots.txt and llms.txt read once each. Present means a 200 response that is not an HTML page. Readiness only: this says nothing about whether any system reads the file.

## 2. Professional-services homepages score lower (confidence: low; do not publish)
- This sample: prof 73.2 (n=70) vs the rest, gap -9.1 (95% interval -14.1 to -4.0). Within WordPress -6.4 (-14.0 to 0.4, includes zero; 33 vs 53). Six samples: -0.3, -2.3, -7.6, -2.9, -11.7, -9.1.
- Pooled: -5.7 (-7.3 to -4.0; 408 prof). Within WordPress -3.4 (-5.3 to -1.6). On platforms our detector does not recognize -10.6 (-15.5 to -5.8; 83 prof).
- Same reading as W47: the headline size depends on how many unrecognized (likely older custom) builds a frame catches; within a platform the gap is under 5 points. Low under our rules.
- Measurement caveat: 8 homepages this week failed the page title and html lang checks together (6 prof, 2 agency), up from 4. That looks like challenge or interstitial pages scored as real pages. It inflates the prof gap a little and is a scanner issue.

## 3. Webflow homepages lack Organization/WebSite schema more often than WordPress (confidence: medium as a fact; do not publish separately)
- Pooled: Webflow 48 of 98 fail (49%), WordPress 33 of 571 (6%). This week: Webflow 6 of 16, WordPress 6 of 86. Sixth replication.
- Not a separate post: it is the mechanism of the pending W44 WordPress cards.

Discarded: "HubSpot CMS sites block AI crawlers more (2 of 9)" because n=2 blockers.
Discarded: "Technical and trust pillars correlate (r = 0.78)" because the schema checks sit in both pillars; same artifact as every earlier run.
Discarded: "AI crawler access is the single biggest fix (8.0 points lost on average, 60% fail)" because it is mostly ordinary admin-path Disallow rules scored as limited; still awaiting the owner's review of that check.
Discarded: "The top 5% share open access, content schema and llms.txt" because the top group is 10 sites at 100 points: passing every check defines the group.
Discarded: "Blocking is up (10 of 190, 5.3%, vs 3.4% last week)" because 10 sites, and the change is within the noise of two purposive samples.

Note for the owner (method): robots.txt served as an HTML page on 19 sites this week (10 last week), and 8 homepages look like interstitials. Both point the same way: our data-center address is meeting more host challenges. A scanner flag for "no title and no lang" as a failed fetch is still worth adding. The Wix finding also means the llms.txt check credits a generated file the same as a written one; worth a line on /methodology.
