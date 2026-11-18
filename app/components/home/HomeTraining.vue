<script setup lang="ts">
import { Download } from '@lucide/vue'
import { courses } from '~/data/courses'

/** `lede` replaces the default intro where the page around it already says the rest. */
const props = defineProps<{ lede?: string }>()
const { tr, lang } = useLang()
const copy = {
  title: { es: 'Diplomados con certificación de auditor', en: 'Diploma programs with auditor certification' },
  lede: {
    es: 'Programas virtuales en directo, con la norma original incluida. Además, cada línea de servicio ofrece cursos de fundamentos y de formación de auditores internos.',
    en: 'Live online programs, taught in Spanish, with an original copy of the standard included. Each service line also offers foundation and internal auditor courses.',
  },
  duration: { es: 'Duración', en: 'Duration' },
  mode: { es: 'Modalidad', en: 'Format' },
  awards: { es: 'Certifica', en: 'Credentials' },
  next: { es: 'Consultar más información', en: 'Request more information' },
  program: { es: 'Ver el programa completo', en: 'View the full program' },
  brochure: { es: 'Folleto de la edición 2025 (PDF)', en: '2025 edition brochure (PDF, in Spanish)' },
} satisfies Record<string, Loc>
const hours = (h: number, n: number) => (lang.value === 'en' ? `${h} hours in ${n} sessions` : `${h} horas en ${n} sesiones`)
</script>

<template>
  <section class="training section" aria-labelledby="training-title">
    <div class="frame">
      <div class="training__head">
        <h2 id="training-title" class="heading">{{ tr(copy.title) }}</h2>
        <p class="lede muted training__lede">{{ props.lede ?? tr(copy.lede) }}</p>
      </div>

      <div class="training__list">
        <article v-for="c in courses" :key="c.slug" class="course">
          <h3 class="subheading course__name">
            <NuxtLinkLocale :to="`/cursos-y-formaciones/${c.slug}`" class="course__link">{{ tr(c.name) }}</NuxtLinkLocale>
          </h3>
          <UiEnrolment />
          <p class="course__summary">{{ tr(c.summary) }}</p>
          <dl class="course__facts">
            <div><dt>{{ tr(copy.duration) }}</dt><dd>{{ hours(c.hours, c.sessions) }}</dd></div>
            <div><dt>{{ tr(copy.mode) }}</dt><dd>{{ tr(c.mode) }}</dd></div>
            <div><dt>{{ tr(copy.awards) }}</dt><dd>{{ c.awards.map(tr).join('; ') }}</dd></div>
          </dl>
          <div class="course__actions">
            <UiButton :to="{ path: '/contacto', query: { asunto: 'formacion', programa: c.slug } }">{{ tr(copy.next) }}<span class="visually-hidden">: {{ tr(c.name) }}</span></UiButton>
            <NuxtLinkLocale :to="`/cursos-y-formaciones/${c.slug}`" class="link">{{ tr(copy.program) }}<span class="visually-hidden">: {{ tr(c.name) }}</span></NuxtLinkLocale>
            <a :href="c.brochure" class="link course__pdf" target="_blank" rel="noopener">
              <Download aria-hidden="true" />{{ tr(copy.brochure) }}<span class="visually-hidden">: {{ tr(c.name) }}</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.training__lede {
  margin-top: 1.25rem;
}

.training__list {
  display: grid;
  gap: 3rem;
  margin-top: 3.5rem;
}

.course {
  display: grid;
  align-content: start;
  gap: 1.25rem;
  padding-top: 1.75rem;
  border-top: 2px solid var(--color-azul);
}

.course__link {
  color: inherit;
  text-decoration: none;
}

.course__link:hover {
  color: var(--color-azul);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.course__summary {
  max-width: 36rem;
}

.course__facts {
  display: grid;
  gap: 0.75rem;
}

.course__facts div {
  display: grid;
  grid-template-columns: minmax(0, 8rem) minmax(0, 1fr);
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-linea);
}

.course__facts dt {
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.course__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: 0.5rem;
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

@media (width >= 64rem) {
  .training__head {
    max-width: 50rem;
  }

  .training__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: var(--spacing-gutter);
    row-gap: 1.25rem;
  }

  /* Both programmes share rows, down to each fact, so everything lines up. */
  .course {
    grid-row: span 7;
    grid-template-rows: subgrid;
  }

  .course__facts {
    grid-row: span 3;
    grid-template-rows: subgrid;
  }
}

/* Narrow screens or large text: label above its value. */
@media (width < 40rem) {
  .course__facts div {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.25rem;
  }
}
</style>
