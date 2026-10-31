# Insight lab 2026-W44 (r2, Saturday run): method

Date: 31 Oct 2026. Frame built and scanned the same day, from a cloud data-center address.

## Why a second W44 folder
The W44 lab first ran on Monday 26 Oct (`data/insight/2026-W44/`). This is the scheduled Saturday run in the same ISO week. Rather than overwrite Monday's data, it draws a new frame with **no domain in common** with Monday's 244 and uses it as an independent replication of Monday's one kept candidate (the WordPress schema gap).

## How the frame was built
Purposive sample found through web search, not random. Three search passes, one per segment, each by a sub-agent using WebSearch with varied queries (industries, cities different from Monday's, niches, "alternatives to", "best X for Y"). Every domain had to appear as a URL in a search result; no domain was filled in from memory (Monday's SaaS weakness). Excluded: directories, marketplaces, media, listicles, large firms and networks, public companies, AI-readiness vendors, and all of Monday's domains. Size and location were judged from search snippets, not checked on the sites.

Counts: 244 domains (saas 82, agency 80, prof 82). Queries: saas 58, agency 36, prof 94.

Known weaknesses reported by the passes:
- SaaS: about a third of queries returned only directories or funding news; the kept domains lean toward vendors that publish their own "alternatives"/"best X" posts, i.e. content- and SEO-active companies. Headcount judged from memory for a few borderline entries.
- Agency: size estimated from snippets; some may be above 30 people or freelancers.
- Prof: uneven mix, about 40 legal, 18 consulting/IT/HR, 12 accounting (CPA queries mostly returned directories).

## Scan
`scripts/insight-scan.js`, concurrency 3, honest user agent, robots.txt read first; homepage, robots.txt, llms.txt and a sitemap probe per site. One scan each. Analysis by `scripts/insight-analyze.js`.

## Queries

### saas
- HR software for small businesses startup seed round
- legal tech startup contract management software for small law firms
- Show HN open source developer tool API testing
- bootstrapped SaaS freight logistics software small carriers
- nonprofit donor management software small charities UK
- alternative to Jira for small engineering teams
- property management software for small landlords startup Austin
- accounts payable automation startup for mid-market finance teams seed funding
- SOC 2 compliance automation startup alternative to Vanta
- school administration software startup UK timetabling SaaS
- Postman alternative lightweight API client for teams
- rota scheduling software for care homes UK SaaS
- feature flag tool for startups open source self-hosted
- Toronto B2B SaaS startup raises seed round 2026
- Melbourne startup B2B software raises seed funding 2026
- uptime monitoring status page tool pricing small teams
- dental practice operations software startup patient scheduling SaaS
- data pipeline ELT tool for startups alternative to Fivetran
- legal practice management software for UK solicitors cloud small firms
- volunteer management software for nonprofits small team
- secrets scanning tool for GitHub repositories startup
- warehouse management system for 3PL small business cloud pricing
- employee onboarding software alternative to BambooHR for startups
- Dublin startup SaaS platform for accountants practice automation
- "Show HN" self-hosted error tracking alternative to Sentry
- bootstrapped B2B SaaS founder interview $1M ARR team of 10
- construction subcontractor compliance software UK startup
- database schema migration tool for Postgres teams CI
- expense management software for small businesses Canada startup
- clinic staff credentialing software for healthcare operations startup
- how to automate invoice reminders for B2B accounts receivable small finance team
- matter intake software for immigration law firms
- Kubernetes cost monitoring tool for startups open source
- fleet maintenance software for small trucking companies
- grant management software for small foundations
- self-hosted product analytics for B2B SaaS GDPR compliant EU startup
- tenant screening API for property managers startup
- performance review software for small companies alternative to Lattice
- Berlin startup developer tooling infrastructure seed round English
- vulnerability management platform for small security teams startup
- e-signature API for developers pricing startup
- learning management system for association member training small team SaaS
- payroll reconciliation tool for bookkeepers Xero add-on Australia
- on-call scheduling incident management alternative to PagerDuty for small teams
- route planning software for field service small business UK
- customs documentation software for freight forwarders small UK SaaS
- OpenAPI documentation generator hosted developer portal small company
- commercial real estate deal pipeline CRM for brokers startup
- student information system for small private schools cloud startup
- revenue recognition software for SaaS startups ASC 606 small finance team
- board meeting software for nonprofits and small companies
- synthetic test data generation tool for developers privacy
- medical billing denial management software for small practices startup
- Show HN database GUI client for Postgres launched
- procurement software for mid-sized companies Sydney startup
- applicant tracking system for small recruitment agencies UK bootstrapped
- webhook testing and API mocking tool for developers startup pricing
- event management software for associations small team Chicago SaaS

### agency
- small SEO agency Sheffield
- boutique SEO agency for law firms Boise Idaho
- dental marketing agency small team Ottawa
- content marketing agency for SaaS small team Wellington New Zealand
- independent digital marketing agency Hobart Tasmania
- ecommerce SEO agency Cork Ireland
- SEO consultancy Nottingham small team
- PPC agency Brighton independent
- healthcare marketing agency small Asheville NC
- nonprofit digital marketing agency Minneapolis boutique
- hospitality marketing agency for restaurants hotels Canberra
- B2B content agency Cardiff Wales
- SEO agency Leicester family run
- law firm SEO agency Richmond Virginia small
- digital marketing agency Christchurch NZ local businesses
- Shopify SEO agency Newcastle upon Tyne
- dentist SEO agency Calgary
- SaaS SEO agency small team Amsterdam English
- local SEO company for tradespeople Hamilton New Zealand
- PPC management agency Exeter Devon
- content writing agency Victoria BC SEO
- medical practice marketing agency Tampa small
- SEO agency Geelong Victoria
- B2B SEO agency Chicago boutique technical
- SEO agency for accountants and financial advisers UK small
- digital marketing agency Galway Ireland
- Google Ads agency Sunshine Coast Queensland
- SEO agency Kansas City small business
- nonprofit SEO content agency charities UK
- hotel digital marketing agency independent Charleston SC
- SEO consultant agency Bath Somerset
- ecommerce PPC agency small team Vancouver BC
- home services SEO agency HVAC plumbers small US
- content marketing agency Auckland boutique
- digital marketing agency Norwich Norfolk independent
- SEO agency Malta English small team

### prof
- boutique CPA firm Raleigh small business tax
- employment law firm Nashville small boutique
- boutique strategy consulting firm Minneapolis
- chartered accountants Cardiff small practice
- immigration solicitors Birmingham independent firm
- IP law firm boutique Calgary patent agents
- family law firm Halifax Nova Scotia small team lawyers
- startup lawyer Salt Lake City venture financing boutique firm
- bookkeeping and accounting firm Wellington NZ small business Xero
- HR consulting firm Columbus Ohio small business outsourced HR
- audit and assurance CPA firm Omaha nonprofit audits
- operations consulting firm Adelaide small business process improvement
- "boutique" accounting firm Halifax CPA "our team" small business tax planning
- Auckland employment lawyers boutique firm personal grievance
- IT consulting firm Hobart managed services small team
- Nottingham family law solicitors divorce specialist small firm
- Pittsburgh CPA firm tax preparation small business family owned practice
- management consultancy Glasgow strategy consultants SMEs
- trademark attorney Boise Idaho intellectual property small firm
- R&D tax credit CPA firm Cincinnati boutique
- immigration law firm Charlotte NC H-1B green card attorneys
- fractional CFO and accounting firm Perth WA small business advisers
- employment solicitors Sheffield for employers small specialist firm
- nonprofit strategy consulting firm Baltimore strategic planning consultants
- CPA firm Savannah Georgia tax planning small businesses
- Ottawa employment lawyer wrongful dismissal small firm
- Canberra management consulting firm public sector boutique
- accountants Norwich small business tax returns independent practice
- family law attorney Kansas City divorce custody small firm
- startup law firm Amsterdam English-speaking lawyers for founders
- HR consultancy Bath employment advice small businesses outsourced HR
- IT strategy consulting firm Milwaukee small and midsize businesses
- patent attorneys Christchurch New Zealand firm
- cloud bookkeeping firm Sacramento small business monthly bookkeeping CPA
- Cork accountants tax advisors SME practice Ireland
- immigration lawyer Winnipeg firm work permits express entry
- tax resolution CPA firm Tampa IRS representation small firm
- employment law firm for employees Sacramento wrongful termination attorneys
- operations management consultants Cleveland manufacturing lean consulting firm
- family law firm Gold Coast Queensland separation property settlement
- accountancy practice Exeter Devon chartered accountants small businesses
- IP law firm Raleigh Durham patent prosecution boutique
- HR consulting firm Calgary small business HR policies handbook consultants
- CPA firm Indianapolis audit tax advisory closely held businesses small firm
- immigration solicitors Cambridge UK business visas sponsor licence
- startup attorney San Diego small business formation law firm
- strategy consultancy Auckland boutique growth strategy advisors
- bookkeeping services Newcastle NSW small business BAS agent
- estate planning and tax CPA firm Richmond Virginia small practice
- employment lawyers Edmonton boutique firm employers
- management consulting firm Louisville Kentucky small consultancy operations improvement
- trade mark attorneys Brighton UK IP firm small
- immigration attorney Albuquerque New Mexico law office family visas
- accountants Hamilton New Zealand chartered accountants small firm farm business
- "boutique law firm" Denver alternative: Boulder Colorado business law startups small team
- "we are a small" CPA firm St. Louis tax accounting services
- HR consulting firm Atlanta fractional HR small business consultancy
- family law solicitors Belfast Northern Ireland divorce firm
- IT consultancy Galway Ireland small business IT support consultants
- tax accountants Victoria BC small business corporate tax CPA firm
- Hartford Connecticut CPA firm small business accounting tax services
- employment law solicitors Cardiff Wales specialist firm
- business strategy consultant Wellington New Zealand consultancy firm
- immigration lawyer Houston business immigration small firm EB-5 L-1
- patent law firm Ann Arbor Michigan intellectual property small
- accountants Darwin Northern Territory small business tax accounting firm
- outsourced accounting firm for startups CPA Oakland Bay Area small firm
- Leicester solicitors immigration and family law independent practice
- HR consultancy Dunedin or Christchurch employment relations advisors small businesses
- Philadelphia boutique employment law firm management side
- Montreal English speaking accountant CPA firm small business tax Quebec
- IT consulting firm Charleston South Carolina small business technology consultants
- CPA firm for dental practices Dallas accounting dentists
- law firm for creative businesses trademarks copyright Nashville musicians entertainment attorney
- accountants for contractors and freelancers Reading Berkshire small accountancy firm
- family lawyer Hamilton Ontario family law firm small
- operations consulting small manufacturers Grand Rapids Michigan consultancy
- immigration lawyers Adelaide migration agents law firm skilled visas
- fractional COO operations consulting firm for professional services firms small team
- boutique management consultancy Oxford UK strategy and change consultants
- HR consulting firm San Antonio Texas compliance training small business
- IT consulting Saskatoon Regina managed IT small business firm
- strategic planning consultant Tucson Arizona consulting firm nonprofits businesses
- Rotterdam or Utrecht English-language accountancy firm expats ZZP tax returns
- "employment lawyer" Toowoomba OR Townsville law firm unfair dismissal
- nonprofit audit CPA firm Albany New York small firm single audit
- HR consultancy Liverpool UK outsourced HR small business employment law advice
- business law firm Madison Wisconsin startups small businesses attorneys
- revenue operations consulting firm small team B2B consultancy Las Vegas or Reno
- Swansea accountants chartered small business tax advisers firm
- boutique IT consulting firm Microsoft 365 consultants Sunshine Coast Queensland small business
- management consulting firm Des Moines Iowa small business advisors strategy
- tax accountant Tauranga chartered accountants firm small business
- intellectual property solicitors Newcastle upon Tyne trademark small firm
