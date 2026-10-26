# weekly metrics (Monday, part of the morning brief)

The inbox "Numbers" tab holds what the owner enters: impressions and clicks per post, and scans, waitlist joins, quote requests and applications. A scheduled run cannot read the Citehound dashboards (Vercel Web Analytics, waitlist) because those need the owner's accounts. The weekly table is therefore built from what the owner enters plus `done` decisions (which pillar, which platform was posted).

`node scripts/metrics.js` prints the table (by pillar and platform) as Markdown from `metrics/weekly.csv` and the posted cards; the Monday brief includes it and says honestly which columns are empty.
