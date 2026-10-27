# VOICE

## Base voice
Declarative editor voice. Short sentences. Numbers before adjectives. The reader is a capable practitioner (an SEO lead, a content head, an agency owner). Plain US English. Max one em dash per paragraph. No hustle-culture, no hype, no emojis in LinkedIn posts, at most one in X.

## Accounts
- **Andaç on LinkedIn (personal).** A credible GEO practitioner thinking out loud. Measured, first person, specific. 2 to 3 posts a week. Never salesy. No pitch in the first post of a thread; a link to the free scan only where it answers the reader's next question. Nothing about any employer, past or present. No job-hunt mention.
- **Citehound on X.** Faster and drier. One claim per post, a number, a method note. Threads of 5 to 8 posts for Field Notes and Teardowns.
- **Citehound LinkedIn page.** Reposts of the best personal posts, and carousels (8 to 10 slides).
- **Citehound Instagram.** Carousels reusing the same slides; later short video. Same facts, shorter lines.

## Pillars (target mix)
Field Notes 40% (original research insight) / Hot Takes 25% (news reaction) / Teardown & Fix 20% (a specific mistake and the fix) / Founder Log 15% (honest build-in-public, true numbers only).

## Every insight post has
1. Tension: what you would expect vs what we found.
2. Mechanism: why it happens.
3. Monday morning: one thing to do.
4. Method note: sample, date, how chosen.
5. Confidence: high / medium / low, said plainly.

## Benchmark behavior (observe patterns, never copy wording)
Study public posts of Semrush on LinkedIn and X for pacing and format variety: how often they post, how they mix charts, short takes, carousels, polls and links, where links sit (first comment vs body). The desk keeps notes in `data/benchmark-notes.md` as patterns only.

## Links
Every link gets UTM parameters: `utm_source` (x | linkedin_personal | linkedin_page | instagram | reddit | hn), `utm_medium=social`, `utm_campaign` (pillar slug), `utm_content` (card id). Build with `node scripts/utm.js`.

## Learned rules
Rules below are appended by `node scripts/decisions.js pull` from the owner's rejections and edit notes. Do not edit by hand except to prune.

<!-- learned-rules:start -->
- 2026-10-26 [field-notes] edit requested (note: Soften causal language: say "the data suggests the plugin default explains most of it", not "why". Add the selection-bias caveat: sites found via web search are more likely to be SEO-active, which may): apply to the card and treat as a style rule for similar drafts. Card: insight-2026-W44-1-blog
- 2026-10-26 [page] approved as written: the tone of card 20261026-page-blog is a good example.
- 2026-10-26 [page] approved as written: the tone of card 20261026-page-agency-geo is a good example.
- 2026-10-27 [field-notes] edit requested (note: Soften causal language: say "the data suggests the plugin default explains most of it", not "why". Add the selection-bias caveat: sites found via web search are more likely to be SEO-active, which may): apply to the card and treat as a style rule for similar drafts. Card: insight-2026-W44-1-blog-r2
- 2026-10-27 [field-notes] edit requested (note: Remove or verify "mostly from a default admin-path Disallow" in post 4. Make post 1 hook-first: "We expected Webflow and custom builds to beat WordPress on AI readiness. They did not."): apply to the card and treat as a style rule for similar drafts. Card: insight-2026-W44-1-x
- 2026-10-27 [field-notes] edit requested (note: Render the slides as images using the brand templates (1080x1350 PNG, one per slide) and attach them to the card; text-only cards cannot be posted.): apply to the card and treat as a style rule for similar drafts. Card: insight-2026-W44-1-carousel
- 2026-10-27 [field-notes] edit requested (note: Change "Last week" to "Today" or "This week" (scan date was 26 Oct). Remove the URL from the post body; put it in a "first comment" line below the post. Add one sentence on the selection caveat.): apply to the card and treat as a style rule for similar drafts. Card: insight-2026-W44-1-linkedin
- 2026-10-27 [hot-takes] edit requested (note: Do not publish. Provide the exact source URL and date for "delayed to Nov 20" and "WAN-IFRA asked". The Oct 19 SEJ article says effective Oct 30, "train" removed, crawl right kept.): apply to the card and treat as a style rule for similar drafts. Card: 20261026-e89b355b65da
- 2026-10-27 [hot-takes] edit requested (note: Source not verifiable; figures differ from other published studies. Reopen only with the primary link.): apply to the card and treat as a style rule for similar drafts. Card: 20261026-6d5214488cee
- 2026-10-27 [page] edit requested (note: Do not say "the scan stores nothing". Say the scan result and the address are not stored, and a one-way hashed IP counter is kept up to a day for rate limits.): apply to the card and treat as a style rule for similar drafts. Card: 20261026-wording-trust
- 2026-10-27 [page] edit requested (note: ite a source for the statement about Google not using llms.txt, and state the study's sample sizes (31 B2B, 33 consumer) in the method note.): apply to the card and treat as a style rule for similar drafts. Card: 20261026-page-llmstxt-explainer
- 2026-10-27 [page] edit requested (note: Approve only the research of competitor candidates; do not build. Lower priority than the blog and the agency page.): apply to the card and treat as a style rule for similar drafts. Card: 20261026-page-compare
<!-- learned-rules:end -->
