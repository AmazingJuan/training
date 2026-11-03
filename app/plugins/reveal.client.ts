/**
 * Scroll reveal: content blocks fade and rise into place as they enter the
 * screen, and lists (logos, team, services, departments) do so item by item.
 *
 * - Targets are found automatically: the direct children of each section's or
 *   article's `.frame` (except the opening hero, which has its own sequence),
 *   the client sectors, plus any element marked `data-reveal`. A list (`ul`/`ol`) reveals its items in turn.
 * - Nothing is hidden by markup or CSS alone: an element is hidden only after
 *   this script has given it the `data-rv` attribute and is watching it, so content is
 *   always visible without JavaScript, under reduced motion and with
 *   "stop animations" (html without the `motion` class).
 * - Each element is revealed once; content already on screen appears at once.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement
  const enabled = () => root.classList.contains('motion') && !root.classList.contains('a11y-still')

  const SELECTOR = [
    'main :is(section, article):not(.hero) .frame > *',
    // Client sectors: heading and logo grid of each sector.
    'main .sectors > section > *',
    'main [data-reveal]',
  ].join(', ')
  const seen = new WeakSet<Element>()

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      const el = e.target as HTMLElement
      el.dataset.rv = 'in'
      io.unobserve(el)
      // Once in place, hand the element back untouched (its own transitions, no delay).
      setTimeout(() => {
        delete el.dataset.rv
        delete el.dataset.rvDelay
      }, 1400)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

  function prepare(el: Element, delay = 0) {
    if (seen.has(el)) return
    seen.add(el)
    const r = el.getBoundingClientRect()
    // Already on screen when found (first paint, back navigation): show it as is.
    if (r.top < window.innerHeight * 0.92 && r.bottom > 0) return
    // Data attributes, not classes or inline styles: Vue compares those while
    // hydrating lazily loaded sections and would report a mismatch.
    const h = el as HTMLElement
    if (delay) h.dataset.rvDelay = String(delay)
    h.dataset.rv = ''
    io.observe(el)
  }

  function scan() {
    if (!enabled()) return
    for (const el of document.querySelectorAll(SELECTOR)) {
      if (el.closest('.sheet, .drop, .a11y__panel, [aria-hidden="true"]')) continue
      const isList = (el.tagName === 'UL' || el.tagName === 'OL') && el.children.length > 1 && el.children.length <= 48
      if (isList) {
        seen.add(el)
        // Items on the same row appear together; each following row a little later,
        // so a row is never seen at uneven heights.
        const tops: number[] = []
        for (const child of el.children) {
          const top = Math.round(child.getBoundingClientRect().top)
          if (!tops.includes(top)) tops.push(top)
          prepare(child, Math.min(tops.indexOf(top), 7) * 90)
        }
      }
      else {
        prepare(el)
      }
    }
  }

  // Sections below the fold hydrate lazily and pages change: scan again when the DOM grows.
  let queued = false
  const rescan = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => { queued = false; scan() })
  }
  new MutationObserver(rescan).observe(document.body, { childList: true, subtree: true })
  nuxtApp.hook('page:finish', rescan)
  scan()

  // "Stop animations" switched on mid-visit: show everything still waiting.
  new MutationObserver(() => {
    if (enabled()) return
    for (const el of document.querySelectorAll<HTMLElement>('[data-rv=""]')) el.dataset.rv = 'in'
  }).observe(root, { attributes: true, attributeFilter: ['class'] })
})
