# CONTEXT: what is true about Citehound (ground truth)

Checked 26 Oct 2026 against the live site (all 40 URLs in sitemap.xml, plus /pro, llms.txt, robots.txt) and the public repo (CLAUDE.md, docs/integrations/{RULES,TIERS,STATUS}.md, content/pricing.json, content/integrations.json, lib/plans.js). The live site and the code win over any brief. If you find a claim that is not in the truth table below as LIVE, do not write it.

Note: `docs/brand/BRAND.md` does not exist in the repo. Brand voice comes from "Voice" in the public CLAUDE.md and is copied into VOICE.md.

## What Citehound is
A one-person service (founder Andaç Üzel, Istanbul, sole proprietor) for AI readiness. A free scanner reads a site's robots.txt, sitemap, llms.txt and homepage and gives a 100-point score from 16 checks in three pillars (Discoverability 40, Technical foundation 20, Content and trust 40), plus the access state of 10 AI crawlers and a copy-paste fix per failed check. Positioning line: "Scan, fix and write for the way AI answers."

The score measures readiness: whether crawlers can reach a site and whether its pages carry signals a model can read. It never measures whether any assistant names, cites or recommends a brand.

## Who it is for
Marketing teams and agencies. Three tracks: B2B SaaS (/for-saas), consumer and e-commerce brands (/for-brands), local and independent professionals (/for-professionals). The growth desk targets small and mid-size only (see ICP.md).

## Plans today
| Plan | Price | What it is today |
|---|---|---|
| Scan | Free, no sign-up | Web scan, 16 checks, 10 crawlers, a fix per failed check. Result is not saved. |
| Pro | $39/mo or $390/yr | Early access. Payments are NOT open; waitlist; keys are activated by hand. First month free for the first 10 early-access users. Whole-site report up to 25 pages, weekly re-scan with email alerts for up to 5 domains (homepage, robots.txt, llms.txt only), predicted citation questions, optional dated citation check. |
| Fix | From $299, fixed quote after the scan | Early access, request a quote. Includes 3 months of Pro. Technical layer only: schema, robots.txt, llms.txt, sitemap, titles, descriptions. 14 days of small corrections. Applied by hand where access is given, otherwise files plus instructions. |
| Beyond | $490/mo, 3-month minimum, limited seats | Early access, apply. Includes Pro. Researched questions, gap analysis, 4 edited pieces a month approved by the customer, monthly re-measurement. |

API plan limits are in lib/plans.js and TIERS.md (Free 10/h, 40/day; Pro 200/2000; Fix 400/4000; Beyond 600/6000).

## FEATURE TRUTH TABLE
Status words: LIVE (say it), WAITLIST (say "join the waitlist"/"request a quote"), PLANNED / IN PREPARATION (do not describe as available).

| Claim | Status | Source and note |
|---|---|---|
| Free web scan, 16 checks, 10 crawlers | LIVE | home, /methodology |
| Free tools: robots.txt, llms.txt checker, schema generator | LIVE | /tools |
| Compare two sites | LIVE | /compare |
| MCP server, 13 read-only tools, 3 prompts, no key | LIVE | /mcp, MCP Registry listing live |
| Claude connector | LIVE | /claude |
| Claude plugin from our OWN GitHub marketplace (`andacuzel/cited-geo-guide`) | LIVE | /integrations. NOT in Anthropic's plugin directory. Never say "in the Anthropic directory". |
| `citehound` CLI on npm (`npx citehound scan`) | LIVE | npm 0.1.0; 0.1.1 in repo, unpublished at last check |
| n8n community node `n8n-nodes-citehound` | LIVE | community node, not reviewed by n8n |
| GitHub Action | LIVE | the only thing called "official" |
| Public API /v1 with free key | LIVE | free key is sent by email (collects an email) |
| Pro payments | PLANNED | built, not switched on. Waitlist only. |
| Pro waitlist | LIVE (collects email, name optional, consent) | /pro |
| Pro whole-site report | WAITLIST / hand-issued pilot links | sample at /sample-report is a real crawl of our own site, 4 Oct 2026 |
| Pro weekly re-scan with alerts | WAITLIST | scans homepage, robots.txt, llms.txt only, not the whole site |
| Citation questions (18+3 predicted, "Not tested") | WAITLIST | Pro feature, written for a site |
| Citation check | PRO ADD-ON, flag-gated | one provider (Claude with web search), about 10 questions, one run each, dated sample, never a ranking. ChatGPT is "coming", not live. The public CLAUDE.md says it is OFF unless the owner switches it on; /pricing lists it as included in Pro. See contradiction 3. |
| Fix | QUOTE | request a quote; fixed price after the scan |
| Beyond | APPLICATION | limited seats |
| Weekly watch in browser (/watch) | LIVE for Pro/Fix/Beyond keys, keys given by hand | |
| Newsletter | NOT BUILT | postponed until Trust wording is fixed |
| Blog | NOT BUILT | /blog returns 404 |
| Google Sheets, Looker Studio, Zapier, Make, Pipedream, Raycast, Activepieces, Slack, Chrome extension | IN PREPARATION | listed by name only on /integrations |
| State of AI Readiness PDF | GATED | the email form on the page says "The report is not available right now" at last check (26 Oct) |

## Research assets (cite these, with sample and date)
| Asset | Sample | Date | Key numbers |
|---|---|---|---|
| State of AI Readiness, Launch Edition 2026 (/research/state-of-ai-readiness) | 219 scored homepages of 278 attempted (59 unreadable, 43 because robots.txt could not be read), hand-picked well-known sites in 6 categories | scanned 29 to 31 Jul 2026 | mean 73, median 75, middle half 67 to 82, range 30 to 100. B2B software (125 sites) 76.4 vs consumer (94) 68.6, gap 7.8. Homepage content schema missing on 76.7%. 14 of 219 (6.4%) block at least one of ten tracked AI crawlers outright; one site blocks all ten. |
| Which AI crawlers do sites block? (/research/crawler-access-2026) | the same 219 | published 5 Oct 2026 | Bytespider most blocked: 8 of 219. 2190 pairs: 2% blocked, 80% limited by a Disallow rule (usually an ordinary path), 18% open. |
| Who controls your brand's AI representation? (/research/llms-txt-adoption-2026) | 64 sites, 2 categories (31 B2B), 13 checks | 29 Jul 2026 | llms.txt on 76% of consumer vs 55% of B2B; Shopify generates it; content schema missing on 91% of consumer and 48% of B2B homepages; 22 of 85 scans could not complete. |
| Case study 001 AgaOne Commodities (/research/case-study-agaone) | 2 sites, n=2 | Aug 2026 | 58 to 100 and 55 to 89, average 56.5 to 94.5 (+38). Published with permission. |
| Sample Pro report, our own site (/sample-report) | 28 pages | 4 Oct 2026 | homepage 87, whole site 83, 20 of 28 pages fail at least one check |
| Citation-tracking published sample (/citation-tracking) | one CRM brand, 18 questions x 5 tries | 2 Oct 2026, gemini-3.5-flash-lite, by hand, no web search | named in 44 of 90 answers. Format example, not a result. |
| Own site scan | 1 | 23 Oct 2026 | 87/100 |

Limits that must travel with every number: hand-picked sites, not a random sample; one scan each; no confidence intervals; readiness, not presence in answers. Aggregate figures on the research pages are CC BY 4.0; the PDF and raw data are not.

## Voice (from the public CLAUDE.md)
Declarative editor voice. Short sentences. Numbers before adjectives. Address the reader as a capable practitioner. US English. Max one em dash per paragraph. "Coming soon" is always "In preparation". Never "visibility" for the citation check. Banned words: quietly, actually, seamlessly, effortless, powerful, unlock, elevate, supercharge, game-changing, revolutionize, landscape, delve, crucial, robust. Banned construction: "not just X, but Y".

## Banned claims
- Any assistant recommends, cites or ranks a brand because of the score.
- Any promise about traffic, rankings, citations or revenue. The outcome disclaimer lives only on /terms.
- Invented numbers, testimonials, ratings, client names, logos.
- "official", "verified", "partner" about anyone (only our own GitHub Action may be "official").
- "In the Anthropic directory" or any listing not approved and live.
- That payments are open, that Pro can be bought, that ChatGPT is checked, that weekly re-scan covers the whole site.
- A claim about a competitor that is not on their public page with a check date.

## Contradictions and gaps found on 26 Oct 2026
1. **Trust page vs forms (HIGH).** /trust says: "No accounts, no email list and no scan history." The Pro waitlist, Fix/Beyond request forms, the free API key (sent by email), Pro report orders and the State of AI Readiness download all store an email address (waitlist 12 months; requests 12 months; report orders 90 days; readiness list up to 12 months, with an optional updates box). /privacy is accurate about this and says "the scanner and the tools collect no email address". Only /trust is wrong. Proposed wording is in `data/wording-fix-trust.md` and goes to the inbox as an approval card. Until it is approved and live, no email-capture growth tactic (newsletter, report-download campaigns) starts.
2. **"Company fax" field (RESOLVED, not a bug).** It is a honeypot. It sits in a `wl-trap` div with `aria-hidden`, `tabindex=-1`, `autocomplete=off`; the API (lib/waitlist-api.js, lib/readiness-api.js, api/subscribe.js) returns a normal success message when it is filled and stores nothing. A screen reader or autofill could still reach it in rare cases; optional hardening: rename the label to something neutral and hide with CSS rather than relying on `aria-hidden` alone. Low priority.
3. **Citation check: included or add-on (MEDIUM).** /pricing and the home page list "Citation sample on Claude (ChatGPT coming)" as a Pro bullet and the compare table marks it "Included" for Pro, Fix, Beyond. /pro, /citation-tracking and /about say a report "can also include" a check, and llms.txt calls it "(pilot)". The public CLAUDE.md says the check is OFF unless the owner switches it on and costs about $0.125 a report. Say "Pro can include a dated citation check on a sample" until the owner confirms.
4. **Weekly re-scan scope (LOW).** The pricing bullet says "Weekly homepage re-scan"; /watch says homepage, robots.txt and llms.txt. Consistent; just never say "weekly site re-scan".
5. **"Verified" on the Fix demo (LOW).** The Fix demo (home and /fix) shows a "Verified" status label on sample items. RULES.md bans "verified" about anyone but is about partners and claims; the demo label describes a re-checked fix. Flag to the owner; consider "Re-checked".
6. **"AI visibility" in a customer quote (LOW).** The home page and /fix quote AgaOne: "increased the AI visibility score". The project rule is that "visibility" never describes the citation check; the quote is the customer's own words. Keep the quote, never echo "visibility" in our own copy.
7. **Missing BRAND.md (INFO).** The brief points to docs/brand/BRAND.md; it does not exist.
8. **Branch rule conflict (INFO).** docs/integrations/RULES.md says never push to main; the root CLAUDE.md says push to main with all gates green and run the smoke test. For desk-built pages: work on a branch, open it for the owner's approval card, merge to main only after approval and green gates, as the brief says.
9. **Function limit (CONSTRAINT).** The citehound project uses 11 of 12 Hobby functions and `/api/v1/[...path].js` is "the 12th and last". A blog must be static HTML generated by a script. No new function. Hosting the inbox in a separate Vercel project avoids the limit.
10. **Dating (INFO).** The 219-site research is a July snapshot; the home page shows a 23 Oct scan of our own site, the sample report 4 Oct. Always date a number.
