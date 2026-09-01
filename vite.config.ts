import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import {
  NOT_FOUND_META,
  SITE_NAME,
  STATIC_PAGE_META,
  type PageMetaDefinition,
  toAbsoluteUrl,
} from './src/data/pageMeta'

const PAGE_META_PATTERN = /\s*<!-- PAGE_META_START -->[\s\S]*?<!-- PAGE_META_END -->/

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function renderMeta(page: PageMetaDefinition) {
  const canonical = page.path ? toAbsoluteUrl(page.path) : undefined
  const image = toAbsoluteUrl(page.image)
  const robots = page.noIndex
    ? '    <meta name="robots" content="noindex, follow" />\n'
    : ''
  const canonicalTag = canonical
    ? `    <link rel="canonical" href="${escapeHtml(canonical)}" />\n`
    : ''

  return `
    <!-- PAGE_META_START -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="author" content="${SITE_NAME}" />
    <meta name="theme-color" content="#0a0a0a" />
${robots}${canonicalTag}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="fr_FR" />
    ${canonical ? `<meta property="og:url" content="${escapeHtml(canonical)}" />` : ''}
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:type" content="${page.imageType}" />
    <meta property="og:image:width" content="${page.imageWidth}" />
    <meta property="og:image:height" content="${page.imageHeight}" />
    <meta property="og:image:alt" content="${escapeHtml(page.imageAlt)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(page.imageAlt)}" />
    <!-- PAGE_META_END -->`
}

function renderPage(indexHtml: string, page: PageMetaDefinition) {
  return indexHtml.replace(PAGE_META_PATTERN, renderMeta(page))
}

function outputPath(path: string) {
  return path === '/' ? 'index.html' : `${path.slice(1)}index.html`
}

function renderSitemap() {
  const urls = STATIC_PAGE_META.map(
    (page) => `  <url>
    <loc>${escapeHtml(toAbsoluteUrl(page.path))}</loc>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`,
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

/**
 * GitHub Pages ne réécrit pas les routes d'une SPA vers index.html. Le build
 * produit donc un vrai fichier index.html pour chaque route publique. Les URL
 * directes répondent ainsi en 200 et exposent leurs métadonnées sans JavaScript.
 */
function staticPages(): Plugin {
  return {
    name: 'portfolio-static-pages',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') return

      const indexSource = String(index.source)

      for (const page of STATIC_PAGE_META) {
        const fileName = outputPath(page.path)
        const source = renderPage(indexSource, page)

        if (fileName === 'index.html') {
          index.source = source
        } else {
          this.emitFile({ type: 'asset', fileName, source })
        }
      }

      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: renderPage(indexSource, NOT_FOUND_META),
      })

      const sitemap = bundle['sitemap.xml']
      if (sitemap?.type === 'asset') {
        sitemap.source = renderSitemap()
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), staticPages()],
  base: '/',
})
