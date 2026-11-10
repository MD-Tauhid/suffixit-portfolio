# About page: design and motion direction

Researched 9 November 2026. Scope: improve the existing Suffix IT About page while preserving the sourced company facts, all requested content sections and the existing brand fonts and blue palette. No deployment is part of this design pass.

## References and observations

- [Instrument About](https://www.instrument.com/about): a direct typographic opening; company identity, people, culture and careers connected into one narrative. Its opening was also inspected in a rendered browser.
- [Clay About](https://clay.global/about): oversized introductory type, substantial team photography, explicit reasons to work together and recognition. Its opening was also inspected in a rendered browser.
- [Work & Co company](https://www.work.co/company/): capability-led company storytelling, specific expertise and clearly contextualised facts.
- [Thoughtworks About](https://www.thoughtworks.com/about-us): technology expertise grounded in organisational purpose and people.

These are current reference observations, not proof of an industry-wide trend. The implementation does not copy their layouts or claim to reproduce unobserved animations.

## Suffix IT interpretation

The page opens with an oversized two-line introduction and a panoramic photo stage. A brand-blue origin panel anchors the composition in the sourced 2017 starting year. White, ice blue and deep navy create distinct chapters without turning every section into a card grid.

Original palette: brand #0072BC, navy #062B43, ice #F1F6FB, pale blue #E1EFF8 and ink inherited from --ink. Plus Jakarta Sans carries the primary hierarchy; Instrument Serif supplies the existing brand's contrasting display voice.

Layout, typography, spacing, surfaces, responsive rules, focus states and hover feedback are implemented with static Tailwind utility strings in `app/about/about.styles.ts`, shared with the client components. The old CSS Module is removed. `about.motion.css` contains only the two measured-height accordion keyframes; scroll choreography uses the existing GSAP dependency.

The original stylesheet omitted `@tailwind base`, which also omitted Tailwind's transform, filter and gradient variable defaults. The base directive is restored; `corePlugins.preflight: false` is retained, so it emits variable initialisation without introducing the Tailwind browser reset. One-sided borders explicitly start at `border-0` because this project intentionally does not use Preflight.

The unused legacy `.grid` rule was renamed to `.legacy-card-grid` so it no longer overrides Tailwind's grid columns and gaps. No component depended on the legacy bare-grid layout.

People imagery, an offset culture mosaic and generous text rhythm make this an About page rather than a product dashboard. Standards remain certifications published by the company, not invented awards. Individual staff names and employment claims are still absent until original team data is supplied.

## Motion and interaction

- Hero: short masked line entrance, followed by the supporting copy. Desktop photo stage opens its crop with scroll and has restrained image parallax.
- Story: desktop word-opacity progression follows reading position; mobile and reduced-motion visitors see fully legible static copy.
- Section navigation: the secondary sticky chapter bar was removed at the user's request. The existing site header and contextual in-page links provide navigation; there is no extra sticky toolbar or scroll capture.
- Culture: image crop reveal and subtle desktop image parallax; text has a separate short entrance.
- Values: existing Radix Accordion supplies keyboard semantics, focus handling and one open panel. Selecting a value crossfades its image and caption. Height animation is limited to the accordion's content.
- Capabilities and standards: one-time staggered entrances, with no repeating ambient animation over readable text.
- People: one-time group entrance; fine-pointer hover reveals colour and a small image scale change. All text remains visible on touch.
- Careers: slight scroll-driven rotation of the decorative seal; directional arrow feedback on actionable links.
- All motion lives within GSAP matchMedia/context or CSS reduced-motion queries. Cleanup restores styles and removes observers/listeners on unmount.

## Temporary portraits

Local Unsplash placeholder files, not photographs of Suffix IT employees:

- engineering: https://images.unsplash.com/photo-1500648767791-00dcc994a43e
- web: https://images.unsplash.com/photo-1580489944761-15a19d654956
- mobile: https://images.unsplash.com/photo-1506794778202-cad84cf45f1d
- cloud: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e
- IoT: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2
- support: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d

All are downloaded assets, not runtime image-host dependencies. Replace them with authorised company images when supplied.
