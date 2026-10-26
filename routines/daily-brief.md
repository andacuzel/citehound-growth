# daily-brief (07:30 Istanbul, written in Turkish)

Read `routines/common.md` first and do its steps 1 and 2.

## Work
1. Read what happened since yesterday: `queue/` cards from the last 24 hours (id, score, title, outcome from `state/seen.json`), `metrics/news-watch-log.csv`, `briefs/opportunities.md` (last 24 hours), `state/sources-health.json`, the last `metrics/` rows, and `data/insight/` summaries if a new one arrived.
2. Write `briefs/<yyyy-mm-dd>.md` in Turkish, short, phone-readable, no emoji, in this order:
   - **Bugün paylaşılacaklar**: the best 1 to 3 cards waiting in the inbox (title, one line why, the card id). Say how many are waiting in total.
   - **Atlananlar ve neden**: three to five skipped items with a five-word reason each.
   - **Fırsatlar (Reddit/HN)**: opportunity lines from the last 24 hours, with the link. Only a list. He joins by hand.
   - **Bugünün tek büyüme aksiyonu**: exactly one concrete action for today that takes under 15 minutes, with the reason. Examples of the right size: approve the Trust wording card; answer one opportunity; post the best card; enter yesterday's numbers in the inbox "Numbers" tab. Never ask for more than one.
   - **Sistem**: only if something failed (a source failing 3 runs, a missing variable, a rejected push).
   Keep it under 220 words. English product terms stay English (Pro waitlist, Fix quote, scan).
3. `node scripts/inbox.js brief briefs/<date>.md` sends the brief to the inbox and, once, to the owner's own email (the inbox does that; you never handle an address).
4. Commit and push.
