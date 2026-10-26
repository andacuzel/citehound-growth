# Wording fix: /trust "What we store" (and a check of /privacy)

Found 26 Oct 2026. Priority: before any email-capture growth tactic (newsletter, report-download campaign, waitlist push).

## Current text on /trust (row "What we store")
> No accounts, no email list and no scan history. The privacy page lists the few things we do keep and for how long.

## Why it is wrong
Five forms store a readable email address: the Pro waitlist (12 months), the Fix and Beyond request forms (12 months), Pro report orders (90 days), the State of AI Readiness download (up to 12 months, plus an optional updates box), and the free API key (only hashes and a masked form are kept). /privacy says this correctly. /trust contradicts it, and it is the page people read to decide whether to trust the site.

## Proposed text (replace the row body)
> The scan stores nothing: no account, no scan history, no email address. If you join the Pro waitlist, ask for a Fix quote or a Beyond place, order a report or download the State of AI Readiness report, we keep the email address you give us, for up to 12 months (report orders: 90 days), and use it only for that. A free API key keeps a hash and a masked form of your address, not the address. Write to hey@getcitehound.com and we delete your record. The privacy page lists every item and how long it is kept.

Link text stays "Read the privacy policy".

## Other places to check when it goes live
- `trust.html` source is generated: change the generator or its content file, not only the page (see CLAUDE.md "update generators").
- `/privacy`: first paragraph under "What we store" says "the scanner and the tools collect no email address". That sentence is true and should stay, because it is about the scanner and tools. Add "The forms below are the exceptions." if the owner wants the link between the two pages to be explicit.
- Home page and `/pricing` say "No sign-up" for the free scan: still true.
- Run `npm run gates` before the push; `scripts/test-legal-pages.js` lists the owner-only blanks.

## Optional, low priority
The "Company fax" honeypot is correct in the code (it stores nothing and returns a normal answer when filled). Use a neutral label and hide it with CSS only, so screen readers and autofill never meet it.
