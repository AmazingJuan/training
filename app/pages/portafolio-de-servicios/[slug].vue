<script setup lang="ts">
import { Download } from '@lucide/vue'
import { findService, services, modes, countOffers, servicePath, type ModeId } from '~/data/services'
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
  proposal: { es: 'Solicitar cotización', en: 'Request a quotation' },
  frameworks: { es: 'Marco normativo', en: 'Regulatory framework' },
  pdf: { es: 'Portafolio completo (PDF)', en: 'Full portfolio (PDF, in Spanish)' },
  scope: { es: 'Alcance', en: 'Scope' },
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
const viewAll = (m: { id: ModeId, name: Loc }) => {
  const n = countOffers(service, m.id)
  const unit = tr(m.name).toLowerCase()
  return lang.value === 'en'
    ? `View the ${n} ${unit} ${n === 1 ? 'service' : 'services'}`
    : `Ver ${n === 1 ? 'el servicio' : `los ${n} servicios`} de ${unit}`
}
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
      <UiButton :to="{ path: '/contacto', query: { asunto: 'cotizacion', linea: service.slug } }" variant="light">{{ tr(copy.proposal) }}</UiButton>
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

        <!-- The services themselves are listed once, in the explorer; here, one way into each unit. -->
        <ul class="units">
          <li v-for="m in modes" :id="m.id" :key="m.id" class="unit">
            <h3 class="unit__title">{{ tr(m.name) }}</h3>
            <p class="muted">{{ tr(m.summary) }}</p>
            <NuxtLinkLocale :to="servicePath(m.id, service.slug)" class="link unit__link">{{ viewAll(m) }}</NuxtLinkLocale>
          </li>
        </ul>
      </div>
    </section>

    <section class="section field-nube" aria-labelledby="beneficios">
      <div class="frame grid-page benefits">
        <h2 id="beneficios" class="heading benefits__title">{{ tr(copy.benefits) }}</h2>
        <ul class="benefits__list dot-list">
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
            <NuxtLinkLocale :to="`/cursos-y-formaciones/${course.slug}`" class="link">{{ tr(copy.program) }}</NuxtLinkLocale>
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

.units {
  grid-column: 1 / -1;
  display: grid;
  gap: 1.5rem var(--spacing-gutter);
}

.unit {
  display: grid;
  align-content: start;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--color-azul);
  scroll-margin-top: calc(var(--header-offset) + 1.5rem);
}

.unit__title {
  font-size: var(--text-2xl);
  line-height: var(--text-2xl--line-height);
  color: var(--color-tinta);
}

.unit__link {
  margin-top: 0.5rem;
  font-weight: 600;
}

@media (width >= 48rem) {
  .units {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
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
  /* Every item keeps the photo column, so all texts share one left edge. */
  .ev {
    grid-template-columns: 8rem minmax(0, 1fr);
    column-gap: var(--spacing-gutter);
  }

  .ev > * {
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

  .benefits__title {
    grid-column: 1 / span 5;
  }

  .benefits__list {
    grid-column: 7 / -1;
  }
}
</style>
