# ICS 2026 — interactive homepage concept

A local Next.js mockup for a refreshed [ICS Ice Cleaning Systems website](https://www.ics-dryice.com/en/). The direction is an editorial product story: a viewport-height film hero, restrained overlay navigation, open interactive product displays, a typographic industry index with cursor-following photographs and green accents derived from the ICS identity. There are no content card grids, nested boxes, decorative chapter labels or section numbers. The header stays fixed and accessible throughout scrolling, without a dividing rule. It sits transparently over the opening footage and becomes a compact dark bar after 32px of scrolling; section links leave room below it on desktop and mobile. GSAP ScrollTrigger drives a reversible, scroll-controlled cleaning explanation, restrained product/section entrances and the map reveal.

## Run locally

Install dependencies with `npm install` if needed, then start the development server:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production build and local preview:

```bash
npm run build
npm start
```

`npm run lint` runs ESLint.

## Included in the mockup

- Responsive homepage with a pinned, scroll-controlled three-stage dry ice explanation, a linked product catalogue, industry selection, a compact service accordion, video and a geographic country selector. Service and country choices carry into the enquiry draft.
- Full-height product and worldwide scenes, alongside the existing hero and educational walkthrough. Applications use a compact, open index of all 12 industries from the ICS menu. Fine-pointer desktop hover reveals a photograph and concise application description beside the cursor. Desktop activation keeps the small photograph beneath the selected name, with its context and application examples arranged in the neighboring columns. The composition follows the selected column, without a second title, border or oversized article. On narrow or touch devices, selection opens a scrollable bottom sheet with extended application content and a cleaning-process explanation, a fixed header and one source link. The engineering story sits within the page gutters at its natural content height. Sections grow when translated text or a short mobile viewport needs more room.
- Two shared action styles: a solid green primary and a text/arrow secondary. Icon-only controls use the secondary treatment. Product hover previews four categories on desktop; clicking opens the local category. On mobile and touch devices, category buttons only select the homepage preview, and Explore the range opens the selected category. Duplicate adjacent calls to action are removed.
- An engineering story covers in-house development, manufacture and application testing, with an authentic ICS workshop photograph. It follows the original [Development](https://www.ics-dryice.com/en/development), [Production](https://www.ics-dryice.com/en/production) and [Profile](https://www.ics-dryice.com/en/profile) pages.
- English, Slovak, German, and Japanese copy, switched in the browser. The language selection is a client-only concept; it does not create localized URLs or persist after a reload.
- Links to the original ICS website for the full catalogue, applications, services, and partner directory. Those destinations retain the original site's language and design.
- An enquiry form that prepares a reviewable email draft. The separate email button opens a `mailto:` link; nothing is sent automatically, and there is no submission backend.

This is a homepage design prototype, not a completed international website. Translations are concept copy and should be reviewed before publication.

## Content and visual references

The logo, machine images, industry photos, partner logos, and video originate from the [ICS website](https://www.ics-dryice.com/en/). Local image and video assets are stored in `public/ics`. The background film can be paused, pauses outside the viewport and starts paused when reduced motion is preferred. Product categories and company information follow the [original catalogue](https://www.ics-dryice.com/en/products) and [company profile](https://www.ics-dryice.com/en/profile). No invented performance statistics, customer counts, or market coverage figures are included.

The industry index includes manufacturing, automotive, car detailing, food and beverage, print and paper, healthcare, restoration and cleaning, plastics, rubber, textiles, marine and energy. Each photo comes from its linked ICS detail page, rather than the homepage thumbnails. Exact source page and image URLs are recorded in `public/ics/industries/sources.json`; optimized local WebP images sit alongside that manifest. Hover summaries and extended article copy paraphrase the application examples on those pages in English, Slovak, German and Japanese. Healthcare copy describes technical cleaning applications without claiming sterilization.

[Cowboy on Awwwards](https://www.awwwards.com/inspiration/cowboy-electric-bike-for-urban-riders-3) is the concrete compositional reference: full-viewport imagery, navigation over the scene, compact central headline and corner captions. The product presentation also draws on the gallery approach described in [BASIC/DEPT’s Cowboy case study](https://www.basicagency.com/case-studies/cowboy). These are visual references, not an approved design template or an ICS affiliation.

The refined navigation draws on [Electronic Materials Office on Awwwards](https://www.awwwards.com/sites/electronic-materials-office): sparse links, generous logo-to-navigation spacing and compact controls. It pairs three section links with a language picker and one contact action. The mobile disclosure supports Escape, outside-click dismissal and focus return.

## World map and information sources

The map uses local [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/) public-domain geographic boundaries. Country labels and ordering are precomputed for deterministic server/client rendering in all four languages.

The [original ICS worldwide page](https://www.ics-dryice.com/ics-vo-svete) publishes 47 countries, 21 distributors and 4 continents in its counter script. Its globe does not contain country-specific distributor data. This concept therefore marks only the verified Slovak headquarters; selecting another country creates an enquiry destination, not a claim of an office or distributor there. A verified partner list is needed before publishing exact coverage markers. Small regions missing from the simplified geographic dataset can use the other-country option.

The educational interaction follows the [ICS cleaning principle](https://www.ics-dryice.com/en/technology/principe-of-dry-ice-cleaning): impact, rapid cooling and sublimation. Removed contamination remains for collection. The Services section follows the original [services index](https://www.ics-dryice.com/en/services): training, warranty/post-warranty service and free demonstrations.

## Motion

Typography uses a locally hosted variable Space Grotesk font by Florian Karsten, with Slovak/German character coverage and native Japanese fallbacks. The original font source and SIL Open Font License are bundled in `app/fonts`.

[GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) links the cleaning diagram and progress line directly to native scroll, with manual stage selection and a skip link. The scene covers impact, thermal shock and sublimation in order and reverses when scrolling back. Native CSS sticky holds the scene below the fixed header; GSAP only updates the diagram, avoiding JavaScript pin spacers during fast scrolling. Its extra scroll distance is 1.1 viewport heights on desktop and 0.75 on mobile; mobile scenes are capped at 680px. Text layers crossfade without changing height, and the prominent Next button moves users to the next stage. Native browser scrolling is currently enabled for comparison: wheel smoothing and programmatic smooth scrolling are off. The Lenis setup remains available behind `SMOOTH_SCROLL_ENABLED` in `app/smooth-scroll.ts`. At reduced motion or below 700px viewport height, the scene is unpinned and all three explanations appear as normal text. Manual selections have a screen-reader status; automatic scroll changes stay silent.

Products change only on pointer hover or keyboard focus; there is no timer or automatic rotation. Click/tap opens the category. Product previews use short opacity/translation entrances. Other text entrances play once, and the map settles before emphasizing the Slovak headquarters and existing network statistics. Each component scopes and cleans up its own GSAP timelines. The industry hover adapts the supplied `portfoliomato` photo-reveal principle to a single cursor-following photograph and caption. GSAP quickTo gives position changes a 340ms ease-out, keeping the active name readable and the preview inside the viewport. Images crossfade in 200ms, without intercepting pointer input. Moving glyphs also ignore pointer input, so the full industry button retains a stable hit area and pointer cursor. Scroll, resize, window blur and keyboard input dismiss the floating preview. Desktop details enter with a short 240ms opacity/translation stagger; keyboard and reduced-motion selections appear immediately.

The mobile industry sheet uses a native modal dialog for focus containment and locks background scrolling. The title, drag handle and close button remain outside the scrollable article. X, Escape and the backdrop close it; the header can be dragged down from any scroll position, and downward touch gestures in the article dismiss only when its scroll is at the top. Short or cancelled pulls return to the open position. Closing restores focus to the selected industry. Keyboard and reduced-motion actions skip entrance/exit motion.

Products and applications follow normal document flow, with no pin, reading pause or overlapping section transition. Selected navigation/CTA labels reuse the masked roll from the supplied `portfoliomato` menu reference: 440ms entry plus up to 100ms stagger, with a 360ms return. Industry names and their detail links use the same per-character roll as the product controls above. Whole-word wrappers keep word endings together when labels wrap. The effect is disabled for keyboard focus, touch input and reduced motion.


## Local product catalogue

The commercial focus is ICS machines, production equipment, automation and accessories. Loose dry ice is not offered as a product or service; mentions of pellets explain machine operation and specifications only.

`/products` provides an open editorial index, with category routes for cleaning, production, automation and accessories. There are 99 distinct product records: 10 cleaning-machine families, an IP 100-H pelletizer, an APS packaging system and 87 accessories. APS appears only in automation. The accessory list supports type filters, full-text search and part-number search.

Each product has a local detail route, original photographs, published technical information and a product-specific email enquiry link. Machine descriptions are concise editorial summaries of ICS source material. The catalogue includes 416 locally optimized images, 9 original YouTube embed references, 17 original PDF links and 279 locally stored 360-degree frames. Videos load after activation; photo enlargement supports Escape and returns focus. 360-degree views support drag and a keyboard-accessible range input. Original page and image sources are recorded in `public/ics/catalog/sources.json`; product URLs live in `app/catalog-data.json`.

The catalogue is currently in English, following the requested English original. Homepage localization remains available. Product families and PLUS variants follow the source grouping; they are not invented separate SKUs. The legacy compressed-air hose 889 is referenced by IC 030, but its source detail is unavailable, so its local page retains the known name/photo and asks ICS for specifications. Three final frames in the original IC 310 sequences return 404 and are excluded from rotation. Product videos/PDFs still depend on their external hosts. No prices, stock levels or checkout have been added.

Run `node scripts/check-catalog.mjs` to verify local images, rotation frames, unique routes and accessory relationships. Source extraction is in `scripts/import-ics-catalog.py` (requires the cached source HTML in `/tmp/ics-catalog`, BeautifulSoup and Pillow); importing a new snapshot requires reviewing editorial summaries, source anomalies and available rotation frames before replacing the checked data.

Homepage and catalogue use the same `SiteHeader`, `SiteFooter` and contact dialog. `SiteUIProvider` retains the selected interface language across internal navigation; catalogue product copy remains English and is marked accordingly. White studio image backgrounds blend with gallery, lightbox and rotation surfaces using CSS multiply compositing; source image files are preserved.

Product previews use persistent, eagerly loaded image layers and interruptible GSAP crossfades. The old layer stays visible while the next image decodes; keyboard selection and reduced motion switch immediately. Inactive layers are inert and hidden from assistive technology.
