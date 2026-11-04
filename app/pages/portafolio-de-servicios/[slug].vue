<script setup lang="ts">
import { Download } from '@lucide/vue'
import { findService, services, modes, countOffers, servicePath } from '~/data/services'
import { cases } from '~/data/company'
import { courses } from '~/data/courses'

const route = useRoute()
const service = findService(String(route.params.slug))
const { tr, lang } = useLang()

if (!service) {
  throw createError({ statusCode: 404, statusMessage: tr({ es: 'Servicio no encontrado', en: 'Service not found' }), fatal: true })
}

const copy = {
  services: { es: 'Servicios', en: 'Services' },
  proposal: { es: 'Solicitar una propuesta', en: 'Request a proposal' },
  frameworks: { es: 'Marco normativo', en: 'Regulatory framework' },
  pdf: { es: 'Portafolio completo (PDF)', en: 'Full portfolio (PDF, in Spanish)' },
  scope: { es: 'Alcance', en: 'Scope' },
  jump: { es: 'Ir a un tipo de servicio', en: 'Go to a type of service' },
  benefits: { es: 'Beneficios para su organización', en: 'Benefits for your organization' },
  practice: { es: 'En la práctica', en: 'In practice' },
  read: { es: 'Leer la publicación', en: 'Read the article' },
  training: { es: 'Formación', en: 'Training' },
  program: { es: 'Ver el programa', en: 'View the program' },
  others: { es: 'Otras líneas de servicio', en: 'Other service lines' },
  formerly: { es: 'antes', en: 'formerly' },
} satisfies Record<string, Loc>
// H1 with the standard people search for, unless the name already says it.
const pageTitle = computed(() => {
  const name = tr(service.name)
  const kw = tr(service.keyword)
  return name.includes(kw) ? name : `${name} ${kw}`
})
const otherLines = (m: { name: Loc }) => (lang.value === 'en'
  ? `See ${tr(m.name).toLowerCase()} in other lines`
  : `Ver ${tr(m.name).toLowerCase()} en otras líneas`)
const courseFacts = computed(() => {
  if (!course) return ''
  const awards = course.awards.map(tr).join('; ')
  return lang.value === 'en'
    ? `${course.hours} hours, ${tr(course.mode).toLowerCase()}. Credentials: ${awards}.`
    : `${course.hours} horas, ${tr(course.mode).toLowerCase()}. Certifica: ${awards}.`
})
const bandTitle = computed(() => {
  const name = service.short.es === 'HSEQ' ? 'HSEQ' : tr(service.short).toLowerCase()
  return lang.value === 'en' ? `Request a proposal for ${name}` : `Solicite una propuesta en ${name}`
})

const related = cases.filter((c) => c.line === service.slug)
const course = courses.find((c) => c.line === service.slug)
const others = services.filter((s) => s.slug !== service.slug)

usePageSeo({ title: tr(service.seo.title), description: tr(service.seo.description) })
useServiceJsonLd(service, `/portafolio-de-servicios/${service.slug}`)
</script>

<template>
  <div v-if="service">
    <PageHeader
      :title="pageTitle"
      :crumb="tr(service.name)"
      :lede="tr(service.lede)"
      tone="azul"
      :crumbs="[{ label: tr(copy.services), to: '/portafolio-de-servicios' }]"
    >
      <UiButton :to="{ path: '/contacto', query: { linea: service.slug } }" variant="light">{{ tr(copy.proposal) }}</UiButton>
      <template #aside>
        <aside class="norms" aria-labelledby="normas">
          <h2 id="normas" class="norms__title">{{ tr(copy.frameworks) }}</h2>
          <ul>
            <li v-for="f in service.frameworks" :key="f.es">{{ tr(f) }}</li>
          </ul>
          <a :href="service.sourcePdf" class="link norms__pdf" target="_blank" rel="noopener">
            <Download aria-hidden="true" />{{ tr(copy.pdf) }}
          </a>
        </aside>
      </template>
    </PageHeader>

    <section class="section" aria-labelledby="alcance">
      <div class="frame grid-page detail">
        <div class="detail__context">
          <h2 id="alcance" class="subheading">{{ tr(copy.scope) }}</h2>
          <p class="lede">{{ tr(service.context) }}</p>
        </div>

        <nav class="jump" :aria-label="tr(copy.jump)">
          <a v-for="m in modes" :key="m.id" :href="`#${m.id}`" class="jump__link">
            {{ tr(m.name) }} <span class="jump__n">{{ countOffers(service, m.id) }}</span>
          </a>
        </nav>

        <div class="by-mode">
          <section v-for="m in modes" :id="m.id" :key="m.id" class="mode-block" :aria-labelledby="`${m.id}-t`">
            <header class="mode-block__head">
              <h3 :id="`${m.id}-t`" class="mode-block__title">{{ tr(m.name) }}</h3>
              <p class="muted">{{ tr(m.summary) }}</p>
              <NuxtLinkLocale :to="servicePath(m.id, service.slug)" class="link mode-block__link">
                {{ otherLines(m) }}
              </NuxtLinkLocale>
            </header>
            <OfferList :mode="m.id" :line="service.slug" :line-name="tr(service.name)" :groups="service.offers[m.id]" />
          </section>
        </div>
      </div>
    </section>

    <section class="section field-nube" aria-labelledby="beneficios">
      <div class="frame grid-page benefits">
        <h2 id="beneficios" class="heading benefits__title">{{ tr(copy.benefits) }}</h2>
        <ul class="benefits__list">
          <li v-for="b in service.benefits" :key="b.es">{{ tr(b) }}</li>
        </ul>
      </div>
    </section>

    <section v-if="related.length || course" class="section" aria-labelledby="evidencia">
      <div class="frame">
        <h2 id="evidencia" class="heading evidence__title">{{ tr(copy.practice) }}</h2>
        <div class="evidence">
          <article v-for="c in related" :key="c.title.es" class="ev">
            <div v-if="c.image" class="ev__ring">
              <BrandRing :src="c.image" :alt="c.imageAlt ? tr(c.imageAlt) : ''" sizes="200px" :gap="20" :dot="false" />
            </div>
            <p v-if="c.year || c.client" class="ev__meta">{{ [c.year, c.client].filter(Boolean).join(', ') }}</p>
            <h3 class="ev__title">{{ tr(c.title) }}</h3>
            <p v-if="c.detail" class="muted">{{ tr(c.detail) }}</p>
            <NuxtLinkLocale v-if="c.newsSlug" :to="`/actualidad/${c.newsSlug}`" class="link">{{ tr(copy.read) }}</NuxtLinkLocale>
          </article>
          <article v-if="course" class="ev ev--course">
            <p class="ev__meta">{{ tr(copy.training) }}</p>
            <h3 class="ev__title">{{ tr(course.name) }}</h3>
            <p class="muted">{{ courseFacts }}</p>
            <NuxtLinkLocale to="/cursos-y-formaciones" class="link">{{ tr(copy.program) }}</NuxtLinkLocale>
          </article>
        </div>
      </div>
    </section>

    <nav class="others field-nube" aria-labelledby="otras">
      <div class="frame">
        <h2 id="otras" class="others__title">{{ tr(copy.others) }}</h2>
        <ul class="others__list">
          <li v-for="o in others" :key="o.slug">
            <NuxtLinkLocale :to="`/portafolio-de-servicios/${o.slug}`">{{ tr(o.name) }}</NuxtLinkLocale>
          </li>
        </ul>
      </div>
    </nav>

    <ContactBand :title="bandTitle" />
  </div>
</template>

<style scoped>
.detail {
  row-gap: 3rem;
}

.detail__context {
  grid-column: 1 / -1;
}

.detail__context .lede {
  margin-top: 1rem;
}

.norms {
  padding: 1.5rem 1.75rem;
  border: 2px solid rgb(255 255 255 / 0.55);
  border-radius: var(--radius-control);
}

.norms__title {
  margin-bottom: 0.75rem;
  font-size: 1rem;
  letter-spacing: 0;
}

.norms ul {
  display: grid;
  font-weight: 600;
}

.norms li {
  padding-block: 0.5rem;
  border-bottom: 1px solid rgb(255 255 255 / 0.3);
}

.norms__pdf {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.norms__pdf svg {
  width: 1.125rem;
  height: 1.125rem;
}

.jump {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.jump__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.375rem 0.5rem 0.375rem 1rem;
  border: 2px solid var(--color-azul);
  border-radius: var(--radius-control);
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-azul);
  text-decoration: none;
}

.jump__link:hover {
  background: var(--color-azul);
  color: var(--color-blanco);
}

.jump__n {
  display: grid;
  place-items: center;
  min-width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--radius-full);
  background: var(--color-nube);
  font-size: 0.8125rem;
  color: var(--color-azul-hondo);
}

.by-mode {
  grid-column: 1 / -1;
  display: grid;
  gap: 3.5rem;
}

.mode-block {
  display: grid;
  gap: 1.5rem;
  padding-top: 1.75rem;
  border-top: 2px solid var(--color-azul);
  scroll-margin-top: calc(var(--header-offset) + 1.5rem);
}

.mode-block__title {
  font-size: var(--text-2xl);
  line-height: var(--text-2xl--line-height);
  color: var(--color-tinta);
}

.mode-block__head .muted {
  margin-block: 0.5rem 0.75rem;
  max-width: 26rem;
}

.mode-block__link {
  font-size: var(--text-sm);
}

.benefits {
  row-gap: 2rem;
}

.benefits__title,
.benefits__list {
  grid-column: 1 / -1;
}

.benefits__list {
  display: grid;
  grid-template-columns: minmax(0, 1fr); /* a long word wraps instead of widening the track */
  gap: 1.5rem;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
  font-weight: 600;
  letter-spacing: var(--tracking-snug);
}

.benefits__list li {
  padding-left: 1.25rem;
  border-left: 3px solid var(--color-azul-vivo);
}

/* One item per row, text always in the same column, so a case with a photo
   and the course without one line up. */
.evidence {
  display: grid;
  max-width: 56rem;
  margin-top: 2.5rem;
}

.ev {
  display: grid;
  align-content: start;
  gap: 0.75rem;
  padding-block: 2rem;
  border-top: 1px solid var(--color-linea);
}

.ev__ring {
  width: 8rem;
}

.ev__meta {
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.ev__title {
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
}

.ev .link {
  justify-self: start;
}

.others {
  padding-block: var(--spacing-section-sm);
}

.others__title {
  font-size: 1rem;
  letter-spacing: 0;
  color: var(--color-azul-hondo);
}

.others__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2rem;
  margin-top: 1rem;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
}

.others__list a {
  color: var(--color-azul);
  text-decoration: none;
}

.others__list a:hover {
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

@media (width >= 48rem) {
  /* Photo column only when there is a photo; otherwise the text keeps the left edge. */
  .ev:has(.ev__ring) {
    grid-template-columns: 8rem minmax(0, 1fr);
    column-gap: var(--spacing-gutter);
  }

  .ev:has(.ev__ring) > * {
    grid-column: 2;
  }

  .ev > .ev__ring {
    grid-column: 1;
    grid-row: 1 / span 4;
  }
}

@media (width >= 64rem) {
  .detail__context {
    grid-column: 1 / span 8;
  }

  .mode-block {
    grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
    column-gap: var(--spacing-gutter);
  }

  .mode-block__head {
    position: sticky;
    top: calc(var(--header-offset) + 1.5rem);
    align-self: start;
  }

  .benefits__title {
    grid-column: 1 / span 5;
  }

  .benefits__list {
    grid-column: 7 / -1;
  }
}
</style>
