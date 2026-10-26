# RULES: hard rules for every desk task

Read CONTEXT.md first. If a task would break a rule here, stop and write a card explaining why.

## Never
- Post to any social platform, send any email to a prospect, or reply on Reddit or Hacker News. The owner publishes by hand. Reddit and HN: opportunities list only.
- Print, paste, log or commit a secret, token, key or passphrase. Environment variables only. A task that finds one in a file removes it and tells the owner.
- Touch `claude-plugin/` in the public repo (under review). Change the public repo except for pages the owner approved in the inbox.
- Put contact data, suppression lists, API keys, recipient emails or personal data in this repo, a card, a brief or a log. Prospect cards show company, finding and draft only.
- Use LinkedIn, social networks or bought lists for prospecting. Respect robots.txt on every page fetched. Identify the fetcher honestly (`CitehoundResearchBot/1.0 (+https://getcitehound.com)`), one request at a time per host, at least 2 seconds apart.

## Wording (applies to every draft, brief, template, page)
- The score measures readiness. Never say or imply an assistant recommends, cites or ranks a brand because of it.
- No promise about traffic, rankings, citations or revenue.
- No invented numbers, testimonials, counts, ratings, client names or logos. A number needs a source and a date in the draft.
- No "official", "verified" or "partner" about anyone (our GitHub Action may be "official").
- Only LIVE things are described as available (CONTEXT.md truth table). Payments are not open. Pro is a waitlist. Fix is a quote. Beyond is an application.
- The Anthropic plugin directory listing is not live: never "in the Anthropic directory".
- Banned words: quietly, actually, seamlessly, effortless, powerful, unlock, elevate, supercharge, game-changing, revolutionize, landscape, delve, crucial, robust. Banned construction: "not just X, but Y". Max one em dash per paragraph. US English. "In preparation", never "coming soon".
- Never name a scanned site in any insight, card or post. Say "a B2B SaaS homepage in our sample".
- Run `node scripts/lint.js <file>` on every draft before it becomes a card. A draft that fails is rewritten or dropped.

## Evidence
- Every insight states: the sample size, the date, how sites were chosen, and a confidence level (high / medium / low / do not publish). Under 30 sites in a segment, or a gap under 5 points, is "low" at best. Hand-picked samples are never "the web".
- Each insight has tension (expected vs found), mechanism, "what to do Monday morning", a method note, and a confidence level. Bare statistics are not content.
- Discard weak candidates and say so in the run log.

## Money
- Near-zero cost. Routine scans use the light model; the strong model only for final copy and the insight analysis.
- No paid APIs without a cap in `config`. The prospect agent's budget lives in its own folder.

## Approvals
- Anything outward-facing (a social draft, a page, a Trust wording fix, a blog post) goes to the inbox and waits. Approve opens a share link; the owner posts by hand.
- Each run starts by consuming decisions (`node scripts/decisions.js pull`): rejection reasons and notes become learned rules in VOICE.md; edit requests are regenerated.
