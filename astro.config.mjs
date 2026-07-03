// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { REPO_URL } from './src/lib/site.ts'
import { rehypeBaseLinks } from './src/lib/rehype-base-links.ts'

// GitHub Pages serves project sites under https://<owner>.github.io/<repo>/.
// The deploy workflow sets SITE_URL and SITE_BASE; local dev runs at root.
const site = process.env.SITE_URL ?? 'http://localhost:4321'
const base = process.env.SITE_BASE ?? '/'

export default defineConfig({
  site,
  base,
  markdown: {
    rehypePlugins: [rehypeBaseLinks(base)],
  },
  integrations: [
    starlight({
      title: 'wis',
      description: 'sees everything. tells nothing. an open-source browser that is fast and light, safe and yours.',
      logo: { src: './src/assets/wis-mark.svg', alt: 'wis' },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/starlight.css'],
      social: [{ icon: 'github', label: 'GitHub', href: REPO_URL }],
      sidebar: [
        { label: 'getting started', items: [{ autogenerate: { directory: 'docs/getting-started' } }] },
        { label: 'features', items: [{ autogenerate: { directory: 'docs/features' } }] },
        { label: 'reference', items: [{ autogenerate: { directory: 'docs/reference' } }] },
      ],
      components: {
        ThemeProvider: './src/components/starlight/ThemeProvider.astro',
        ThemeSelect: './src/components/starlight/ThemeSelect.astro',
      },
    }),
  ],
})
