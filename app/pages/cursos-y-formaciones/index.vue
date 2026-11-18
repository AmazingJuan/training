<script setup lang="ts">
import { courses } from '~/data/courses'
import { services, countOffers } from '~/data/services'

const { tr, lang } = useLang()
usePageSeo({
  title: tr({ es: 'Diplomados en gestión de activos ISO 55001 y sostenibilidad', en: 'Diplomas in ISO 55001 asset management and sustainability' }),
  description: tr({
    es: 'Diplomados virtuales en directo: gestión de activos con certificación de auditor líder ISO 55001 y sostenibilidad con auditor interno en huella de carbono.',
    en: 'Live online diplomas in Spanish: asset management with ISO 55001 lead auditor certification, and sustainability with carbon footprint auditor.',
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
  byLine: { es: 'Cursos por línea de servicio', en: 'Courses by service line' },
  diplomasLede: { es: 'Programas virtuales en directo, con la norma original incluida.', en: 'Live online programs, taught in Spanish, with an original copy of the standard included.' },
} satisfies Record<string, Loc>
useCoursesJsonLd(courses)

// Old links pointed at each program as an anchor on this page (#slug); each now has its own page.
const route = useRoute()
const { localePath } = useLang()
onMounted(() => {
  const slug = route.hash.slice(1)
  if (courses.some((c) => c.slug === slug)) navigateTo(localePath(`/cursos-y-formaciones/${slug}`), { replace: true })
})

// The courses themselves are listed once, in the training explorer; here, an
// index of the lines with how many courses each one offers.
const byLine = services.map((s) => ({ slug: s.slug, name: s.name, count: countOffers(s, 'formacion') }))
const viewCourses = (n: number) => (lang.value === 'en'
  ? (n === 1 ? 'View the course' : `View the ${n} courses`)
  : (n === 1 ? 'Ver el curso' : `Ver los ${n} cursos`))
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

    <HomeTraining :lede="tr(copy.diplomasLede)" />

    <section class="section field-azul" aria-labelledby="por-linea">
      <div class="frame">
        <h2 id="por-linea" class="heading">{{ tr(copy.byLine) }}</h2>
        <ul class="by-line">
          <li v-for="l in byLine" :key="l.slug">
            <NuxtLinkLocale :to="`/servicios/formacion/${l.slug}`" class="line">
              <span class="line__name">{{ tr(l.name) }}</span>
              <span class="line__more">{{ viewCourses(l.count) }}</span>
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.by-line {
  display: grid;
  gap: 1rem var(--spacing-gutter);
  margin-top: 2.5rem;
}

.line {
  display: grid;
  align-content: space-between;
  gap: 1rem;
  height: 100%;
  min-height: 7.5rem;
  padding-top: 1rem;
  border-top: 2px solid var(--color-blanco);
  color: inherit;
  text-decoration: none;
}

.line__name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  line-height: 1.3;
  font-weight: 600;
}

.line__more {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.line:hover .line__more {
  text-decoration-thickness: 2px;
}

@media (width >= 48rem) {
  .by-line { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (width >= 64rem) {
  .by-line { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>
