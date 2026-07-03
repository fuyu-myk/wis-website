/**
 * Rehype plugin that prefixes the configured Astro base onto root-relative
 * links in markdown content (e.g. "/docs/…" → "/wis-website/docs/…").
 * Starlight prefixes its own generated links, but raw markdown hrefs pass
 * through untouched, which breaks GitHub Pages project-site subpaths.
 * A no-op when the site is served from the root.
 */

interface HastNode {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

const ATTRS: Record<string, string> = { a: 'href', img: 'src' }

const needsPrefix = (value: string, prefix: string): boolean =>
  value.startsWith('/') && !value.startsWith('//') && !value.startsWith(`${prefix}/`)

const walk = (node: HastNode, prefix: string): void => {
  const attr = node.tagName ? ATTRS[node.tagName] : undefined
  const value = attr ? node.properties?.[attr] : undefined
  if (attr && typeof value === 'string' && needsPrefix(value, prefix)) {
    node.properties = { ...node.properties, [attr]: `${prefix}${value}` }
  }
  for (const child of node.children ?? []) walk(child, prefix)
}

export const rehypeBaseLinks = (base: string) => {
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base
  return () => (tree: HastNode) => {
    if (prefix) walk(tree, prefix)
  }
}
