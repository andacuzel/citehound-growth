# Insight lab 2026-W44: method

Date: 26 Oct 2026 (frame built and scanned the same day, from a cloud data-center address).

## How the frame was built
Purposive sample found through web search, not random. Three search passes, one per segment, each by a sub-agent using WebSearch with many varied queries (industries, cities, product types, "alternatives to", "best X for Y"), taking results from varied positions. Excluded: directories, marketplaces, media, enterprises and public companies, AI-readiness scanning vendors. Size was judged from search snippets, not from the sites. The sample is independent of the owner's prospect list (not consulted).

Known weakness: the SaaS pass reported that search results mostly returned company names, not addresses, so most SaaS domains and their size/location were filled in from the agent's own knowledge. Those SaaS sites are more likely to be better-known companies than a search-only pass would yield, and some domains may be wrong (they surface as DNS failures). The agency and professional-services passes report picks from search snippets.

Counts: 244 domains after de-duplication (saas 82, agency 79, prof 83; prof is about a third each consulting, accounting, legal). Queries: saas 40, agency 67, prof 55 (listed below).

## Scan
`scripts/insight-scan.js`, concurrency 3, honest user agent, robots.txt read first; homepage, robots.txt, llms.txt and a sitemap probe per site. One scan each. Analysis by `scripts/insight-analyze.js`.

## Queries

### saas
- alternatives to Postman API testing tool small startup
- best feature flag tools for small teams open source startup
- seed-stage B2B SaaS startup London raises seed round 2025 workflow software
- best changelog tools for SaaS product updates
- alternatives to Statuspage status page tools for startups
- best invoicing software for freelancers and agencies UK small company
- alternatives to Calendly scheduling tool for teams
- best open source observability tools startup self-hosted logs
- best customer feedback widget tools SaaS bootstrapped
- best SOC 2 compliance automation alternatives to Vanta for small startups
- Toronto B2B SaaS startup seed funding announcement 2025
- Melbourne Sydney SaaS startup seed round raises B2B platform
- best tools for screenshot API and PDF generation API developers
- alternatives to Zapier for developers workflow automation open source
- best employee scheduling software for restaurants small business startup
- best headless CMS for developers small alternatives to Contentful
- best tools for legal teams contract management software startups mid-market
- Berlin Amsterdam developer tools startup seed funding API platform
- best property management software for small landlords startup UK
- alternatives to Intercom live chat for small SaaS
- best uptime monitoring tools for indie hackers and small SaaS
- best subscription billing and SaaS metrics tools for early-stage startups alternatives to ChartMogul
- best construction project management software small contractors startup
- best user onboarding product tour tools alternatives to Appcues
- best database GUI client for Postgres developers alternatives
- best email API for transactional emails alternatives to SendGrid small providers
- best privacy-friendly web analytics alternatives to Google Analytics EU
- best recruiting ATS for small companies startups alternatives to Greenhouse
- best field service management software small HVAC plumbing businesses
- best secrets management tools for developers alternatives to HashiCorp Vault startups
- best tools for API documentation developer portal alternatives to ReadMe
- best accounts receivable automation software for SMB finance teams startup
- best proposal software for agencies alternatives to PandaDoc and Proposify
- Dublin Ireland SaaS startup raises seed funding B2B software 2025
- best background job queue and cron monitoring tools for developers
- best internal knowledge base software for support teams alternatives to Zendesk Guide small companies
- best webhook infrastructure and API gateway tools for startups
- best software for dental clinics and veterinary practice management startup cloud
- best social media scheduling tool for small agencies alternatives to Hootsuite indie
- best time tracking and timesheet software for consultancies small teams alternatives to Harvest

### agency
- SEO agency Leeds small team
- content marketing agency Denver
- B2B content agency Dublin
- small digital marketing agency Adelaide
- dental SEO agency
- boutique SEO agency Manchester independent
- SaaS content marketing agency small team writers
- ecommerce PPC agency Shopify Google Ads specialist UK
- SEO agency Bristol independent team
- digital marketing agency Halifax Nova Scotia
- "small team" SEO agency Brisbane
- boutique content marketing agency Toronto B2B
- independent SEO agency Austin Texas small team
- law firm SEO agency boutique
- digital marketing agency Glasgow small independent
- SEO consultancy Edinburgh small agency
- content marketing agency Portland Oregon small
- SEO agency Perth WA boutique
- Shopify SEO agency small team ecommerce
- digital marketing agency Vancouver BC independent boutique SEO
- "we're a small team" SEO agency UK
- "boutique" content marketing agency Chicago
- SEO agency Melbourne small team founder-led
- PPC agency Cork Ireland Google Ads small
- SEO agency Asheville North Carolina small
- B2B SaaS SEO agency boutique founder
- SEO agency Nottingham small independent
- digital marketing agency Calgary small team SEO
- English speaking SEO agency Amsterdam small team
- healthcare content marketing agency small team medical writers
- content marketing agency Sheffield small team
- SEO company Boise Idaho local small agency
- Google Ads agency Hobart Tasmania
- SEO agency Ottawa small business boutique
- home services contractor SEO agency small team HVAC plumbers
- "small agency" SEO content Brighton UK
- digital marketing agency Wellington Hamilton... Cardiff small SEO agency
- content marketing agency Nashville boutique
- ecommerce PPC agency Sydney small team Shopping ads
- SEO agency Belfast independent small team
- "team of 5" SEO agency
- dental marketing agency UK small team SEO dentists
- boutique SEO agency Philadelphia
- B2B content writing agency UK small team tech companies
- SEO agency Galway small Irish agency
- SEO agency Minneapolis boutique small team
- content marketing agency Bristol B2B small
- SEO agency Sunshine Coast Queensland small local
- PPC agency Raleigh NC small Google Ads management
- digital marketing agency Winnipeg SEO small
- "boutique" SEO agency London founder-led senior team
- SEO agency Kansas City small team local
- content marketing agency Canberra small
- SEO agency Lisbon English speaking startups small
- therapist private practice SEO agency small team
- SEO agency Leicester small independent team
- SEO agency San Diego boutique small team
- Amazon PPC agency ecommerce small team UK US boutique
- content marketing agency Montreal English B2B small
- SEO agency Gold Coast small team family owned
- SEO agency Columbus Ohio small boutique team
- SEO agency Norwich Norfolk small independent
- fintech content marketing agency small team writers London
- digital marketing agency Victoria BC small SEO
- SEO agency Salt Lake City small team boutique
- SEO agency Newcastle upon Tyne small independent team
- boutique content marketing agency New York B2B small team

### prof
- boutique employment law firm Bristol
- CPA firm for startups Austin
- boutique strategy consultancy Melbourne
- R&D tax credit accountants Manchester
- boutique IT consulting firm Denver small team
- small immigration law firm Toronto
- boutique accounting firm Sydney small business
- boutique intellectual property law firm Dublin
- small CPA firm Portland Oregon tax and advisory
- boutique litigation law firm Chicago
- independent management consultancy Edinburgh
- chartered accountants for creative businesses Leeds
- boutique family law firm Vancouver
- Salesforce consulting boutique Boston small team
- boutique commercial law firm Brisbane
- CPA firm for dentists Phoenix
- boutique tax law firm London private client
- small accounting firm Seattle startups and tech companies
- boutique operations consulting firm Atlanta
- employment lawyers boutique firm San Francisco plaintiff
- small accountancy practice Cardiff chartered accountants
- data analytics consultancy boutique Amsterdam
- boutique startup law firm New York venture financing
- accountants for contractors Calgary small firm
- boutique employment law firm Manchester solicitors
- small CPA firm Nashville tax planning team
- boutique management consultancy London healthcare strategy
- boutique estate planning law firm Perth
- ERP implementation consultancy small firm Ireland NetSuite partner
- accountants for charities and nonprofits small firm Ottawa
- boutique strategy consulting firm Toronto independent
- cybersecurity consulting boutique firm Washington DC small business
- change management consultancy boutique Bristol UK
- boutique digital transformation consultancy Sydney
- pricing strategy consultancy boutique Europe B2B
- supply chain consulting boutique firm Chicago
- boutique immigration law firm Seattle attorneys
- boutique intellectual property law firm Austin patent attorneys
- boutique construction law firm Melbourne lawyers
- specialist data protection privacy law firm boutique London GDPR
- boutique real estate law firm Miami
- small business law firm Glasgow solicitors commercial boutique
- R&D tax credit specialist accountants Birmingham small firm
- chartered accountants for tech startups Bristol
- CPA firm Denver small business boutique tax
- boutique accounting firm Melbourne tax advisory small team
- CPA firm for real estate investors San Diego
- small accounting firm Halifax Nova Scotia CPA
- boutique management consulting firm Dublin Ireland independent
- boutique IT strategy consultancy Manchester technology advisory
- boutique consulting firm for nonprofits strategic planning Philadelphia
- small Microsoft Dynamics consulting firm Vancouver BC
- boutique economic consulting firm Canberra public policy advisory
- boutique HR and organisational design consultancy London small team
- boutique revenue operations consultancy Austin HubSpot
