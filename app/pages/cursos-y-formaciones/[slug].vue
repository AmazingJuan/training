<script setup lang="ts">
import { Download } from '@lucide/vue'
import { courses } from '~/data/courses'

/**
 * One diploma program, on its own address: people search for each program by
 * name ("diplomado gestión de activos ISO 55001"), so each gets a page titled
 * the way it is searched, with every fact someone deciding to enrol needs.
 */
const route = useRoute()
const course = courses.find((c) => c.slug === route.params.slug)
const { tr, lang } = useLang()

if (!course) {
  throw createError({ statusCode: 404, statusMessage: tr({ es: 'Programa no encontrado', en: 'Program not found' }), fatal: true })
}

const copy = {
  training: { es: 'Formación', en: 'Training' },
  details: { es: 'Detalles del programa', en: 'Program details' },
  next: { es: 'Consultar más información', en: 'Request more information' },
  brochure: { es: 'Folleto de la edición 2025 (PDF)', en: '2025 edition brochure (PDF, in Spanish)' },
  duration: { es: 'Duración', en: 'Duration' },
  mode: { es: 'Modalidad', en: 'Format' },
  schedule: { es: 'Horario', en: 'Schedule' },
  awards: { es: 'Certificación', en: 'Certification' },
  material: { es: 'Material', en: 'Materials' },
  audience: { es: 'Dirigido a', en: 'Intended for' },
  noPrior: { es: 'No se requieren conocimientos previos en el tema.', en: 'No prior knowledge of the subject is required.' },
  content: { es: 'Contenido', en: 'Content' },
  band: { es: '¿Le interesa este diplomado?', en: 'Interested in this program?' },
  bandText: { es: 'Escríbanos o llámenos y le enviaremos las fechas de la próxima cohorte y las condiciones de inscripción.', en: 'Write or call us and we will send you the next cohort dates and enrolment terms.' },
} satisfies Record<string, Loc>
const hours = (h: number, n: number) => (lang.value === 'en' ? `${h} hours, ${n} sessions` : `${h} horas, ${n} sesiones`)
const audienceOf = (name: string) => (lang.value === 'en' ? `Who the ${name.toLowerCase()} is for` : `A quién se dirige el ${name.toLowerCase()}`)
const modulesOf = (name: string) => (lang.value === 'en' ? `Modules of the ${name.toLowerCase()}` : `Módulos del ${name.toLowerCase()}`)

usePageSeo({ title: tr(course.seo.title), description: tr(course.seo.description) })
useCoursesJsonLd([course])
</script>

<template>
  <div v-if="course">
    <PageHeader
      :title="tr(course.name)"
      :lede="tr(course.summary)"
      :crumbs="[{ label: tr(copy.training), to: '/cursos-y-formaciones' }]"
    >
      <UiEnrolment class="course__status" />
      <div class="course__actions">
        <UiButton :to="{ path: '/contacto', query: { asunto: 'formacion', programa: course.slug } }">{{ tr(copy.next) }}</UiButton>
        <a :href="course.brochure" class="link course__pdf" target="_blank" rel="noopener"><Download aria-hidden="true" />{{ tr(copy.brochure) }}</a>
      </div>
    </PageHeader>

    <section class="course section" :aria-label="tr(copy.details)">
      <div class="frame grid-page course__grid">
        <!-- Facts and audience: what someone deciding whether to enrol reads together. -->
        <div class="course__side">
          <dl class="facts">
            <div><dt>{{ tr(copy.duration) }}</dt><dd>{{ hours(course.hours, course.sessions) }}</dd></div>
            <div><dt>{{ tr(copy.mode) }}</dt><dd>{{ tr(course.mode) }}</dd></div>
            <div><dt>{{ tr(copy.schedule) }}</dt><dd>{{ tr(course.schedule) }}</dd></div>
            <div><dt>{{ tr(copy.awards) }}</dt><dd><ul><li v-for="a in course.awards" :key="a.es">{{ tr(a) }}</li></ul></dd></div>
            <div><dt>{{ tr(copy.material) }}</dt><dd>{{ tr(course.material) }}</dd></div>
          </dl>

          <section class="audience" :aria-label="audienceOf(tr(course.name))">
            <h3 class="subheading">{{ tr(copy.audience) }}</h3>
            <ul class="dot-list">
              <li v-for="a in course.audience" :key="a.es">{{ tr(a) }}</li>
            </ul>
            <p class="muted audience__note">{{ tr(copy.noPrior) }}</p>
          </section>
        </div>

        <section class="modules" :aria-label="modulesOf(tr(course.name))">
          <h3 class="subheading">{{ tr(copy.content) }}</h3>
          <ol class="modules__list">
            <li v-for="(m, n) in course.modules" :key="m.title.es" class="module">
              <span class="module__n" aria-hidden="true">{{ n + 1 }}</span>
              <div>
                <p class="module__title">{{ tr(m.title) }}</p>
                <p class="module__goal">{{ tr(m.goal) }}</p>
              </div>
            </li>
          </ol>
        </section>

      </div>
    </section>

    <ContactBand :title="tr(copy.band)" :text="tr(copy.bandText)" :action="tr(copy.next)" :to="{ path: '/contacto', query: { asunto: 'formacion', programa: course.slug } }" />
  </div>
</template>

<style scoped>
.course__grid {
  row-gap: 3rem;
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
  grid-template-columns: minmax(0, 6.5rem) minmax(0, 1fr);
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

.audience__note {
  margin-top: 1.25rem;
}

.course__head,
.course__side,
.modules {
  grid-column: 1 / -1;
}

.course__status {
  margin-bottom: 1.25rem;
}

@media (width >= 64rem) {
  .course__side { grid-column: 8 / -1; grid-row: 1; }
  .modules { grid-column: 1 / span 6; grid-row: 1; }
}

@media (width < 40rem) {
  .facts > div {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.25rem;
  }
}
</style>
