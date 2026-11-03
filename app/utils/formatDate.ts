const formatters = Object.fromEntries(
  langs.map((l) => [l, new Intl.DateTimeFormat(langTag[l], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })]),
) as Record<Lang, Intl.DateTimeFormat>

/** "2024-04-18" → "18 de abril de 2024" / "April 18, 2024" (auto-imported as a Nuxt util). */
export const formatDate = (iso: string, lang: Lang = 'es') => formatters[lang].format(new Date(`${iso}T00:00:00Z`))
