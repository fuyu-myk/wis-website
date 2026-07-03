<div align="center">
  <img src="public/wis-logo.png" width="120" height="120" alt="Wis" />

  <h1>Wis Website</h1>

  <p><strong>The website and landing page for <a href="https://github.com/fuyu-myk/wis-browser">Wis</a>.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/license-Apache--2.0-green" alt="license" />
    <img src="https://img.shields.io/badge/Astro-6-BC52EE" alt="astro" />
    <img src="https://img.shields.io/badge/Starlight-docs-8F99FB" alt="starlight" />
  </p>

  <p><a href="https://fuyu-myk.github.io/wis-website/">wis website</a></p>
</div>

---

The source code for the [Wis website](https://fuyu-myk.github.io/wis-website/), the landing page for **Wis**, a lightweight, secure, and fast browser.

The repository of the Wis browser can be found at [**fuyu-myk/wis-browser**](https://github.com/fuyu-myk/wis-browser).

## Tech stack

- **[Astro 6](https://astro.build)**: fully static output, no client framework; the landing page ships only a few small inline scripts
- **[Starlight](https://starlight.astro.build)**: powers the docs under `/docs/`, with custom theme overrides to keep it dark and on-brand
- **TypeScript**: Astro's strict preset with the `@/*` path alias
- **Hand-rolled CSS**: design tokens and shared styles in `src/styles/site.css`, no CSS framework
- **Canvas + raw WebGL**: the constellation background and the hero aurora shader (`src/lib/aurora`) are dependency-free
- **[pnpm](https://pnpm.io)** for packages; [Playwright](https://playwright.dev) (dev-only) for visual verification

## Run locally

**Prerequisites:** Node 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

**Other scripts**:

```bash
pnpm build        # production build (dist/)
pnpm preview      # serve the production build
```

## Structure

```text
src/
├── pages/
│   └── index.astro         # the landing page
├── components/             # landing sections (Hero, FeatureGrid, Privacy, …)
│   ├── Background.astro    # constellation canvas + WebGL aurora wiring
│   └── starlight/          # docs theme overrides (ThemeProvider, ThemeSelect)
├── content/
│   └── docs/               # Starlight docs content (markdown)
├── lib/
│   ├── site.ts             # repo/release URLs used across the site
│   └── aurora/             # dependency-free WebGL hero aurora (runtime + GLSL)
├── styles/
│   ├── site.css            # design tokens + shared styles
│   └── starlight.css       # docs skin
└── assets/                 # the wis owl mark
public/                     # favicon, logo
astro.config.mjs            # site/base read from SITE_URL/SITE_BASE (GitHub Pages)
```

## License

This website is licensed under the [Apache-2.0 License](LICENSE), same as the Wis browser.
