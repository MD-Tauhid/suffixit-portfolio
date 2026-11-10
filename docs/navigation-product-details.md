# Navigation and product detail pages

The user supplied the old site navigation HTML on 10 November 2026. It identifies eight core software products, Smart Transformer Monitoring under IoT, and the original service offerings. Payroll System and Rupantor Inventory were missing from the new site's initial product collection; both are restored. The existing HCM, POS and SMS/meeting entries remain available.

## Implementation

- lib/navigation.ts drives both desktop and mobile menus and path/hash-aware active states. Dropdown links have unique product detail destinations; Services includes the original menu offerings.
- /products/[slug] uses lib/products.ts and lib/product-content.ts. Twelve product pages include overview, modules, audience, FAQ, related products and a demo contact CTA. These are data-backed frontend pages, ready for a later CMS adapter; no database or admin UI is implied.
- Existing /product/... URLs from the old navigation redirect to their matching /products/... detail pages. Product cards and the product preview link to details as well.
- Product modules below were paraphrased from the main site's published pages through REA. HCM, Smart POS and SMS/meeting retain the existing project's offering descriptions; their detail copy invites a requirements walkthrough instead of inventing additional capabilities.
- Additional legacy service pages use the names in the supplied navigation and describe a requirements-led scope. Detailed service claims should be replaced or expanded when official copy is supplied.

## Product sources

## Verification

- Production build and targeted ESLint passed.
- All 35 unique navigation destinations returned HTTP 200; nine old product URLs returned the expected HTTP 308 redirect. Unknown product and service routes returned 404.
- Thirteen navigation matching cases covered parent routes, detail routes, root hashes, trailing slashes and nonmatching prefixes.
- REA desktop and mobile scenarios verified product dropdown selection, Payroll and Inventory detail navigation, submenu visibility, active parent/item styles, Escape dismissal, and the Clients hash active state. No page errors were observed.

### Published product references

- https://www.suffixit.com/product/payroll-system — ev_338fc51d2b6541ca0d73c1f821da469f937411a2807335f6606d1513cc8a745b
- https://www.suffixit.com/product/provident-fund — ev_d016a6ea9d6e1fd6b9b15c87f94df1d9906097e5fc5bc0b2801e7e1a14214e15
- https://www.suffixit.com/product/rupantor-inventory — ev_270970c710a9d3820c25377ab52946fd52b80afd4dba949aa7a4de29926a37e7
- https://www.suffixit.com/product/rupantor-erp — ev_1bbb014a756c2e15f24244ca42950f4f9f33bccf77776a84c9431f1d243a8176
- https://www.suffixit.com/product/field-force-management — ev_66d9fca1c71f1f4dc546692293fbf18a8c016659b3e7cfe9bcf2897925d4003a
- https://www.suffixit.com/product/e-commerce — ev_353f17387f975bdc1b6f83e741ca593323da9b5d558ae6a688b1dac429f62064
- https://www.suffixit.com/product/hotel-booking-system — ev_8e877380920bbd42248313d16d899846fcf89e3507ff27d7c278889a96feacf1
- https://www.suffixit.com/product/interconnect-billing — ev_be842eecdf04e9ea145c20c20f8ce9b00c1c1a488a1262488fec7e91ad9d0c06
- https://www.suffixit.com/product/transformer-monitoring — ev_79c6da1a46210026b27668902d1325f33ac477b5c7f57e648c35b042398a0e56
