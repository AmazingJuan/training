/**
 * The site's two languages. Spanish is the original: every text is written in
 * Spanish first and translated, never the other way round.
 */
export const langs = ['es', 'en'] as const

export type Lang = (typeof langs)[number]

/** One value in each language of the site (a text, a list of texts, an object). */
export type Loc<V = string> = Record<Lang, V>

/** BCP 47 tag per language, for `lang`, dates and schema.org. */
export const langTag: Record<Lang, string> = { es: 'es-CO', en: 'en-US' }

/** Open Graph locale per language. */
export const ogLocale: Record<Lang, string> = { es: 'es_CO', en: 'en_US' }
