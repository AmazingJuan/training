/**
 * The current language and the two helpers every component needs:
 * `tr()` picks the text in the current language from a `Loc` value, and
 * `localePath()` turns a site path into the path in the current language
 * (Spanish has no prefix; English lives under /en).
 */
export function useLang() {
  const { locale } = useI18n()
  const lang = computed(() => locale.value as Lang)
  const tr = <V>(value: Loc<V>): V => value[lang.value]
  const localePath = useLocalePath()
  return { lang, tr, localePath }
}
