# Insight lab: 30-site pipeline test (26 Oct 2026). Not for publication.

Sample: 30 domains chosen by hand from search results and general knowledge, not by the weekly procedure. 24 scored, 6 failed (5 DNS errors from guessed domains, 1 robots.txt served as HTML). By segment: 11 SaaS, 7 agency, 6 professional services. Homepage only, one scan each, scanned from a Mac on 26 Oct 2026. This proves the pipeline. It does not support a claim about any group of sites.

## Verdict: no candidate is strong enough to publish.

### 1. Sites at the top share content schema (confidence: do not publish)
Tension: you expect the best sites to win on crawler access; here they win on schema. Mechanism: unclear, possibly one plugin or theme adding Article, Organization and JSON-LD together (tech and trust pillars correlate at r = 0.64, n = 24). Evidence: 3 of 3 top-5% sites pass content schema, against 14% of the other 21. Why discarded: the top group is 3 sites, and the sample is hand-picked. A pattern in three sites is an anecdote.

### 2. Organization / WebSite schema is where most points are lost (confidence: low)
54% of the 24 sites fail it, 4.3 points lost on average, the biggest bucket. Why it is not content: the July study (219 sites) already reported schema as the most common gap (76.7% for content schema). This repeats it in a smaller sample and adds nothing. Use it only as a supporting line in a Teardown & Fix post.

### 3. None of the 24 sites blocked any of the ten AI crawlers (confidence: low)
Tension: the July study found 6.4% of well-known sites block at least one. Small B2B sites in this test block none, and the gap to fix is signals, not access. Mechanism: unknown; small sites rarely edit robots.txt. Why it stays low: 0 of 24 has a 95% upper bound of about 12% (rule of three: 3/24 = 12.5%), which includes the July rate. The data cannot tell the two apart.

### Segment gaps
SaaS 77.0 (n=11), agency 81.3 (n=7), professional services 72.8 (n=6). Every 95% interval for a gap includes zero (for example agency vs professional services +8.5, interval -7.2 to +24.1). No segment story.

### What would make a real run strong
150 or more sites found by the weekly procedure; at least 30 per segment; a platform or CDN group of 15 or more to test "accidental blocking by defaults". Today's blockers: zero, so that question cannot be answered at this size.


## Correction (26 Oct 2026, later the same day)
Candidate 3 above ("none of the 24 sites blocked any crawler") is void. The scan script looked for the crawler state `blocked` while the scanner reports `block`, so blocking was never counted in this test. The bug was found and fixed by the first full cloud run. See `data/insight/2026-W44/`.
