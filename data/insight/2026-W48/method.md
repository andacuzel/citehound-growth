# Insight lab 2026-W48: method

Date: 28 Nov 2026 (Saturday). Frame built and scanned the same day, from a cloud data-center address.

## How the frame was built
Purposive sample found through web search, not random. Three search passes, one per segment, each by a sub-agent using WebSearch with varied queries (cities and towns, niches, product types, "alternatives to", "X vs Y"). Caps: saas 70 queries, agency 50, prof 50. Every domain had to appear as a URL in a search result; none filled in from memory; no site was opened during frame building. Excluded: directories, marketplaces, review sites, media, listicles, large firms and networks, public companies, AI-readiness vendors, and all 1,189 domains in the five earlier frames (26 Oct to 21 Nov). So this is a sixth independent sample.

Counts: 214 domains (saas 59, agency 77, prof 78). Queries: saas 70 (cap reached), agency 34, prof 55 (5 over its cap; the 14 domains from the last five queries were kept and the overrun is recorded here).

Known weaknesses reported by the passes:
- SaaS: short of 75. About 45% of qualifying vendors found were already in earlier frames, so this pass reaches lower-ranked, newer or less content-active vendors than W44 to W47. 47 vertical or horizontal B2B SaaS, 12 developer tools. Size judged from snippets and the agent's own knowledge, not checked; about 11 are borderline (could exceed 100 people). Leans US and UK.
- Agency: size from snippets only; some may be solo consultants, a few may exceed 30 people. Skews to local-SEO shops in mid-size cities (no London, New York, Sydney or Toronto). Continental EU: one firm. Several mention AI search optimisation as a service.
- Prof: 24 accounting, 27 law, 27 consulting. US 18, UK 18, AU 15, IE 11, CA 10, NZ 5, Malta 1. No UK or Canadian accounting firms. "Boutique" was not used in query wording this time (it was in W47). After the first 20 queries, directory domains were blocked in the search call. Results mostly came from firms' own location pages, so the set favors firms that invest in local SEO.

## Scan
`scripts/insight-scan.js`, concurrency 3, honest user agent, robots.txt read first; homepage, robots.txt, llms.txt and a sitemap probe per site. One scan each. Analysis by `scripts/insight-analyze.js`.

## Queries

### saas
- dental practice scheduling software small company
- construction subcontractor management software startup
- alternatives to Calendly for small teams
- feature flag service open source startup
- veterinary clinic software UK startup
- property management software for independent landlords UK
- "vs" uptime monitoring tool for indie developers
- brewery management software craft brewers
- law firm client intake software Canada
- gym management software Australia small studio
- farm management software for New Zealand dairy farmers
- church management software small congregations
- Postman alternative API client lightweight
- field service software for HVAC contractors Ireland
- charity CRM software UK small charities
- salon booking software UK independent salons
- error tracking Sentry alternative self-hosted
- self storage management software small operators
- tutoring business management software
- winery direct to consumer software wine club management
- funeral home management software
- Mailtrap vs Mailpit email testing for developers
- mortgage broker CRM Australia
- nursery management software UK childcare
- best changelog tool for SaaS product updates
- database schema migration tool for Postgres teams
- internal developer portal Backstage alternative
- event management software for association conferences small team
- quality management software for small manufacturers ISO 9001
- Toronto B2B SaaS startup raises seed round 2026
- recruitment CRM for small recruitment agencies UK
- Terraform drift detection tool startup
- museum collections management software cloud
- Jobber vs Housecall Pro vs alternatives for cleaning businesses
- accounting practice management software for small firms UK
- PDF generation API for developers HTML to PDF
- screenshot API service for developers
- physiotherapy clinic software Australia online booking notes
- restaurant inventory and recipe costing software independent restaurants
- contract management software for small legal teams startup
- software for marinas boat slip management
- pest control business software scheduling routing
- log management tool for small engineering teams cheaper than Datadog
- music school management software lessons billing
- Dublin SaaS startup compliance software funding
- Docusaurus alternative hosted documentation platform for API docs
- employee scheduling rota software UK hospitality small business
- SOC 2 compliance automation for startups Vanta alternative cheaper
- client portal software for accountants and bookkeepers document collection
- volunteer management software nonprofits scheduling
- Heroku alternative PaaS for small teams deploy apps
- cron job monitoring heartbeat service
- webhook delivery infrastructure service for SaaS developers
- headless CMS for developers Contentful alternative open source
- visual regression testing tool for frontend teams
- dog grooming and boarding kennel software
- architecture firm project management and time tracking software
- customer onboarding software for B2B SaaS implementation teams
- fleet maintenance software for small trucking companies
- secrets management for developers Doppler vs Infisical vs
- code review tool for GitHub pull requests stacked diffs startup
- feedback and roadmap tool Canny alternative
- board management software for nonprofits and small boards
- proposal software for agencies PandaDoc alternative
- load testing tool for APIs k6 alternative
- hotel channel manager software for independent B&Bs
- open source observability OpenTelemetry backend startup self-hosted traces
- HOA community association management software small management companies
- inventory management software for Shopify wholesale brands small
- health and safety compliance software for small construction firms UK

### agency
- small SEO agency Leeds
- SEO agency for dentists
- content marketing agency for SaaS boutique
- PPC agency Bristol independent
- digital marketing agency Boise Idaho
- SEO consultancy Harrogate
- SEO agency Galway Ireland
- digital marketing agency Hamilton New Zealand
- SEO company Halifax Nova Scotia
- local SEO agency Geelong
- SEO agency for law firms small team
- Shopify SEO agency UK ecommerce specialists
- digital marketing agency Asheville NC
- SEO agency Norwich Norfolk
- content writing agency B2B tech Dublin
- SEO agency Cardiff independent team
- dental marketing agency Australia SEO Google Ads
- SEO company Kelowna BC
- marketing agency for HVAC contractors SEO
- SEO agency Amsterdam English speaking international SEO
- PPC agency Leeds Google Ads specialists
- SEO agency Chattanooga TN
- digital marketing agency Tauranga
- SEO agency for accountants and financial advisors
- SEO consultant Exeter Devon small business
- digital marketing agency Missoula Montana
- B2B SaaS SEO agency small team link building content
- SEO agency Hobart Tasmania
- SEO agency Cork Ireland
- SEO agency for plastic surgeons med spa marketing
- SEO agency Saskatoon
- content marketing agency Brighton UK
- SEO agency Burlington Vermont
- digital marketing agency Christchurch NZ SEO

### prof
- employment law firm Bristol
- CPA firm for dentists Ohio
- operations consulting firm Calgary
- estate planning attorney Boise Idaho small firm
- chartered accountants Galway small business
- management consultancy Wellington New Zealand strategy
- "our team" CPA firm Asheville North Carolina tax planning small businesses
- family law solicitors Cheltenham
- independent HR consultancy Leeds small team
- accounting firm for nonprofits Minneapolis
- intellectual property law firm Austin Texas startups
- supply chain consulting firm Melbourne Australia
- tax accountant for farmers Shropshire
- immigration lawyer Halifax Nova Scotia law office
- lean manufacturing consultants Ohio small consultancy
- conveyancing solicitors Cork Ireland property
- CPA firm for restaurants Portland Oregon
- pricing strategy consultancy London B2B small firm
- PLLC law firm Chattanooga business litigation attorneys
- accountants Truro Cornwall Xero
- change management consultancy Edinburgh
- tax accountants Hobart Tasmania
- construction law firm Denver Colorado contractors
- healthcare consulting firm physician practices Nashville
- estate planning attorney Boise Idaho
- operations consulting firm Calgary Alberta
- tax accountants Hobart small business advisers
- CPA firm for dentists Ohio dental practice accounting
- employment solicitors for employers Bristol
- management consultants Wellington NZ public sector advisory firm
- chartered accountants Kilkenny small business tax
- intellectual property attorneys Austin Texas patent trademark firm
- HR consultancy Leeds employers outsourced HR support
- family law firm Ottawa divorce lawyers
- accountants for medical professionals Brisbane GP practice tax
- strategy consultancy Manchester SMEs growth consultants
- CPA firm Spokane Washington tax and advisory for closely held businesses
- commercial property solicitors Norwich
- IT strategy consulting firm Toronto mid-market independent advisors
- accountants for contractors and freelancers Amsterdam English-speaking tax advisor
- procurement consultancy Dublin Ireland independent consultants
- bookkeeping and accounting firm Christchurch NZ chartered accountants
- sustainability ESG consultancy Bristol small team advisory
- CPA firm Burlington Vermont small business and individual tax
- employment lawyer Vancouver BC law firm wrongful dismissal
- marketing strategy consultancy for professional services firms Sydney
- accountants Malta corporate tax company formation English
- wills and probate solicitors Exeter Devon
- CPA firm for construction contractors Phoenix Arizona
- organisational development consultancy Cardiff Wales
- accountants Ballarat Victoria business and tax
- solicitors Limerick litigation and commercial law firm
- business law firm Perth WA commercial lawyers SMEs
- nonprofit strategy and fundraising consulting firm Chicago
- revenue operations consulting firm Denver B2B SaaS
