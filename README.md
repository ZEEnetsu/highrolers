# HIGHROLERS — Marketing Agency Website

React + Vite front end, served by a small Node.js (Express) server.
Visual design follows the STARMEDIA Marketing Agency Behance design:
https://www.behance.net/gallery/246021465/STARMEDIA-Marketing-Agency-Website-design

## Quick Start
Requires **Node.js 20.19+**.

- **Windows:** double-click `start.bat` (installs, builds, starts the server and opens the browser).
- **Development** (hot reload): `npm install`, then `npm run dev` → http://localhost:5173
- **Production:** `npm run build`, then `npm start` → http://127.0.0.1:8080

If port 8080 is busy (e.g. Apache/XAMPP), the server automatically moves to 8081, 8082, …
and prints the address it is using. Set `PORT` to choose another start port.

## Project Structure
```
server.js                   Node.js server for the production build (dist/)
index.html                  Vite entry: SEO meta, fonts, JSON-LD
public/assets/              Brand images, cursor, video (served as /assets/...)
src/
  main.jsx, App.jsx         Entry point, router and animated page transitions
  pages/                    HomePage, CapabilityPage (/capabilities/:slug), NotFoundPage
  animations/variants.js    Shared Motion presets (easing, reveals, staggers)
  context/                  ThemeContext (useTheme), ToastContext (useToast)
  data/                     Page content: capabilities.js (all 19), themes.js, site.js …
  hooks/                    useScrollSpy, useScrolled, useAutoplayVideo, usePageMeta
  utils/                    scrollToSection, themeTransition, format
  styles/                   Global layer: tokens, base/reset, utilities (bracket boxes, glass)
    themes/                 light.css, dark.css (all colors), transition.css (switch reveal)
  components/
    effects/                AmbientBackground, CustomCursor, PixelMatrixCanvas, PixelParticleField
    layout/                 Header (+ NavPillDock), Footer, PageTransition
    sections/               Hero, Methodology, Services (+ CapabilityTabs), StudioShowcase, PixelDivider
    capability/             Detail-page blocks: Hero, Ticker, Sections, Callout, Flow, Statement,
                            Highlights, IdealFor, Pager, Cta (+ shared capability.css)
    ui/                     BracketBox, RevealText, Toast, ThemeToggle, PixelEmblem, CountUp,
                            SectionHeading, RotatingSeal
```
Each component sits in its own folder with its own `.css` file. To edit copy or add a
service/card, change the matching file in `src/data/` — no component changes needed.

## Capabilities & Detail Pages
All 19 capabilities from the company profile live in `src/data/capabilities.js`. That one file
drives the home accordion (`summary`, `tags`) and each page at `/capabilities/<slug>`.

- **Home:** the Capabilities section has category tabs (All / Technology / Growth / Design /
  Creative). Each open row links to its detail page.
- **Detail page blocks:** hero (outlined number, pixel emblem generated from the slug, live
  stats), crossing ticker tapes, service cards, plus optional `callout`, `flow` (steps joined by
  `→` or `+`, with a travelling highlight), `statement`, `highlights`, `idealFor`, then
  previous/next + related links and a closing call to action. Leave a field out and its block
  disappears.
- **Add a capability:** append an object to `CAPABILITIES` (unique `slug`, `num`, `group`).
  It appears in the tabs, gets a page, and joins the previous/next chain automatically.

## Hero Particles
`PixelParticleField` draws square pixels in the theme's ink colour that drift, scatter away from
the cursor, spring back, and burst outward on click. Tune it with `PARTICLE_DEFAULTS` at the top
of `src/components/effects/PixelParticleField/PixelParticleField.jsx` (density, size range,
cursor radius, forces), or per instance via props: `<PixelParticleField density={1 / 7000} />`.
It pauses off-screen and is static with "reduce motion".

## Light & Dark Mode
The toggle sits in the right corner of the header. Switching plays a circular reveal that
spreads from the toggle (View Transitions API; instant with "reduce motion" or in older browsers).
First-time visitors start in **dark mode**; once someone toggles, their choice is saved and
used on every later visit. (Set `FOLLOW_SYSTEM = true` in `themes.js` to follow the OS instead.)

- **Change colors:** edit `src/styles/themes/light.css` or `dark.css`. Every color in the site is
  a token there; components only reference tokens. `-rgb` tokens are channels used as
  `rgb(var(--glass-rgb) / 0.8)`, so each component keeps its own opacity in every theme.
- **Behavior:** `src/data/themes.js` — theme list, default theme, follow-OS on/off, storage key,
  reveal duration/easing. (The tiny boot script in `index.html` mirrors the storage key and
  default theme, so the right theme paints before React loads — change both together.)
- **Add a theme:** copy `dark.css` to `<name>.css` with `[data-theme='<name>']`, import it in
  `src/styles/global.css`, and add it to `THEMES`. `toggleTheme()` cycles through the list.
- **In code:** `const { theme, setTheme, toggleTheme } = useTheme();`
- **Artwork:** black-on-transparent images flip to white via `--graphic-invert`; add the
  `theme-graphic` class to any new monochrome logo or icon.
- **Tailwind:** `dark:` utilities follow the toggle (configured in `global.css`).

## Art Direction & Palette
- **Color Scheme**: High-contrast black and white — white page with black ink (light) or obsidian page with white ink (dark) — frosted-glass panels with corner brackets.
- **Typography**: Condensed display ('Bebas Neue', 'Anton', 'Syne'), monospace tags ('JetBrains Mono'), grotesque body ('Work Sans').

## Animation
Built with [Motion](https://motion.dev) (`motion/react`):
- Headlines reveal word-by-word; sections, cards and service rows fade/slide in on scroll with staggering.
- Nav highlight springs between items (`layoutId`); accordion drawers animate to their natural height.
- Hero photo has scroll parallax; the studio video opens with a letterbox clip reveal.
- Pixel smiley charges with spring physics; the pegasus and card glyphs float.
- The existing CSS effects are kept: pixel cursor + reticle, click bursts, drifting glass orbs, rotating seal, dithered canvas.

Animations respect the OS "reduce motion" setting.
