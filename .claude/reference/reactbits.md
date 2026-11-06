# Référence React Bits (réf. pour les futures améliorations)

Source : dépôt https://github.com/DavidHDev/react-bits (cloné le 2026-11-06) et https://reactbits.dev.
Ce fichier est une fiche de travail : ce qui est réutilisable pour le portfolio, sans rien inventer.

## 1. Bibliothèque gratuite (215+ composants)

- Composants copiables en 4 variantes (JS/TS × CSS/Tailwind). Registre shadcn :
  `"@react-bits": "https://reactbits.dev/r/{name}.json"` dans `components.json`
  (ex. `https://reactbits.dev/r/ASCIIText-JS-TW.json`, 1275 fichiers dans `public/r/` du dépôt).
- Index lisible par un agent : `public/llms.txt` du dépôt (liste de tous les composants + descriptions).
- Serveur MCP : `npx shadcn@latest mcp init --client claude` (guide : https://reactbits.dev/get-started/mcp).
- Outils gratuits : Background Studio, Center Stage (mise en scène de captures), Shape Magic, Texture Lab, Sound Lab.
- Déjà adaptés dans le portfolio : DriftWall, LogoLoop, Particles, TextType, TiltedCard, DepthText, DecryptText, SpotlightCard.
  Règle du projet : ne pas reformater leur code d'origine.

## 2. Agent Kit (« skills IA design »)

Skills de direction artistique pour Claude Code / Cursor / Copilot : chacun fixe un style (échelle de
type, espacements, couleurs exactes, mouvement) et liste des anti-patterns. Ils se chargent
automatiquement une fois installés. Le kit complet (20 éléments) est payant (React Bits Pro,
https://pro.reactbits.dev) ; **seul « Terminal Dark » est gratuit**. Le texte intégral des skills
payants n'est PAS dans le dépôt public : seuls les résumés ci-dessous le sont.
Les skills Pro ciblent Next.js 16 + Tailwind 4 + TypeScript : à adapter (le portfolio est React 19 + Vite + Tailwind 3, JSX).


### Skills

- **Apple Minimal** — Build product landing pages with Apple's restraint: one idea per viewport, a giant type scale, generous negative space, and the product as the only hero.
  - Quand : Use when the user asks for an Apple-like, minimal, premium or product-first landing page, names Apple, Linear, Vercel or Stripe as a reference, wants a very large hero type scale with generous whitespace, or asks to make a page feel expensive and uncluttered.
  - Plan : 1. The core idea · 2. Page architecture · 3. Type scale · 4. Spacing system · 5. Colour · 6. Grid and containers · 7. Navigation · 8. Hero · 9. Feature screens · 10. Motion · 11. Imagery and media · 12. Buttons and links · 13. Anti-patterns: what makes a page fail this style · 14. Responsive behaviour · 15. Accessibility · 16. Performance · 17. Implementation notes · 18. Pairs well with React Bits Pro (optional) · 19. Self-verification loop
- **Corporate Trust** — Build enterprise, finance and healthcare pages where credibility is the entire design objective: a conservative palette, a ranked trust ladder, dense organised proof and a demo-request form that a procurement committee finds legible.
  - Quand : Use when the user is building an enterprise, B2B, finance, insurance, healthcare or government page, mentions compliance, SOC 2, HIPAA, procurement, security or trust signals, wants a demo-request or contact-sales flow, or asks for a conservative and credible design a committee will approve.
  - Plan : 1. The core idea · 2. Page architecture for the enterprise buyer journey · 3. Type scale · 4. Colour system · 5. The trust ladder · 6. Data and metrics presentation · 7. Density rules · 8. Navigation and mega-menus · 9. Hero and proof sections · 10. Pricing, forms and motion · 11. Anti-patterns: what makes a page fail this style · 12. Responsive behaviour · 13. Accessibility: procurement-grade · 14. Performance · 15. Implementation notes · 16. Pairs well with React Bits Pro (optional) · 17. Self-verification loop
- **Editorial** — Build magazine-grade editorial landing pages with a real serif display face, an asymmetric 12-column grid, controlled measure in ch, correct drop caps and pull quotes, hairline rules, and images that bleed and break the grid.
  - Quand : Use when the user wants a magazine, publication, blog, essay or editorial layout, mentions serif display type, drop caps, pull quotes, hairline rules or asymmetric grids, or asks for a page that reads like print.
  - Plan : 1. The core idea · 2. Page architecture · 3. The column grid · 4. Type scale · 5. Vertical rhythm and baseline grid · 6. Colour · 7. Rules, hairlines and dividers · 8. Drop caps and pull quotes · 9. Image treatment and captions · 10. Navigation · 11. Masthead and hero · 12. Article-style body sections · 13. Anti-patterns - what makes a page fail this style · 14. Responsive behaviour · 15. Accessibility · 16. Performance · 17. Implementation notes · 18. Pairs well with React Bits Pro (optional) · 19. Self-verification loop
- **Luxury Serif** — Build high-end fashion, hospitality and jewellery pages where restraint reads as expensive: a high-contrast display serif, wide small-caps tracking, hairline rules and slow, deliberate motion.
  - Quand : Use when the user is building a fashion, jewellery, hospitality, beauty, watch or luxury brand page, asks for an elegant, high-end, refined or understated aesthetic, or wants high-contrast serif type, wide small-caps tracking and slow deliberate motion.
  - Plan : 1. The core idea · 2. Page architecture · 3. Typography: the display serif · 4. Letter-spacing: the small-caps rule · 5. Colour: warm and cool neutral palettes · 6. Photography and art direction · 7. Full-bleed and edge-to-edge treatment · 8. Navigation · 9. Hero · 10. Product and property presentation · 11. Motion · 12. Buttons and links · 13. Anti-patterns: what makes a page fail this style · 14. Responsive behaviour · 15. Accessibility: keeping the style AA-safe · 16. Performance · 17. Implementation notes · 18. Pairs well with React Bits Pro (optional) · 19. Self-verification loop
- **Neobrutalism** — Build loud neobrutalist landing pages with 3px black borders, hard offset shadows with zero blur, saturated flat colour blocks, and chunky type that physically moves when you press it.
  - Quand : Use when the user asks for a brutalist, neobrutalist, bold, loud, playful or retro-web look, mentions thick black borders, hard offset shadows with no blur, or saturated flat colour blocks, or wants a page with strong personality rather than restraint.
  - Plan : 1. The core idea · 2. Page architecture · 3. Type scale · 4. The border and shadow system · 5. Colour system · 6. Grid and containers · 7. Navigation · 8. Hero · 9. Feature sections · 10. Buttons and interactive states · 11. Motion · 12. Imagery treatment · 13. Anti-patterns - what makes a page fail this style · 14. Responsive behaviour · 15. Accessibility · 16. Performance · 17. Implementation notes · 18. Pairs well with React Bits Pro (optional) · 19. Self-verification loop
- **Playful Motion** — Build energetic consumer product pages driven by real spring physics: staggered reveals, scroll-linked transforms, oversized rounded geometry and micro-interactions that stay purposeful and never fight the reader.
  - Quand : Use when the user wants an animated, energetic, bouncy or lively page, mentions spring physics, scroll-linked animation, staggered reveals or micro-interactions, or is building a consumer app, game, or creative product page.
  - Plan : 1. The core idea · 2. Page architecture · 3. Type scale · 4. Colour system · 5. Shape language · 6. The motion system · 7. prefers-reduced-motion as a design state · 8. Navigation · 9. Hero · 10. Feature sections and imagery · 11. Anti-patterns: what makes a page fail this style · 12. Responsive behaviour and mobile motion budget · 13. Accessibility: vestibular safety and focus · 14. Performance · 15. Implementation notes · 16. Pairs well with React Bits Pro (optional) · 17. Self-verification loop
- **Swiss Grid** — Build landing pages in the International Typographic Style: a visible 12-column modular grid, flush-left grotesque type at three sizes, and one accent used as data.
  - Quand : Use when the user asks for a Swiss, International Typographic, modernist, systematic or grid-based design, names Helvetica, modular grids, baseline alignment or Muller-Brockmann, or wants a rigorous flush-left layout with mathematical spacing and a visible column structure.
  - Plan : 1. The core idea · 2. The modular grid · 3. Making the grid visible · 4. Type scale · 5. Flush-left, ragged-right, and why centred text is banned · 6. Spacing system · 7. Colour · 8. Navigation · 9. Hero · 10. Content sections and grid fields · 11. Imagery · 12. Motion · 13. Anti-patterns: what makes a page fail this style · 14. Responsive behaviour · 15. Accessibility · 16. Performance · 17. Implementation notes · 18. Pairs well with React Bits Pro (optional) · 19. Self-verification loop
- **Terminal Dark** (GRATUIT) — Build developer-tool landing pages that read as software: dark-first surfaces, real compiling code as the hero, terminal motifs, hairline borders, and syntax as palette.
  - Quand : Use when the user is building a developer tool, CLI, API, infrastructure, database or open-source landing page, mentions dark-first design, terminals, real code in the hero or syntax highlighting, or wants a page that reads as software rather than marketing.
  - Plan : 1. The core idea · 2. Page architecture · 3. Colour system · 4. Monospace: when it is right and when it is a mistake · 5. Type scale · 6. Code blocks as the hero · 7. Terminal and command-line motifs · 8. The install-command block · 9. Feature sections: dense, not airy · 10. Borders and elevation in a dark UI · 11. Motion · 12. Imagery and media · 13. Anti-patterns: what makes a page fail this style · 14. Responsive behaviour: code on mobile is the hard problem · 15. Accessibility · 16. Performance · 17. Implementation notes · 18. Pairs well with React Bits Pro (optional) · 19. Self-verification loop

### Prompts

- **Agency** — Build a studio site where the work is the pitch: selected projects, a real process, named people, and an enquiry form that filters for the clients you want.
- **Consumer Hardware** — Build a product page for a physical consumer device: desire before specs, one honest hero photograph, a spec table buyers actually read, and shipping, warranty and returns resolved before the visitor hunts for them.
- **Developer Tool** — Build a landing page for engineers: real code in the hero, a copy-paste quickstart, honest benchmarks, credible open-source signals, and zero marketing tics that close tabs.
- **Ecommerce Brand** — Build a DTC product page where every unanswered question is a lost sale: hero shot, product story, sizing, variants, shipping and returns as conversion levers, honest reviews, and a mobile-first sticky add-to-cart.
- **Fintech** — Build a financial product page where trust is the design problem: licensing, deposit protection, security, fee transparency, and required risk disclosures placed to convert.
- **Fitness** — Build a fitness page that converts an emotional decision into a booked trial: transformation framing without unfounded claims, schedule UI that works on mobile, honest proof, and transparent pricing.
- **Real Estate** — Build a property page where imagery does the selling for a single listing, development launch, or brokerage, with a shot-ordered gallery, mobile-readable floor plans, spec tables, and a viewing-request conversion.
- **SaaS Landing Page** — Build a SaaS landing page that converts self-serve signups through problem framing, product proof, objection handling, pricing clarity, and a single dominant CTA.

### Recettes

- **Agency Homepage** — A tested 10-block arrangement that assembles a complete creative or technical studio homepage (positioning through enquiry) from React Bits Pro blocks in one prompt.
- **Product Launch Page** — A tested block arrangement that assembles a full product-launch page from React Bits Pro blocks (announcement hero through waitlist capture) in one prompt.
- **SaaS Homepage** — A tested 13-block arrangement that assembles a complete self-serve B2B SaaS homepage (navigation through footer) from React Bits Pro blocks in one prompt.

## 3. Pistes pour ce portfolio (à valider avec Yanis)

Contrainte du projet : noir et blanc pur, texte blanc franc, pas de gris ni d'accent, 3 polices
(Anton / Space Grotesk / Space Mono), peu de texte. Styles compatibles : Terminal Dark (code comme
visuel, bordures fines, mono), Swiss Grid (grille visible, 3 tailles de type), Editorial (grille
asymétrique, filets), Apple Minimal (une idée par écran, gros type).
