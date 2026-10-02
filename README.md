# HIGHROLERS — Marketing Agency Website

A front-end-only React + Vite site — no server code. Build it once and host the `dist/` folder anywhere.
Visual design follows the STARMEDIA Marketing Agency Behance design:
https://www.behance.net/gallery/246021465/STARMEDIA-Marketing-Agency-Website-design

## Quick Start
Requires **Node.js 20.19+**.

- **Windows:** double-click `start.bat` (installs if needed, builds, and opens the site in your browser).
- **Development** (hot reload): `npm install`, then `npm run dev` → http://localhost:5173
- **Production preview:** `npm start` (= `npm run build` + `npm run preview`) → http://localhost:4173
- **Deploy:** upload `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel…).
  Configure the host to serve `index.html` for unknown paths ("SPA fallback") so routes such as
  `/contact` and `/capabilities/seo` load when opened directly.

If a port is busy, Vite automatically picks the next free one and prints the address.

## Project Structure
```
index.html                  Vite entry: SEO meta, fonts, JSON-LD
vite.config.js              Build / dev / preview settings
public/assets/              Brand images, cursor, video (served as /assets/...)
src/
  main.jsx, App.jsx         Entry point, router and animated page transitions
  pages/                    HomePage, CapabilityPage, ContactPage, LegalPage, NotFoundPage
  animations/variants.js    Shared Motion presets (easing, reveals, staggers)
  context/                  ThemeContext (useTheme), ToastContext (useToast)
  data/                     capabilities.js (all 19), contact.js, enquiry.js (form rules), legal/,
                            navigation.js, themes.js, site.js
  hooks/                    useScrollSpy, useScrolled, useAutoplayVideo, usePageMeta, useMediaQuery,
                            useActiveSection
  utils/                    scrollToSection, themeTransition, format
  styles/                   Global layer: tokens, base/reset, utilities (bracket boxes, glass)
    themes/                 light.css, dark.css (all colors), transition.css (switch reveal)
  components/
    effects/                AmbientBackground, CustomCursor, PixelMatrixCanvas, PixelParticleField
    layout/                 Header (+ NavPillDock), Footer, PageTransition
    sections/               Hero, Methodology, Services (+ CapabilityTabs), StudioShowcase, PixelDivider
    capability/             Detail-page blocks: Hero, Ticker, Sections, Callout, Flow, Statement,
                            Highlights, IdealFor, Pager, Cta (+ shared capability.css)
    contact/                ContactIntro, ContactChannels, StudioClock, EnquiryForm, EnquirySuccess
    ui/                     BracketBox, RevealText, Toast, ThemeToggle, PixelEmblem, PixelSelect,
                            CountUp, SectionHeading, RotatingSeal
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

## Contact Page & Enquiries
`/contact` (CONTACT in the header) is a single-screen page: direct channels on the left (Gmail,
phone, WhatsApp, address, live Patna clock) and the enquiry form on the right. On phones and short
screens the form becomes 3 steps so it still fits without scrolling. Capability pages link to it
with the service pre-selected (`/contact?service=<slug>`).

- **Contact details:** edit `src/data/contact.js` (email, phone, WhatsApp) and `MAPS_URL` /
  `OFFICE` in `src/data/site.js`. The contact page, footer and legal pages all read from there.
- **Sending is simulated (front-end only):** the form validates in the browser, plays the
  "TRANSMITTING…" animation and shows the thank-you screen with a reference number, but the
  enquiry is **not delivered anywhere**.
- **To receive real enquiries later:** replace `simulateSend()` in
  `src/components/contact/EnquiryForm/useEnquiryForm.js` with a call to a form service (e.g.
  Web3Forms, Formspree, EmailJS) or your own API that resolves to `{ reference }`. Nothing else
  needs to change. Form options and validation live in `src/data/enquiry.js`.

## Privacy Policy & Terms
`/privacy-policy` and `/terms` share one page layout (`src/pages/LegalPage/`) with a sticky
contents list. The text lives in `src/data/legal/privacyContent.js` and `src/data/legal/terms.js`
as plain sections — edit the wording there and update the `updated` date. Linked from the footer
and the contact page.

## Smooth Scrolling
The whole site scrolls with [Lenis](https://github.com/darkroomengineering/lenis), mounted once by
`src/components/layout/SmoothScroll.jsx`. Tune the feel in `src/utils/smoothScroll.js`
(`lerp` — lower is silkier; `JUMP.duration` for nav/back-to-top glides).

- Use `scrollToY(y)` or `scrollToSection(id)` for programmatic scrolling — not `window.scrollTo`.
- Phones keep native touch scrolling; "reduce motion" users get 1:1 scrolling automatically.
- Inner scroll areas (dropdowns, tab rows) keep scrolling on their own; add `data-lenis-prevent`
  to any new scrollable element if it ever passes the wheel through to the page.

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
