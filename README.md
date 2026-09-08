# Portfolio — Kriangsit Pranee

Bilingual (Thai / English) developer portfolio with dark mode and a working contact form.
Built with **Astro 5** and **Tailwind CSS 4**, deployed to **GitHub Pages** through GitHub Actions.

🔗 **Live:** https://kriangsit-dev.github.io

---

## Tech stack

| Area         | Choice                                                     |
| ------------ | ---------------------------------------------------------- |
| Framework    | Astro 5 — static output, zero client JS by default         |
| Styling      | Tailwind CSS 4 (CSS-first config via `@theme`)             |
| i18n         | Astro i18n routing — English at `/`, Thai at `/th/`        |
| Dark mode    | Tailwind class strategy + `localStorage`, no flash on load |
| Contact form | Web3Forms — no backend required for a static site          |
| CI / CD      | GitHub Actions: format check → type check → build → deploy |

---

## Architecture decisions

**Static site, not a SPA.**
A portfolio is content, not an application. Astro ships HTML with no client-side framework, so
the first paint is the finished page. The only JavaScript on the page is the theme toggle, the
mobile menu and the contact form submit — a few hundred bytes rather than a framework runtime.

**All copy lives in JSON, not in components.**
`src/i18n/en.json` and `src/i18n/th.json` hold every user-facing string. Components receive a `t`
object and render it. Adding or editing content never touches markup, and the two languages
cannot drift structurally — if a key is missing in one language it surfaces immediately.

**Two thin page entries instead of a routing abstraction.**
`pages/index.astro` and `pages/th/index.astro` both render the same `PageContent` component with a
different dictionary. With two locales this is simpler and more obvious than a dynamic
`[locale]` route, and it keeps the static output trivial to reason about.

**Language-specific assets are resolved through the dictionary.**
The CV download differs per language (`cvPath`), so the path is part of the dictionary rather than
a global constant. This is what prevented the Thai page from serving the English CV.

**Dark mode is applied before first paint.**
An inline script in `<head>` reads `localStorage` (falling back to `prefers-color-scheme`) and sets
the class on `<html>` synchronously, so there is no white flash for users on the dark theme.

**Client never talks to third parties with secrets.**
The Web3Forms key is a public, submit-only key by design. No private credentials exist in this
repository.

---

## Quality gates

Every push and pull request runs:

```bash
npm run format:check   # Prettier
npm run check          # astro check — TypeScript + component diagnostics
npm run build          # production build must succeed
```

Deployment only runs on `main`, and only after the checks pass.

---

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321
```

| Command           | Purpose                            |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Dev server with hot reload         |
| `npm run build`   | Production build into `dist/`      |
| `npm run preview` | Serve the built output             |
| `npm run check`   | Type-check and validate components |
| `npm run format`  | Format the codebase                |

---

## Project structure

```
src/
├─ config.ts              contact details, links, Web3Forms key
├─ assets/                images optimised at build time by astro:assets
│  └─ images.ts           key → image registry referenced from the dictionaries
├─ i18n/
│  ├─ en.json             all English copy
│  └─ th.json             all Thai copy
├─ layouts/BaseLayout.astro   head, SEO, hreflang, JSON-LD, skip link
├─ components/            Nav, Hero, About, Experience, Projects, Skills, Learning, Contact, Footer
├─ pages/
│  ├─ index.astro         English
│  ├─ th/index.astro      Thai
│  └─ 404.astro
└─ styles/global.css      Tailwind theme, focus states, reduced motion
public/                   served as-is, never processed
├─ cv/                    CV PDFs (English and Thai)
├─ og-image.png           social sharing card
├─ favicon.svg
├─ robots.txt
└─ sitemap.xml
```

> To change site content, edit `src/i18n/*.json` only.

**Why images live in `src/assets/` rather than `public/`.**
Files in `public/` are copied verbatim — no resizing, no format conversion. Importing through
`src/assets/` lets `astro:assets` emit responsive `srcset` variants at build time (the profile photo
drops from 31 KB to 1.7 KB at its rendered size). The dictionaries still hold only a key, so content
editing never touches a file path.

---

## Accessibility & SEO

- Skip-to-content link, visible focus states, and a single `h1` per page
- `prefers-reduced-motion` respected
- Form status announced via `role="status"` / `aria-live`
- `hreflang` for both locales, canonical URLs, `sitemap.xml`, `robots.txt`
- `schema.org/Person` JSON-LD so search engines resolve the identity correctly

---

## Conventions

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     a new user-facing capability
fix:      a bug fix
refactor: code change with no behaviour change
style:    formatting only
docs:     documentation
chore:    tooling, dependencies, CI
```

Example: `feat(projects): present work as case studies with decisions and outcomes`

Asset filenames are always lowercase — GitHub Pages is case-sensitive even though Windows is not.

---

## Setup notes

1. **Contact form** — create a free form at [web3forms.com](https://web3forms.com) and put the
   access key in `src/config.ts`.
2. **Deployment** — the repository must be named `kriangsit-dev.github.io`, and
   **Settings → Pages → Source** must be set to **GitHub Actions**.

---

© Kriangsit Pranee
