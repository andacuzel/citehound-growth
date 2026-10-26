# Citehound Growth Desk (private)

Moves qualified visits into the funnel (free scan, then Pro waitlist, Fix quote, Beyond application, API key) at near-zero cost. It drafts; the owner approves and publishes by hand. It posts nowhere, emails no prospect, and holds no secret.

## Files
| Path | What |
|---|---|
| `CONTEXT.md` | Ground truth: plans, feature truth table, research assets, banned claims, contradictions found |
| `RULES.md` | Hard rules for every task |
| `VOICE.md` | Voice, pillars, accounts, UTM rule, learned rules (appended from the owner's decisions) |
| `ICP.md` | Who we write for and who we skip |
| `sources.yaml` | news-watch sources, thresholds |
| `state/seen.json` | Dedup memory for news-watch (90 days) |
| `queue/` | Card files sent to the inbox |
| `briefs/` | Daily briefs (Turkish), opportunities list, run errors |
| `data/` | Proposals, wording fixes, insight-lab runs (`data/insight/<week>/`, raw scans stay in this private repo) |
| `metrics/` | Run logs, weekly numbers |
| `routines/*.md` | The instructions each scheduled task follows |
| `scripts/` | Dependency-free Node: `news.js`, `lint.js`, `utm.js`, `inbox.js`, `decisions.js`, `insight-scan.js`, `insight-analyze.js`, `metrics.js` |
| `inbox/` | The approval inbox (its own Vercel project, `growth-inbox`) |

## Scheduled tasks
| Task | Where | When (Istanbul) | Model |
|---|---|---|---|
| news-watch | cloud routine | 06:00 to 21:00 every 3 hours | Haiku 5.5 |
| daily-brief | cloud routine | 07:30 | Sonnet 5.5 |
| insight-lab | cloud routine | Saturday morning | Opus 5.5 |
| prospect-weekly | local task on the owner's Mac (`~/dev/citehound-outbound`) | Tuesday 11:00 | session model |

Cloud routines need two environment variables in their claude.ai environment: `INBOX_URL` (https://growth-inbox.vercel.app) and `INBOX_TOKEN` (the machine token; the owner pastes it, it never goes in a prompt or file). Network access must allow arbitrary sites for news-watch and insight-lab.

## Run the tests
```
node --test test/*.test.js
cd inbox && node --test test/*.test.js
```
