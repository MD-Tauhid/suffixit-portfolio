# Service page design direction

Reviewed 10 November 2026 through REA controlled Chrome scenarios. The service navigation exposes twelve pages. Layout and interaction patterns are references; Musemind copy, projects, imagery, clients and business claims are not reused.

## Implementation direction

Suffix IT has nine service entries but no dedicated service routes. Add an index and nine static detail pages. Use service-specific copy and original HTML/SVG product illustrations: oversized split heroes, editorial sections, interactive capability panels, four process stages, FAQs, related services and a contact CTA. Preserve native scrolling, keyboard operation and reduced-motion support.

Surface colours come from Home How we work: #e8f3fc, #ede8fa, #def2eb, #def0fb. Brand accent #0072bc, existing text colour and white complete the palette. No new accents or reference assets.

## REA observations

The /services index was also checked and exposes the same twelve detail routes. Service interactions were exercised with controlled scrolling; the implementation uses browser-driven once-only entrances, desktop hero parallax, native sticky process panels and accessible accordions rather than importing external animation code.

## Local implementation

- /about: company story, people and culture with editorial typography and the user-supplied Corporate Day photo.
- /services: service discovery; /services/[slug]: nine static detail pages backed by lib/services.ts.
- /products: a distinct centered product showcase, interactive preview, category filters and search backed by lib/products.ts.
- lib/service-palette.ts is shared with the Home Process section. New illustrations are original HTML/SVG concepts, not screenshots of delivered products.
- Service and product descriptions are editorial adaptations of the existing offering; no external case studies, invented project results, numerical promises, prices or delivery guarantees are added. Demonstration requests use the existing contact page.

- https://musemind.agency/services/brand-design — ev_9b8d0440fa9f903b3b148eaedae68a82611cbe1ae3952ef958c1ff917c9b291e
  - heading "Brand Design & Consulting Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Design Speaks Louder Than Words" [level=2]
  - heading "Let’s Walk You Through Our Brand Design Process" [level=2]
  - heading "Brand Design Services" [level=2]

- https://musemind.agency/services/brand-identity-design — ev_c516997a0ea2c9af73238309e50fdfe891bee3578d72a7c71bf1d57f5b4f6bfb
  - heading "Brand Identity Design Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Consistency Drives Revenue" [level=2]
  - heading "Brand Identity Design Services" [level=2]
  - 'heading "Stand Out in Every Industry: Bespoke Brand Identity Design That Speaks Your Language" [level=2]'

- https://musemind.agency/services/motion-graphics-design — ev_e7a9be27ad89a04ad543a5733ac1f703a5040c2d3cd839e3dce21e3b354f4574
  - heading "Motion Graphics Design Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Motion Graphic Moves Sales" [level=2]
  - heading "Our Tested Motion Graphics Design Process" [level=2]
  - heading "Motion Graphics Design Services" [level=2]

- https://musemind.agency/services/ui-ux-design — ev_50356c1cfb8391bb14eb85bc20254354f1c78f323df4af6ffc004eab17c3342d
  - heading "UI & UX Design Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Our Comprehensive UI UX Design Process" [level=2]
  - heading "Our On-Demand UI/UX Services" [level=2]
  - heading "UI UX Consulting" [level=2]

- https://musemind.agency/services/ui-ux-consultancy — ev_d647aaf11e1682b56840ff7a710628b0d2ec5f322bef967397f6a587c2d4523c
  - heading "UI UX Consulting Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Our UX Consultancy Services" [level=2]
  - heading "Why do your company need UX consultancy service?" [level=2]
  - heading "Why should you choose Musemind as your UX partner?" [level=2]

- https://musemind.agency/services/saas-design — ev_d60b525d680f74d68c5ac4dcd798db55e567cc86b6586a836a9144b089d3bcb7
  - heading "SaaS UI UX Design Agency" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Don’t be part of the crowd that fails—craft your SaaS success story with us!" [level=2]
  - heading "Build a loyal user base with flawless, conversion focused SaaS experiences!" [level=2]
  - heading "How Do We Pave Your Success Path in The SaaS Business?" [level=2]

- https://musemind.agency/services/mobile-app-design — ev_e964b22dd8c12ba1eabc9c039a83774f50fc7db0ede236bb6794fc46a4a8e95a
  - heading "Mobile App UI UX Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Users can't stop using your mobile app - we promise that!" [level=2]
  - heading "Offer native user experiences instead of one-size-fits-all!" [level=2]
  - heading "Mobile app solutions we offer!" [level=2]

- https://musemind.agency/services/web-design-development — ev_e66e479b6387606f663a6c3f04973339250b9d4b78b60c2ecf40f3651067394c
  - heading "Website Design and Development Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Ready to reach more and make a bigger impact? Go responsive now!" [level=2]
  - heading "Achieve success with our all-in-one web design and development services" [level=2]
  - heading "Website Strategy" [level=2]

- https://musemind.agency/services/webflow-design-development — ev_13645e21f19aef205fe20c964f54c968a8e3b155f3d49cd2ab02f0f9e72ca85f
  - heading "Webflow Design and Development Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Professional Webflow website within a week" [level=2]
  - heading "Glimpse of Our Client-Favorite Works!" [level=2]
  - heading "Recharge IV" [level=2]

- https://musemind.agency/services/mvp-development — ev_c499d0f714166dc4bf76ff038426c9fa92304e9f76ff67c31484a1ed6e8a46ea
  - heading "MVP Development Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Speed up MVP launches with our proven strategy!" [level=2]
  - heading "Don't just build an MVP, build an investment magnet!" [level=2]
  - heading "Range of our MVP development solutions" [level=2]

- https://musemind.agency/services/mvp-web-development — ev_944ebf1ff0e59fe7c46285c33256ac1a1308b7b742f2af5528be7d7df25b1456
  - heading "MVP Web Design and Development Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "Bespoke MVP Web Development Services" [level=2]
  - heading "Market Research" [level=2]
  - heading "Reasons To Go For MVP Web Development Services" [level=2]

- https://musemind.agency/services/corporate-identity-design — ev_ba676f8beccbe564e645a7912dc16951a81e6ecfb7cac5772ece7cd17ef9a333
  - heading "Corporate Identity Design Services" [level=1]
  - heading "Trusted By 350+ Global Brands" [level=2]
  - heading "First Impressions Matter - Make Yours Count!" [level=2]
  - heading "Corporate Identity Design Services" [level=2]
  - heading "Style Guide" [level=2]
