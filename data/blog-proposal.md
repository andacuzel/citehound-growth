# Proposal: a /blog section, separate from /research

## Intent
/research holds methodical studies: sample size, scan date, method, limits. /blog holds interpretation: how-to, news takes, teardowns. A post may cite /research; it never carries a new statistic that is not in /research or in a dated, labelled method note.

## Rules
- At most 1 to 2 posts a week, each tied to an insight kept by the insight-lab or to a news item scored 8+.
- Each post: Article JSON-LD, canonical URL, one H1, H2 sections, internal links to the research it uses and to the free scan, author line (Andaç Üzel), published and updated dates, method note, confidence level.
- Each post is added to `llms.txt` and `sitemap.xml` by the generator, with no thin or duplicate content (a post under 500 words or with a near-duplicate of another post does not ship).
- No claim that any assistant names or cites a brand because of a fix. No promise about traffic or rankings. Wording rules: RULES.md.
- Every post is an approval card with the full text, and goes live only after approval.

## Build (after approval of this card)
Static only: the citehound project is at the Hobby limit of 12 serverless functions, so no function is added.
1. `content/blog/*.json` (one file per post) and `scripts/generate-blog.js` writing `/blog` (index) and `/blog/<slug>`, using the existing design system (`styles.css`, `lib/page-shell.js`).
2. Add `/blog` and the posts to `sitemap.xml` and `llms.txt` from the generator; add Article JSON-LD per post.
3. Tests: a gate that fails on a missing canonical, missing Article schema, a banned word, an unlisted post in the sitemap or `llms.txt`.
4. Work on a branch, `npm run gates`, merge to main after the approval, run the smoke test, report the live URL.

## Not in scope
Comments, tracking, a newsletter (postponed until the Trust wording is fixed), guest posts.
