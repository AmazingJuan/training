import { services, modes } from '~~/app/data/services'
import { news } from '~~/app/data/news'

// Built from the same data as the pages, so a new service or post is listed
// automatically. Internal pages (/sistema) are intentionally left out.
const staticPaths = [
  '/', '/portafolio-de-servicios', '/cursos-y-formaciones', '/clientes', '/actualidad',
  '/empresa', '/empresa/equipo', '/empresa/sistema-de-gestion-integrado', '/contratistas', '/contacto',
  '/accesibilidad',
]

// English lives under /en with the same slugs; each URL lists both versions.
const inLang = (path: string, lang: Lang) => (lang === 'es' ? path : path === '/' ? '/en' : `/en${path}`)

// Pages without their own date carry the build date (the site is prerendered).
const built = new Date().toISOString().slice(0, 10)

export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const entries = [
    ...staticPaths.map((path) => ({ path })),
    ...services.map((s) => ({ path: `/portafolio-de-servicios/${s.slug}` })),
    ...modes.flatMap((m) => [{ path: `/servicios/${m.id}` }, ...services.map((s) => ({ path: `/servicios/${m.id}/${s.slug}` }))]),
    ...news.map((n) => ({ path: `/actualidad/${n.slug}`, lastmod: n.date })),
  ]
  const urls = entries
    .flatMap((e) => langs.map((lang) => {
      const alternates = langs
        .map((l) => `<xhtml:link rel="alternate" hreflang="${langTag[l]}" href="${siteUrl}${inLang(e.path, l)}"/>`)
        .join('') + `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${e.path}"/>`
      const lastmod = `<lastmod>${'lastmod' in e ? e.lastmod : built}</lastmod>`
      return `  <url><loc>${siteUrl}${inLang(e.path, lang)}</loc>${lastmod}${alternates}</url>`
    }))
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
})
