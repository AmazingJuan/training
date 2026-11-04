<script setup lang="ts">
import { Download } from '@lucide/vue'
import { courses } from '~/data/courses'
import { services } from '~/data/services'

const { tr, lang } = useLang()
usePageSeo({
  title: tr({ es: 'Diplomados en gestión de activos ISO 55001 y sostenibilidad', en: 'Diplomas in ISO 55001 asset management and sustainability' }),
  description: tr({
    es: 'Diplomados virtuales en directo: gestión de activos con certificación de auditor líder ISO 55001 y sostenibilidad con auditor interno en huella de carbono.',
    en: 'Live online diploma programs (in Spanish): asset management with ISO 55001 lead auditor certification, and sustainability with carbon footprint internal auditor.',
  }),
})
const copy = {
  title: { es: 'Formación: diplomados y cursos', en: 'Training: diploma programs and courses' },
  lede: {
    es: 'Diplomados virtuales en directo, cursos de fundamentos y formación y calificación de auditores internos, en programación abierta o diseñados a la medida de su organización.',
    en: 'Live online diploma programs, foundation courses, and internal auditor training and qualification, open to all or tailored to your organization. Courses are taught in Spanish.',
  },
  photoAlt: { es: 'Participantes de un curso de formación de auditores posan en grupo', en: 'Participants in an auditor training course pose as a group' },
  caption: { es: 'Fundamentos y calificación de auditores en ISO 55001, Medellín, 2020.', en: 'ISO 55001 foundations and auditor qualification, Medellín, 2020.' },
  next: { es: 'Consultar la próxima cohorte', en: 'Ask about the next cohort' },
  brochure: { es: 'Folleto de la última edición (PDF)', en: 'Brochure of the latest edition (PDF, in Spanish)' },
  duration: { es: 'Duración', en: 'Duration' },
  mode: { es: 'Modalidad', en: 'Format' },
  schedule: { es: 'Horario', en: 'Schedule' },
  awards: { es: 'Certificación', en: 'Certification' },
  material: { es: 'Material', en: 'Materials' },
  last: { es: 'Última edición', en: 'Latest edition' },
  audience: { es: 'Dirigido a', en: 'Intended for' },
  noPrior: { es: 'No se requieren conocimientos previos en el tema.', en: 'No prior knowledge of the subject is required.' },
  content: { es: 'Contenido', en: 'Content' },
  byLine: { es: 'Formación en cada línea de servicio', en: 'Training in each service line' },
  byLineLede: { es: 'Cursos en programación abierta o diseñados para su organización, en modalidad presencial o virtual.', en: 'Open courses or courses designed for your organization, delivered on site or online.' },
} satisfies Record<string, Loc>
const hours = (h: number, n: number) => (lang.value === 'en' ? `${h} hours, ${n} sessions` : `${h} horas, ${n} sesiones`)
const audienceOf = (name: string) => (lang.value === 'en' ? `Who the ${name.toLowerCase()} is for` : `A quién se dirige el ${name.toLowerCase()}`)
const modulesOf = (name: string) => (lang.value === 'en' ? `Modules of the ${name.toLowerCase()}` : `Módulos del ${name.toLowerCase()}`)
useCoursesJsonLd(courses)

// Training offered inside each service line, straight from the portfolios.
const byLine = services.map((s) => ({ slug: s.slug, name: s.name, items: s.offers.formacion.flatMap((g) => g.items) }))
</script>

<template>
  <div>
    <PageHeader
      :title="tr(copy.title)"
      :lede="tr(copy.lede)"
    >
      <template #aside>
        <BrandRing
          src="/images/fotos/curso-auditores-iso-55001-2020.jpg"
          :alt="tr(copy.photoAlt)"
          focus="50% 40%"
          sizes="xs:80vw sm:420px"
          loading="eager"
        >
          <template #caption>{{ tr(copy.caption) }}</template>
        </BrandRing>
      </template>
    </PageHeader>

    <article v-for="(c, i) in courses" :id="c.slug" :key="c.slug" class="course section" :class="{ 'field-nube': i % 2 === 1 }">
      <div class="frame grid-page course__grid">
        <header class="course__head">
          <h2 class="subheading course__name">{{ tr(c.name) }}</h2>
          <p class="lede">{{ tr(c.summary) }}</p>
          <div class="course__actions">
            <UiButton :to="{ path: '/contacto', query: { asunto: 'formacion', programa: c.slug } }">{{ tr(copy.next) }}</UiButton>
            <a :href="c.brochure" class="link course__pdf" target="_blank" rel="noopener"><Download aria-hidden="true" />{{ tr(copy.brochure) }}</a>
          </div>
        </header>

        <!-- Facts and audience: what someone deciding whether to enrol reads together. -->
        <div class="course__side">
          <dl class="facts">
            <div><dt>{{ tr(copy.duration) }}</dt><dd>{{ hours(c.hours, c.sessions) }}</dd></div>
            <div><dt>{{ tr(copy.mode) }}</dt><dd>{{ tr(c.mode) }}</dd></div>
            <div><dt>{{ tr(copy.schedule) }}</dt><dd>{{ tr(c.schedule) }}</dd></div>
            <div><dt>{{ tr(copy.awards) }}</dt><dd><ul><li v-for="a in c.awards" :key="a.es">{{ tr(a) }}</li></ul></dd></div>
            <div><dt>{{ tr(copy.material) }}</dt><dd>{{ tr(c.material) }}</dd></div>
            <div><dt>{{ tr(copy.last) }}</dt><dd>{{ tr(c.lastCohort) }}</dd></div>
          </dl>

          <section class="audience" :aria-label="audienceOf(tr(c.name))">
            <h3 class="subheading">{{ tr(copy.audience) }}</h3>
            <ul>
              <li v-for="a in c.audience" :key="a.es">{{ tr(a) }}</li>
            </ul>
            <p class="muted audience__note">{{ tr(copy.noPrior) }}</p>
          </section>
        </div>

        <section class="modules" :aria-label="modulesOf(tr(c.name))">
          <h3 class="subheading">{{ tr(copy.content) }}</h3>
          <ol class="modules__list">
            <li v-for="(m, n) in c.modules" :key="m.title.es" class="module">
              <span class="module__n" aria-hidden="true">{{ n + 1 }}</span>
              <div>
                <p class="module__title">{{ tr(m.title) }}</p>
                <p class="module__goal">{{ tr(m.goal) }}</p>
              </div>
            </li>
          </ol>
        </section>

      </div>
    </article>

    <section class="section field-azul" aria-labelledby="por-linea">
      <div class="frame">
        <h2 id="por-linea" class="heading">{{ tr(copy.byLine) }}</h2>
        <p class="lede by-line__lede">{{ tr(copy.byLineLede) }}</p>
        <div class="by-line">
          <section v-for="l in byLine" :key="l.slug" class="by-line__col" :aria-label="tr(l.name)">
            <h3 class="by-line__name">
              <NuxtLinkLocale :to="`/servicios/formacion/${l.slug}`">{{ tr(l.name) }}</NuxtLinkLocale>
            </h3>
            <ul>
              <li v-for="it in l.items" :key="it.es">{{ tr(it) }}</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.course__grid {
  row-gap: 3rem;
}

.course__head,
.course__side,
.modules {
  grid-column: 1 / -1;
}

.course__side {
  display: grid;
  align-content: start;
  gap: 2.5rem;
}

.audience .subheading {
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
}

.course__name {
  max-width: 16ch;
  margin-bottom: 1.25rem;
  color: var(--color-tinta);
}

.course__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: 2rem;
}

.course__pdf {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.course__pdf svg {
  width: 1.125rem;
  height: 1.125rem;
}

.facts {
  display: grid;
  align-content: start;
  border-top: 2px solid var(--color-azul);
}

.facts > div {
  display: grid;
  grid-template-columns: minmax(0, 8.5rem) minmax(0, 1fr);
  gap: 1rem;
  padding-block: 0.875rem;
  border-bottom: 1px solid var(--color-linea);
}

.facts dt {
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.modules__list {
  display: grid;
  gap: 0;
  margin-top: 1.25rem;
}

.module {
  display: grid;
  grid-template-columns: 2.25rem 1fr;
  gap: 1.25rem;
  padding-block: 1rem;
  border-top: 1px solid var(--color-linea);
}

/* A solid disc: at this size an open ring reads as a loading spinner. */
.module__n {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-full);
  background: var(--color-azul);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-blanco);
}

.module__title {
  font-family: var(--font-display);
  font-weight: 600;
}

.module__goal {
  color: var(--color-pizarra);
}

.audience ul {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.audience li {
  padding-left: 1rem;
  border-left: 3px solid var(--color-azul-vivo);
}

.audience__note {
  margin-top: 1.25rem;
}

.by-line__lede {
  margin-top: 1rem;
}

.by-line {
  display: grid;
  gap: 2.5rem var(--spacing-gutter);
  margin-top: 3rem;
}

.by-line__col {
  padding-top: 1rem;
  border-top: 2px solid var(--color-blanco);
}

.by-line__name {
  font-size: var(--text-lg);
  line-height: 1.3;
}

.by-line__name a {
  color: inherit;
}

.by-line ul {
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
}

@media (width >= 48rem) {
  .by-line { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (width >= 64rem) {
  .course__head { grid-column: 1 / span 7; }
  .course__side { grid-column: 9 / -1; grid-row: 1 / span 2; }
  .modules { grid-column: 1 / span 7; }
  .by-line { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

/* Narrow screens or large text: label above its value. */
@media (width < 40rem) {
  .facts > div {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.25rem;
  }
}
</style>
