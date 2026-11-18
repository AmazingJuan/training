<script setup lang="ts">
import { courses } from '~/data/courses'
import { services } from '~/data/services'

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
  byLine: { es: 'Formación en cada línea de servicio', en: 'Training in each service line' },
  askLine: { es: 'Solicitar información', en: 'Request information' },
  byLineLede: { es: 'Cursos en programación abierta o diseñados para su organización, en modalidad presencial o virtual.', en: 'Open courses or courses designed for your organization, delivered on site or online.' },
} satisfies Record<string, Loc>
useCoursesJsonLd(courses)

// Old links pointed at each program as an anchor on this page (#slug); each now has its own page.
const route = useRoute()
const { localePath } = useLang()
onMounted(() => {
  const slug = route.hash.slice(1)
  if (courses.some((c) => c.slug === slug)) navigateTo(localePath(`/cursos-y-formaciones/${slug}`), { replace: true })
})

// Training offered inside each service line, straight from the portfolios.
// The diploma programs already have their own section above, so they are left out here.
const isDiploma = (it: Loc) => it.es.startsWith('Diplomado')
const byLine = services.map((s) => ({ slug: s.slug, name: s.name, items: s.offers.formacion.flatMap((g) => g.items).filter((it) => !isDiploma(it)) }))
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

    <HomeTraining />

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
            <NuxtLinkLocale :to="{ path: '/contacto', query: { asunto: 'formacion', linea: l.slug } }" class="link by-line__ask">
              {{ tr(copy.askLine) }}<span class="visually-hidden"> {{ tr(l.name) }}</span>
            </NuxtLinkLocale>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.by-line__lede {
  margin-top: 1rem;
}

.by-line {
  display: grid;
  gap: 2.5rem var(--spacing-gutter);
  margin-top: 3rem;
}

.by-line__col {
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  border-top: 2px solid var(--color-blanco);
}

/* Each line ends in its own next step, aligned at the foot of the column. */
.by-line__ask {
  margin-top: auto;
  padding-top: 1.25rem;
  align-self: flex-start;
  font-weight: 600;
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
  .by-line { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

/* Narrow screens or large text: label above its value. */
</style>
