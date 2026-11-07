# Insight lab 2026-W45: method

Date: 7 Nov 2026 (Saturday). Frame built and scanned the same day, from a cloud data-center address.

## How the frame was built
Purposive sample found through web search, not random. Three search passes, one per segment, each by a sub-agent using WebSearch with varied queries (verticals, mid-size cities, niches, "alternatives to", "best X for Y"). Every domain had to appear as a URL in a search result; none filled in from memory. Excluded: directories, marketplaces, media, listicles, large firms and networks, public companies, AI-readiness vendors, and all 488 domains in the two W44 frames (26 Oct and 31 Oct). So this is a third independent sample. Size and location were judged from search snippets, not checked on the sites.

Counts: 240 domains (saas 80, agency 80, prof 80). Queries: saas 64, agency 42, prof 42.

Known weaknesses reported by the passes:
- SaaS: skews to vertical SMB software (clinics, trades, churches, HOA) from vendors that publish heavy blog and comparison content; only about 20 developer tools. A few may be over 100 or under 5 people. Seed/Show HN queries mostly returned news pages. Mostly US/UK/AU; thin EU and Canada. The search tool is US-centric.
- Agency: size guessed from snippets (a few may exceed 30, a couple are solo). Niche queries favor aggressive self-promoters. UK, AU and US dominate; almost no continental EU. A few may be web-design studios that also sell SEO.
- Prof: 27 consulting, 27 accounting, 26 legal. Clustered by city; leans US/UK; EU only four Amsterdam tax firms. Consulting leans on HR outsourcing.
- Two passes shared a scratch file during the run; the final domain and query lists were rebuilt and checked by each pass.

## Scan
`scripts/insight-scan.js`, concurrency 3, honest user agent, robots.txt read first; homepage, robots.txt, llms.txt and a sitemap probe per site. One scan each. Analysis by `scripts/insight-analyze.js`.

## Queries

### saas
- Show HN open source feature flag alternative small team
- invoicing software for UK freelance accountants startup
- seed round B2B SaaS startup raises $3 million construction scheduling
- alternatives to Postman API testing tool lightweight
- dental practice patient recall software Australia SaaS
- Show HN I built a self-hosted uptime and cron monitoring tool
- veterinary clinic software startup Canada cloud practice management
- Dublin startup SaaS compliance automation for fintech raises seed
- database schema migration tool for Postgres teams startup
- field service scheduling software for HVAC small business new company
- tenant screening API for property managers small vendor
- Melbourne startup workforce rostering software for aged care
- OpenTelemetry tracing for serverless functions startup product
- board meeting management software for nonprofits affordable
- Y Combinator startup PDF data extraction API for logistics documents
- brewery production management software craft breweries cloud
- SOC 2 evidence collection tool for early-stage startups cheaper than Vanta
- Manchester software company e-signature and contract workflow for recruitment agencies
- CLI tool to sync environment secrets across developers bootstrapped
- school timetabling software UK independent schools cloud
- Toronto startup B2B procurement software for restaurants groups
- visual regression testing service for Storybook components
- law firm client intake automation software for small practices new
- Berlin startup English website API for carbon accounting SMEs
- "Show HN" self-hostable analytics for product teams 2026
- farm management software for New Zealand dairy farmers subscription
- webhook debugging and replay tool for developers indie
- commission tracking software for insurance agencies small team SaaS
- Amsterdam startup customer onboarding portal for B2B SaaS companies
- churches online giving and member management software small company
- self-hosted Git-based CMS for Next.js headless
- Vancouver SaaS startup inventory management for Shopify wholesalers
- freight forwarder quoting software for small forwarders UK cloud
- API rate limiting as a service for developers startup
- event ticketing platform for festivals Ireland startup software
- Rust-based log shipping agent open core company
- physiotherapy clinic booking and notes software UK small vendor
- Austin startup SaaS for HOA management companies
- GitHub app that reviews Terraform pull requests for cost changes
- pre-seed startup raises for AI bookkeeping for accountancy practices UK 2026
- museum collections management software cloud small museums
- alternative to Calendly for clinics with HIPAA small company
- Sydney startup SaaS for tradies quoting and invoicing app
- translation management system for software localization developer-friendly startup
- grant management software for community foundations small vendor Canada
- mobile app crash reporting alternative to Crashlytics independent
- Edinburgh software startup for property factors and landlords Scotland
- quality management system software for medical device startups ISO 13485 eQMS
- open source workflow engine durable execution TypeScript company alternative to Temporal
- golf club tee time booking and membership software UK
- sales tax compliance API for ecommerce startups Series A small team
- Chicago startup software for independent pharmacies workflow
- photography studio CRM and client gallery software small business
- Kubernetes cost visibility tool for small platform teams open source startup
- waste management hauler routing and billing software SaaS
- Bristol startup developer tool raises seed funding 2025
- Moropo mobile app testing
- contractor prequalification and compliance software for facilities managers
- email deliverability testing tool for developers transactional email preview
- wine export compliance and label approval software Australia winemakers
- best employee recognition platform for remote teams under 100 people
- Show HN database GUI client for SQLite and Postgres native app
- childcare centre management software New Zealand early learning
- tool hire rental software for equipment rental companies UK cloud

### agency
- SEO agency Spokane small team
- digital marketing agency Shrewsbury independent
- PPC agency Galway
- dental marketing agency small boutique SEO for dentists
- SEO company Kelowna BC
- digital marketing agency Toowoomba
- law firm marketing agency boutique SEO for attorneys small team
- SaaS content marketing agency small team B2B
- nonprofit digital marketing agency Google Ad Grants small agency
- marketing agency for plumbers HVAC contractors SEO small
- hotel restaurant digital marketing agency independent hospitality SEO
- Shopify ecommerce SEO agency UK small
- SEO agency Lancaster Pennsylvania
- digital marketing agency Boise Idaho small business
- SEO consultant agency Cork Ireland
- PPC management agency Norwich Norfolk
- SEO agency Hamilton New Zealand
- digital marketing agency Halifax Nova Scotia
- SEO agency Chattanooga Tennessee locally owned
- Google Ads agency Exeter Devon
- SEO agency Ballarat Bendigo
- content writing agency for small businesses SEO copywriting studio UK
- digital marketing agency Fort Collins Colorado
- SEO agency Inverness Aberdeen Scotland small
- SEO agency Asheville North Carolina
- marketing agency for accountants CPA firms SEO
- PPC agency Leicester Nottingham independent
- SEO company Sunshine Coast Queensland
- digital marketing agency Limerick Kilkenny
- SEO agency London Ontario small
- SEO agency Grand Rapids Michigan boutique
- digital marketing agency Swansea Cardiff small
- roofing contractor marketing agency SEO PPC
- SEO agency Wollongong Newcastle NSW
- English-speaking SEO agency Amsterdam Netherlands small team
- PPC agency for ecommerce brands Google Shopping specialist small
- SEO agency Sioux Falls South Dakota
- marketing agency for physiotherapists chiropractors clinics small
- digital marketing agency Saskatoon Regina
- SEO agency York Harrogate North Yorkshire
- B2B tech PPC LinkedIn ads agency boutique
- SEO agency Hobart Tasmania

### prof
- boutique management consulting firm Columbus Ohio small team
- R&D tax credit CPA firm Denver small firm
- immigration law firm boutique Austin Texas attorneys
- nonprofit audit CPA firm Portland Oregon
- employment law solicitors Leeds boutique firm
- fractional CFO firm Raleigh North Carolina
- small CPA firm Boise Idaho tax and accounting for small businesses
- intellectual property boutique law firm Minneapolis patent attorneys
- HR consulting firm Manchester UK small business outsourced HR
- chartered accountants Cork Ireland small practice
- family law firm Halifax Nova Scotia lawyers
- operations consulting firm manufacturing lean consultants Milwaukee
- CPA firm Spokane Washington "our team" tax planning small business
- boutique employment law firm Ottawa employees wrongful dismissal lawyers
- IT consulting firm managed services Halifax small business boutique
- bookkeeping firm Brisbane small business Xero bookkeepers team
- immigration solicitors Birmingham UK boutique visa law firm
- nonprofit accounting firm Minneapolis audit 990 CPAs
- HR consultancy Bristol small business HR consultant team
- patent and trademark law firm Boulder Colorado small IP firm
- management consultancy Dublin strategy consultants independent firm SMEs
- chartered accountants Galway tax advisors small firm
- family lawyers Wellington New Zealand family law specialists firm
- IT strategy consulting firm Sacramento technology advisory small team
- employment law boutique Perth Western Australia workplace lawyers
- accountants Edinburgh small firm chartered accountants tax returns owner-managed businesses
- operations management consulting firm process improvement Pittsburgh boutique
- estate planning and probate law firm Asheville North Carolina attorneys
- CPA firm Grand Rapids Michigan tax accounting team family owned
- business immigration law firm Vancouver BC boutique work permits
- HR consulting firm Calgary small business human resources consultants
- management consultants Auckland strategy and operations consultancy small firm
- R&D tax credits specialist accountants Cambridge UK small firm claims
- trademark and copyright boutique law firm Toronto IP lawyers
- Salesforce consulting partner boutique firm Atlanta small team implementation
- fractional CFO services Nashville outsourced CFO firm startups
- boutique accounting firm Adelaide small business accountants tax advisers
- English-speaking tax advisor Amsterdam expats accounting firm small
- employment law firm Kansas City employee rights attorneys small firm
- organizational development consulting firm leadership change management Cincinnati small firm
- nonprofit audit and tax CPA firm Albuquerque New Mexico
- commercial litigation boutique law firm Melbourne disputes lawyers small firm
