<script setup lang="ts">
import { network, team } from '~/data/company'

const { tr } = useLang()
const copy = {
  title: { es: 'Nuestro equipo', en: 'Our team' },
  lede: {
    es: 'Auditores líderes con certificación internacional, formadores y profesionales que atienden directamente a cada organización cliente.',
    en: 'Internationally certified lead auditors, trainers and professionals who work directly with each client organization.',
  },
  company: { es: 'Nosotros', en: 'About us' },
  portrait: { es: 'Retrato de', en: 'Portrait of' },
  creds: { es: 'Formación y certificaciones de', en: 'Education and certifications of' },
  band: { es: 'Comuníquese directamente con nuestro equipo', en: 'Get in touch with our team directly' },
  staff: { es: 'Equipo de planta', en: 'Staff' },
  network: { es: 'Red de profesionales', en: 'Professional network' },
  member: { es: 'Profesional de la red', en: 'Network professional' },
} satisfies Record<string, Loc>
usePageSeo({
  title: tr(copy.title),
  description: tr({
    es: 'El equipo de Training Corporation: gerencia, asesoría experta, dirección administrativa y financiera, aseguramiento del modelo de gestión, gestión del conocimiento e innovación.',
    en: 'The Training Corporation team: management, senior advisory, administration and finance, management model assurance, knowledge management and innovation.',
  }),
  image: '/images/equipo/nancy-rodriguez.jpg',
})
</script>

<template>
  <div>
    <PageHeader
      :title="tr(copy.title)"
      :lede="tr(copy.lede)"
      :crumbs="[{ label: tr(copy.company), to: '/empresa' }]"
    />

    <section class="frame people" aria-labelledby="staff-title">
      <h2 id="staff-title" class="people__title">{{ tr(copy.staff) }}</h2>
      <article v-for="(p, i) in team" :id="p.slug" :key="p.slug" class="person" :class="{ 'person--lead': i === 0 }">
        <div class="person__ring">
          <BrandRing
            :src="p.photo"
            :alt="`${tr(copy.portrait)} ${p.name}`"
            focus="50% 50%"
            sizes="xs:60vw sm:280px"
            :loading="i < 2 ? 'eager' : 'lazy'"
          />
        </div>
        <div class="person__text">
          <h3 class="person__name">{{ p.name }}</h3>
          <p class="person__role">{{ tr(p.role) }}</p>
          <p class="person__statement">{{ tr(p.profile) }}</p>
          <ul v-if="p.credentials" class="person__creds" :aria-label="`${tr(copy.creds)} ${p.name}`">
            <li v-for="c in p.credentials" :key="c.es">{{ tr(c) }}</li>
          </ul>
        </div>
      </article>
    </section>

    <!-- Contractors: a section of their own, so they are never mistaken for staff. -->
    <section id="red" class="network section field-nube" aria-labelledby="network-title">
      <div class="frame grid-page network__grid">
        <h2 id="network-title" class="heading network__title">{{ tr(copy.network) }}</h2>
        <div class="network__words">
          <p class="network__statement">{{ tr(network.statement) }}</p>
          <p class="network__profiles">{{ tr(network.profiles) }}</p>
        </div>
        <ul v-if="network.members.length" class="network__members">
          <li v-for="p in network.members" :id="p.slug" :key="p.slug" class="member">
            <div class="member__ring">
              <BrandRing :src="p.photo" :alt="`${tr(copy.portrait)} ${p.name}`" focus="50% 50%" sizes="xs:40vw sm:200px" :dot="false" />
            </div>
            <h3 class="member__name">{{ p.name }}</h3>
            <p class="member__role">{{ tr(p.role) }}</p>
            <p class="member__tag">{{ tr(copy.member) }}</p>
          </li>
        </ul>
      </div>
    </section>

    <ContactBand :title="tr(copy.band)" />
  </div>
</template>

<style scoped>
.people {
  display: grid;
  padding-bottom: var(--spacing-section);
}

.people__title {
  margin-bottom: 1.5rem;
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
  color: var(--color-azul-hondo);
}

.person {
  display: grid;
  gap: 1.5rem;
  padding-block: 2.5rem;
  border-top: 1px solid var(--color-linea);
  scroll-margin-top: calc(var(--header-offset) + 1rem);
}

.person--lead {
  border-top: 2px solid var(--color-azul);
}

.person__ring {
  width: min(14rem, 60%);
}

.person__name {
  font-size: var(--text-2xl);
  line-height: var(--text-2xl--line-height);
}

.person__role {
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--color-azul);
}

.person__statement {
  max-width: var(--container-measure);
  margin-top: 1.25rem;
  font-size: var(--text-lg);
  line-height: var(--text-lg--line-height);
}

.person__creds {
  display: grid;
  gap: 0.375rem;
  margin-top: 1.25rem;
  padding-left: 1rem;
  border-left: 3px solid var(--color-azul-vivo);
  color: var(--color-pizarra);
}

/* Every person on the same grid: photo column, then text, always on the same
   edges (staggered photos read as misalignment). */
@media (width >= 48rem) {
  .person {
    grid-template-columns: 14rem minmax(0, 1fr);
    column-gap: clamp(2rem, 4vw, 4rem);
    /* Photo and name start on the same line, however long the statement. */
    align-items: start;
  }

  .person__ring {
    width: 100%;
  }
}

@media (width >= 64rem) {
  .person {
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}

.network__grid {
  row-gap: 1.5rem;
}

.network__title,
.network__words,
.network__members {
  grid-column: 1 / -1;
}

/* The client's own sentence carries the section, at display size. */
.network__statement {
  max-width: 34ch;
  font-family: var(--font-display);
  font-size: clamp(1.375rem, 1.1rem + 1.1vw, 2rem);
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: var(--tracking-snug);
  color: var(--color-tinta);
  text-wrap: pretty;
}

.network__profiles {
  max-width: var(--container-measure);
  margin-top: 1.5rem;
  font-size: var(--text-lg);
  line-height: var(--text-lg--line-height);
  color: var(--color-pizarra);
}

.network__members {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 1.25rem;
  margin-top: 1.5rem;
}

.member__ring {
  margin-bottom: 0.75rem;
}

.member__name {
  font-size: var(--text-base);
  line-height: 1.25;
}

.member__role {
  font-size: var(--text-sm);
  color: var(--color-pizarra);
}

.member__tag {
  margin-top: 0.25rem;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-azul-hondo);
}

@media (width >= 48rem) {
  .network__members {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (width >= 64rem) {
  .network__title {
    grid-column: 1 / span 4;
  }

  .network__words {
    grid-column: 5 / -1;
  }
}
</style>
