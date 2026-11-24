/**
 * Visit measurement: Google Analytics 4 and Microsoft Clarity.
 *
 * - Each tool loads only when its ID is set at build time
 *   (NUXT_PUBLIC_ANALYTICS_GA_ID, NUXT_PUBLIC_ANALYTICS_CLARITY_ID), so a build
 *   without IDs ships no tracking at all.
 * - Scripts are requested once the browser is idle, after the first paint, so
 *   they never delay the page.
 * - Page changes inside the site are picked up by both tools from the browser
 *   history (GA4 enhanced measurement, Clarity by default).
 * - The staff intranet is not measured.
 * - Visitors are told about every tool and cookie on /politica-de-cookies:
 *   update that page when a tool is added or removed.
 */
export default defineNuxtPlugin(() => {
  const { gaId, clarityId } = useRuntimeConfig().public.analytics
  if (!gaId && !clarityId) return
  if (useRoute().path.startsWith('/intranet')) return

  const addScript = (src: string) => {
    const s = document.createElement('script')
    s.async = true
    s.src = src
    document.head.appendChild(s)
  }

  const load = () => {
    if (gaId) {
      const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void }
      w.dataLayer = w.dataLayer || []
      w.gtag = function gtag() {
        // gtag.js reads the arguments object itself, not an array.
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer.push(arguments)
      }
      w.gtag('js', new Date())
      w.gtag('config', gaId)
      addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`)
    }
    if (clarityId) {
      const w = window as unknown as { clarity: { (...args: unknown[]): void; q?: unknown[] } }
      w.clarity = w.clarity || function clarity() {
        // Same queue as Clarity's own snippet.
        // eslint-disable-next-line prefer-rest-params
        (w.clarity.q = w.clarity.q || []).push(arguments)
      }
      addScript(`https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`)
    }
  }

  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 4000 })
  else setTimeout(load, 2000)
})
