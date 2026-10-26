# insight-lab (weekly, Saturday morning Istanbul)

Read `routines/common.md` first and do its steps 1 and 2. Use the strong model for the analysis and the final copy; discovery and scanning are mechanical.

## Aim
Find what is actually true about how small and mid-size public B2B SaaS, agency and professional-services sites handle AI crawlers and readiness signals, and turn the strongest findings into content. Analyze; do not just count.

## 1. Sampling frame (150 to 300 sites; 30 for a test)
- Find public company sites with WebSearch, by segment: `saas` (B2B SaaS and developer tools, 5 to 100 people), `agency` (SEO, content, digital agencies, 1 to 30 people), `prof` (consulting, accounting, legal boutiques, 5 to 50 people). English-language sites in the US, UK, Canada, Australia and the EU. Use many different queries (industries, cities, product types, "alternatives to", "best X for Y"), take results from different positions, and skip directories, marketplaces, media, enterprises, public companies and the owner's prospects (you do not have that list; the sample is independent of it).
- Write `data/insight/<yyyy-Www>/frame.csv` with header `domain,segment`, one registrable domain per row, no duplicates, no URLs. Aim for roughly equal segment counts. Record in `data/insight/<yyyy-Www>/method.md` how the frame was built (queries used, date, counts). It is a purposive sample found through search, not random: say so.

## 2. Scan
- `git clone --depth 1 https://github.com/andacuzel/cited-geo-guide.git .cache/citehound` (public, read-only; `.cache/` is gitignored).
- `node scripts/insight-scan.js data/insight/<week>/frame.csv data/insight/<week>/scans.jsonl --concurrency 3`. It respects robots.txt (a site that disallows our crawler is skipped and counted), uses an honest user agent, one site at a time per worker with pauses. Do not run more than one scan job at a time. If the network blocks most requests, stop and say so in the run log.
- `node scripts/insight-analyze.js data/insight/<week>/scans.jsonl > data/insight/<week>/analysis.json`.

## 3. Think (this is the work)
Read `analysis.json`. Look for, and test against the numbers: segment gaps and whether the 95% interval excludes zero; correlations between pillars; accidental blocking by CDN, WAF or CMS defaults (`access_by_platform`, `access_by_cdn`, `blocking.no_ai_specific_rule_but_blocked`, managed robots.txt); declared policy against actual robots.txt behavior; what the top 5% share; the single fix that moves scores most. Be a skeptic: small n, hand-picked search results, one scan, datacenter IP (some failures are our address being blocked), a platform that is common only because the search picked it.
Write `data/insight/<week>/candidates.md` with exactly 3 ranked candidates, each with: claim in one sentence; the tension (what a practitioner expects vs what the data shows); the mechanism (why, as far as the data supports, and where it is only a guess); n and segment; the effect size and interval; confidence (high / medium / low / do not publish) with the reason; what to do Monday morning; method note. Discard a candidate that is weak and write a line "Discarded: <claim> because <reason>". If none is strong, say "No candidate is strong enough to publish this week" and send only a card of type `wording`, pillar `field-notes`, titled "Insight lab: nothing strong this week" with the discard reasons. Do not stretch weak evidence.
Never write a site name, a domain or a way to identify a site in any card, post or committed text outside `data/insight/` raw files. Say "a B2B SaaS homepage in our sample".

## 4. Content for each kept insight (confidence medium or higher)
For each, one card file and one `node scripts/inbox.js card` call:
- LinkedIn post for the personal account (130 to 200 words, measured, first person, the five elements: tension, mechanism, Monday morning, method note, confidence).
- Carousel copy, 8 to 10 slides, one idea per slide, slide text under 25 words, last slide = method note + confidence + the free scan link with UTM (`utm.js`). Same copy serves Instagram. Put it in `body` of a `page`-type card? No: use `type: "social"` with a draft `platform: "linkedin_page"` whose `text` is the slides numbered "Slide 1: ...", and a second draft `platform: "instagram"` with the same slides.
- X thread, 5 to 8 posts (`x` draft with `thread`).
- Blog outline (`type: "page"`, title "Blog outline: ...", body with H1, H2s, the data to cite with n and date, internal links to /research pages, the call to the scan, the method note). The blog does not exist until the owner approves the blog proposal card; the outline waits.
Pillar: `field-notes`. IDs `insight-<week>-<n>-<kind>`. Lint everything first.

## 5. Finish
`data/insight/<week>/` holds raw scans (private repo), analysis and candidates. Commit and push. Last line: how many sites scored, how many candidates kept, and the single honest caveat.
