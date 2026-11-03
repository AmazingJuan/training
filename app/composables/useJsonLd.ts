import { company, certifications, presence } from '~/data/company'
import type { ServiceLine } from '~/data/services'
import { findMode } from '~/data/services'
import type { Course } from '~/data/courses'

/** Adds one schema.org JSON-LD block to the page. `key` keeps it from being duplicated. */
export function useJsonLd(key: string, data: Record<string, unknown>) {
  useHead({
    script: [{ key: `ld-${key}`, type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...data }) }],
  })
}

/** Stable identifiers, so every page's markup points at the same organisation and site. */
export function useSchemaIds() {
  const { siteUrl } = useRuntimeConfig().public
  return { siteUrl, org: `${siteUrl}/#organizacion`, site: `${siteUrl}/#sitio` }
}

/**
 * The organisation and the website, on every page (layout). Only verified facts:
 * address, phones, certifications with their issuer and the IAM membership.
 */
export function useOrganizationJsonLd() {
  const { siteUrl, org, site } = useSchemaIds()
  const { lang, tr } = useLang()
  const iso = certifications.filter((c) => c.code.startsWith('ISO'))

  useJsonLd('organizacion', {
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': org,
        name: company.legalName,
        alternateName: company.shortName,
        description: tr(company.summary),
        slogan: tr(company.tagline),
        url: `${siteUrl}/`,
        // Square version (Google asks for at least 112 × 112 px).
        logo: { '@type': 'ImageObject', url: `${siteUrl}/brand/logo-training-corporation-cuadrado.png`, width: 240, height: 240 },
        image: `${siteUrl}/images/fotos/edificio-colmena.jpg`,
        email: company.email,
        telephone: company.phones[0].href.replace('tel:', ''),
        contactPoint: company.phones.map((p) => ({
          '@type': 'ContactPoint',
          telephone: p.href.replace('tel:', ''),
          contactType: 'customer service',
          areaServed: 'CO',
          availableLanguage: ['es', 'en'],
        })),
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${company.address.street}, ${company.address.building}, ${company.address.office.es.toLowerCase()}`,
          addressLocality: company.address.city,
          addressRegion: company.address.region,
          addressCountry: 'CO',
        },
        hasMap: company.address.mapUrl,
        areaServed: [
          { '@type': 'Country', name: 'Colombia' },
          ...presence.countries.map((c) => ({ '@type': 'Country', name: tr(c.name) })),
        ],
        knowsAbout: [
          'ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 55001', 'ISO/IEC 27001', 'ISO/IEC 17025', 'ISO/IEC 17020',
          'Gestión de activos', 'Regulación CREG', 'Sistemas de gestión HSEQ', 'Auditoría interna', 'MIPG',
        ],
        hasCredential: iso.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          name: `${c.code} ${tr(c.name)}`,
          credentialCategory: 'certification',
          recognizedBy: { '@type': 'Organization', name: c.issuer },
          url: `${siteUrl}${c.document}`,
        })),
        memberOf: { '@type': 'Organization', name: 'The Institute of Asset Management', url: 'https://theiam.org' },
        sameAs: [company.social.facebook, company.social.linkedin],
      },
      {
        '@type': 'WebSite',
        '@id': site,
        url: `${siteUrl}/`,
        name: company.shortName,
        alternateName: company.legalName,
        inLanguage: langTag[lang.value],
        publisher: { '@id': org },
      },
    ],
  })
}

/** A service line: what is offered, by whom and where, with its offers as a catalogue. */
export function useServiceJsonLd(service: ServiceLine, sitePath: string) {
  const { siteUrl, org } = useSchemaIds()
  const { tr, localePath } = useLang()
  // The page's own address in the current language (English lives under /en).
  const path = localePath(sitePath)
  const groups = Object.entries(service.offers) as [string, ServiceLine['offers'][keyof ServiceLine['offers']]][]
  const unit = (id: string) => { const m = findMode(id); return m ? tr(m.name) : id }

  useJsonLd('servicio', {
    '@type': 'Service',
    '@id': `${siteUrl}${path}#servicio`,
    name: tr(service.name),
    serviceType: tr(service.seo.title),
    description: tr(service.seo.description),
    url: `${siteUrl}${path}`,
    provider: { '@id': org },
    areaServed: { '@type': 'Country', name: 'Colombia' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: tr(service.name),
      itemListElement: groups.filter(([, g]) => g.length).map(([mode, g]) => ({
        '@type': 'OfferCatalog',
        name: unit(mode),
        itemListElement: g.flatMap((x) => x.items).map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: tr(name) },
        })),
      })),
    },
  })
}

/** Diplomas: Course markup with the online, live format and the workload of the last edition. */
export function useCoursesJsonLd(list: Course[]) {
  const { siteUrl, org } = useSchemaIds()
  const { tr, localePath } = useLang()
  useJsonLd('cursos', {
    '@graph': list.map((c) => ({
      '@type': 'Course',
      '@id': `${siteUrl}${localePath('/cursos-y-formaciones')}#${c.slug}`,
      name: tr(c.name),
      description: tr(c.summary),
      url: `${siteUrl}${localePath('/cursos-y-formaciones')}#${c.slug}`,
      inLanguage: 'es',
      provider: { '@id': org },
      educationalCredentialAwarded: c.awards.map(tr).join('; '),
      teaches: c.modules.map((m) => tr(m.title)),
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: `PT${c.hours}H`,
      },
    })),
  })
}
