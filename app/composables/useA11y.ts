import { createGlobalState } from '@vueuse/core'

/**
 * Visitor-chosen display preferences (accessibility panel). They complement,
 * never replace, what the site already does for everyone (WCAG 2.1 AA, as
 * required by Resolución 1519 de 2020 de MinTIC): they let a visitor go further
 * than the defaults without browser settings.
 *
 * Stored in this browser only. Applied as classes on <html> before the first
 * paint by the inline script in app.vue (same key, same class names), so a
 * returning visitor never sees the page flash at the wrong size or contrast.
 */
export interface A11yPrefs {
  /** Index into `textScales`. */
  text: number
  contrast: boolean
  underline: boolean
  spacing: boolean
  /** Stops animations, transitions and smooth scrolling. */
  still: boolean
}

export const A11Y_KEY = 'tc-accesibilidad'
export const textScales = [100, 115, 130, 150] as const
export const defaultA11y: A11yPrefs = { text: 0, contrast: false, underline: false, spacing: false, still: false }

/** Applies preferences to <html>. Mirrors the inline script in app.vue. */
export function applyA11y(p: A11yPrefs) {
  const root = document.documentElement
  root.style.fontSize = p.text ? `${textScales[p.text]}%` : ''
  root.classList.toggle('a11y-contrast', p.contrast)
  root.classList.toggle('a11y-underline', p.underline)
  root.classList.toggle('a11y-spacing', p.spacing)
  root.classList.toggle('a11y-still', p.still)
  if (p.still) root.classList.remove('motion')
}

export const useA11y = createGlobalState(() => {
  const prefs = ref<A11yPrefs>({ ...defaultA11y })
  const nuxtApp = useNuxtApp()

  onMounted(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(A11Y_KEY) ?? 'null') as Partial<A11yPrefs> | null
      if (saved) prefs.value = { ...defaultA11y, ...saved }
    }
    catch {}
  })

  /** Ends whatever motion is already running, leaving every element in its final, visible state. */
  async function stopMotion() {
    nuxtApp.$lenis?.destroy()
    nuxtApp.$lenis = undefined
    const tools = await (nuxtApp.$motion as Promise<{ ScrollTrigger: { getAll: () => { animation?: { progress: (n: number) => void }, kill: () => void }[] } } | null> | undefined)
    tools?.ScrollTrigger.getAll().forEach((st) => {
      st.animation?.progress(1)
      st.kill()
    })
  }

  watch(prefs, (p, old) => {
    if (!import.meta.client) return
    applyA11y(p)
    if (p.still && !old?.still) void stopMotion()
    try {
      const isDefault = JSON.stringify(p) === JSON.stringify(defaultA11y)
      if (isDefault) localStorage.removeItem(A11Y_KEY)
      else localStorage.setItem(A11Y_KEY, JSON.stringify(p))
    }
    catch {}
  }, { deep: true })

  const changed = computed(() => JSON.stringify(prefs.value) !== JSON.stringify(defaultA11y))
  const reset = () => { prefs.value = { ...defaultA11y } }

  return { prefs, changed, reset }
})
