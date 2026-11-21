# Insight lab 2026-W47: method

Date: 21 Nov 2026 (Saturday). Frame built and scanned the same day, from a cloud data-center address.

## How the frame was built
Purposive sample found through web search, not random. Three search passes, one per segment, each by a sub-agent using WebSearch with varied queries (cities and towns, niches, product types, "alternatives to", "X vs Y"). Each pass had its own cap of 70 queries (the W46 note asked for per-pass caps). Every domain had to appear as a URL in a search result; none filled in from memory; no site was opened during frame building. Excluded: directories, marketplaces, review sites, media, listicles, large firms and networks, public companies, AI-readiness vendors, and all 962 domains in the four earlier frames (26 Oct, 31 Oct, 7 Nov, 14 Nov). So this is a fifth independent sample.

Counts: 227 domains (saas 66, agency 80, prof 81). Queries: saas 70 (cap reached), agency 25, prof 34.

Known weaknesses reported by the passes:
- SaaS: short of 80 because results were dominated by G2, Capterra, GetApp and app stores. 44 vertical B2B SaaS (clinics, field and home services, hospitality, education, nonprofits, HR for charities and care, farming), 22 developer tools (under the 30 cap, unlike W46). Size and location judged from the agent's own knowledge, not checked; a few may exceed 100 people, a few may be tiny. Thin on Canada, NZ, Ireland and continental-EU vertical vendors; legal, logistics and real estate nearly absent. Most surfaced through comparison and "alternatives" pages, so the set favors content-active vendors.
- Agency: size from snippets only. Leans to local-SEO shops in small and mid-size cities; continental EU barely covered apart from Ireland, Malta, Cyprus and the Netherlands. Several snippets mention "AI search optimisation" as a service. Keyword-heavy local queries favor SEO-active agencies.
- Prof: 27 accounting, 27 law, 27 consulting. US 22, AU 16, UK 10, IE 10, EU (NL, ES, DE) 10, CA 7, NZ 6. Clustered (about one query per city and niche, several firms taken from each). Most queries used "boutique", which favors firms that brand themselves that way and have well-optimized sites.

## Scan
`scripts/insight-scan.js`, concurrency 3, honest user agent, robots.txt read first; homepage, robots.txt, llms.txt and a sitemap probe per site. One scan each. Analysis by `scripts/insight-analyze.js`; pooled cross-sample figures by a one-off script over the five scans.jsonl files (not committed; method described in candidates.md).

## Queries

### saas
- practice management software for veterinary clinics small company
- construction punch list software for subcontractors startup
- farm management software for small farms UK
- volunteer management software for nonprofits alternative to VolunteerHub
- "alternative to Jobber" field service software for small plumbing businesses
- dental practice software startup Toronto cloud
- legal case management software for immigration lawyers small vendor
- brewery management software small breweries inventory production
- keg tracking software craft brewery app
- church management software small churches online giving app
- scaffolding hire management software UK
- physiotherapy clinic booking and notes software Australia
- open source alternative to Postman API client
- Sentry alternative error tracking for small teams
- self-hosted feature flag service open source
- email verification API for developers pricing
- Cliniko alternative for allied health practitioners UK
- Buildertrend alternative for small remodelers cheaper
- property inspection app for letting agents UK inventory reports
- childcare centre management software Australia parent app
- Inventory Hive vs No Letting Go comparison property inventory software
- OWNA alternative childcare software Xplor competitor
- Projul vs JobTread vs Contractor Foreman roofing CRM
- winery management software small wineries compliance US
- "built for" tree care companies software estimates scheduling free trial
- pest control business software book a demo routing
- software for pool service companies route management
- septic pumping company software dispatching invoicing
- PumpDocket vs ServiceCore vs Tank Track septic
- Skimmer vs Pool Brain vs PoolDial pool service
- Cliniko vs Nookal vs Halaxy vs Coreplus practice software comparison
- Rosterfy vs Better Impact vs Volunteer Matters vs Bloomerang volunteer
- PDF generation API alternatives DocRaptor comparison
- cron job monitoring service heartbeat alternatives Healthchecks.io
- geocoding API cheaper alternative to Google Maps for startups
- authentication service for SaaS alternative to Auth0 small company
- Tank Track vs Pumpdocket portable toilet rental software
- law firm intake software alternative to Lawmatics small firms
- accounting practice management software alternative to Karbon for small firms
- hotel channel manager small independent hotels B&B UK software
- Financial Cents vs Jetpack Workflow vs Canopy bookkeeping firm workflow
- ThinkReservations alternative inn PMS ResNexus WebRezPro comparison
- grant management software for small foundations alternative to Fluxx
- school MIS software for independent schools UK cloud admissions
- Flexigrant vs SmartSimple vs Blackbaud small charity grant application portal UK
- manufacturing ERP for small job shops alternative to JobBOSS
- freight forwarder software small forwarders cloud quoting TMS
- dance studio management software alternative to Jackrabbit
- Studio Director vs Akada vs DanceStudio-Pro small dance studio billing
- MRPeasy vs Katana vs Craftybase small manufacturer inventory
- screenshot API alternatives for developers comparison
- transactional email API alternatives to SendGrid for indie developers
- log management for small teams alternative to Papertrail cheaper
- webhook relay inbound webhooks service for developers alternatives
- equipment rental software for small rental companies alternative to Point of Rental
- funeral home software case management small funeral homes
- Booqable vs Goodshuffle vs TapGoods vs Rentman party rental
- FuneralHQ vs Gather vs Passare funeral software comparison
- database GUI client alternatives TablePlus DBeaver for Postgres
- status page tool alternatives to Statuspage.io for startups
- Gather funeral software vs Parting Pro vs Halcyon
- trucking dispatch software for small fleets owner operators alternative to Truckbase
- HR software for small UK charities and care homes alternative to BrightHR
- tutoring business management software alternative to TutorBird Teachworks
- TutorCruncher vs Teachworks vs Oases Online music school scheduling
- CQC compliance software for care homes UK small providers
- InstaStatus vs StatusPal vs Sorry status page vs isdown comparison
- AgriWebb alternative livestock software New Zealand sheep beef
- Log my Care vs Birdie vs CareLineLive home care software small agency
- real estate transaction management software for small brokerages alternative to Dotloop

### agency
- small SEO agency Boise Idaho
- dental marketing agency small team SEO for dentists
- independent PPC agency Leeds Google Ads management
- digital marketing agency Halifax Nova Scotia SEO
- law firm SEO agency boutique attorney marketing
- SEO agency Asheville North Carolina small team
- content marketing agency for SaaS small team B2B writers
- digital marketing agency Galway Ireland SEO
- nonprofit digital marketing agency Google Ad Grants management small
- SEO for plumbers HVAC contractors marketing agency
- SEO consultant agency Norwich Norfolk
- Google Ads agency Hobart Tasmania
- digital marketing agency Saskatoon SEO small business
- SEO agency Dunedin New Zealand
- PPC agency Chattanooga Tennessee
- English-speaking SEO agency Amsterdam small international
- SEO agency Toowoomba Queensland
- veterinary clinic marketing agency SEO for vets
- digital marketing agency Exeter Devon SEO PPC
- SEO agency Missoula Montana
- boutique SEO agency for accountants and CPA firms
- digital marketing agency Fort Wayne Indiana SEO
- Shopify ecommerce PPC agency small UK Google Shopping specialists
- SEO agency Kelowna BC
- SEO agency Malta Cyprus English small digital marketing

### prof
- "boutique accounting firm" CPA Boise Idaho
- "boutique law firm" employment law Denver
- "boutique consulting firm" healthcare operations Nashville
- chartered accountants Harrogate small practice
- "we are a boutique" CPA firm tax planning small business
- "boutique law firm" estate planning Portland Maine
- "boutique management consultancy" UK strategy operations "our team"
- accountants Cork Ireland small firm chartered "contact us"
- "boutique law firm" intellectual property trademark Toronto
- "boutique" solicitors commercial property Bristol "about us"
- boutique supply chain consulting firm Chicago founders "our approach"
- boutique family law firm Melbourne lawyers "our team"
- boutique HR consulting firm Calgary "our consultants"
- independent management consultants Dublin small consultancy strategy public sector
- boutique economic consulting firm litigation expert witness antitrust "about us"
- boutique strategy consultancy Sydney "small team" senior consultants
- boutique nonprofit consulting firm fundraising strategy capital campaign "our team" Minneapolis
- boutique management consultancy Amsterdam English "we are a small" consultancy
- Wellington NZ boutique public policy consultancy advisory firm
- boutique IT strategy consulting firm Boston "independent" CIO advisory small firm
- small accountancy practice Brighton Hove "chartered certified accountants" family run
- CPA firm Halifax Nova Scotia small professional corporation accounting tax
- boutique accounting firm Brisbane business advisory "our team" chartered accountants
- "boutique" law firm Dublin solicitors employment commercial "our people"
- "boutique" immigration law firm Seattle attorneys business immigration
- "boutique" construction law firm Phoenix Arizona attorneys contractors
- Auckland boutique law firm commercial property lawyers "our lawyers"
- "boutique" employment law solicitors Manchester "for employers"
- boutique sustainability ESG consultancy London "small team" advisory firm
- boutique management consulting firm Vancouver BC "our consultants" strategy
- boutique pricing strategy consultancy Germany English B2B "pricing consultants"
- English-speaking accountancy firm Netherlands small office expats entrepreneurs tax advisors "our team"
- English-speaking boutique law firm Spain lawyers Marbella Barcelona international clients
- small CPA firm Asheville North Carolina accounting tax "meet our team"
