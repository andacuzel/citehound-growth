# news-watch (every 3 hours, 06:00 to 21:00 Istanbul)

Read `routines/common.md` first and do its steps 1 and 2.

## Work
1. `node scripts/news.js fetch --hours 4` prints JSON: `items` (new ones only; already-seen items are filtered by `state/seen.json`), `failing_sources`. If `items` is empty, go to "Finish".
2. Items with `opportunity_only: true` (Hacker News, r/SEO, r/bigseo): do not draft posts. If one is a real chance for the owner to help someone (a question about AI crawlers, llms.txt, robots.txt, GEO measurement that he can answer from `CONTEXT.md` facts), append one line to `briefs/opportunities.md`: date, source, link, the question in your words, the fact he can offer. Mark the item `opportunity`, else `skip`.
3. For every other item, score four things from 0 to 10 using only the headline, snippet and, when needed, one WebFetch of the page (respect robots.txt; read, do not copy):
   - novelty (new today, not a rehash), relevance (changes what a small or mid-size B2B site does about AI crawlers, readiness or GEO practice), contrarian angle (we can say something the coverage does not, from our own research in CONTEXT.md, with a number, a date and its limit), shelf life (still useful in 3 days).
   - score = rounded mean. Several outlets on the same story are one story: keep the best source.
4. Score 6 or more: write a card file `queue/<yyyymmdd>-<item id>.json`:
   - `type: "social"`, `pillar: "hot-takes"` (or `field-notes` if the take is built on our own research), `title` (the headline in 100 characters), `why` (one sentence: the tension, expected vs found), `source_url`, `score`, `hot` (true only when score >= 8), `id` = the file name without `.json`.
   - `drafts`: (a) `x`: one post, at most 270 characters, one claim, no hashtags, no emoji, optional `thread` of 3 to 5 follow-up posts when the take needs mechanism and a Monday-morning action; (b) `linkedin_personal`: 80 to 150 words, first person, measured, no pitch, ends with the method note; (c) optional `linkedin_page` only if score >= 8.
   - Every link to getcitehound.com goes through `node scripts/utm.js --url <url> --platform <p> --pillar <pillar> --card <id>`. Never link a page that is not live (see CONTEXT.md).
   - Voice and wording: `VOICE.md` and `RULES.md`. Facts only from CONTEXT.md or the source, with date and limit. If you cannot make the take true and specific, score it lower and skip.
   - `node scripts/lint.js` on all draft text, then `node scripts/inbox.js card queue/<file>.json`. The inbox decides the phone push for hot cards (max 3 a day); if the reply says `"hot": false` for a card you marked hot, the cap was reached: say so in the log.
   - Mark: `node scripts/news.js mark <id>=hot:<score>` or `=card:<score>`.
5. Everything else: `node scripts/news.js mark <id>=skip:<score>` (one call with many ids).

## Finish
Append one line to `metrics/news-watch-log.csv` (create with a header if missing): `time_utc,fetched_new,carded,hot,skipped,opportunities,failing_sources`. Commit and push (common.md step 5).
If `failing_sources` is not empty, mention the source ids in your last line.
