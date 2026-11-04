<script setup lang="ts">
import { cases } from '~/data/company'
import { services } from '~/data/services'

/**
 * Selected projects. The documented one (with year, scope and its own news post)
 * leads with its photo; the rest are grouped by service line, showing only what
 * the company has stated: client, when named, and what was done.
 */
const { tr } = useLang()

const featured = cases.filter((c) => c.detail)
const others = cases.filter((c) => !c.detail)
const lineName = (slug: string) => {
  const line = services.find((s) => s.slug === slug)
  return line ? tr(line.name) : ''
}

const copy = {
  title: { es: 'Experiencia destacada', en: 'Selected experience' },
  lede: {
    es: 'Proyectos de auditoría, consultoría y formación realizados para organizaciones del sector eléctrico, la industria y los laboratorios.',
    en: 'Auditing, consulting and training projects for organizations in the electricity sector, industry and laboratories.',
  },
  formerly: { es: 'antes', en: 'formerly' },
  read: { es: 'Leer la publicación', en: 'Read the article' },
  about: { es: 'sobre', en: 'about' },
  more: { es: 'Otros proyectos', en: 'Other projects' },
} satisfies Record<string, Loc>
</script>

<template>
  <section class="cases section field-nube" aria-labelledby="cases-title">
    <div class="frame">
      <div class="cases__head">
        <h2 id="cases-title" class="heading">{{ tr(copy.title) }}</h2>
        <p class="lede muted cases__lede">{{ tr(copy.lede) }}</p>
      </div>

      <article v-for="c in featured" :key="c.client" class="lead-case">
        <div v-if="c.image" class="lead-case__photo">
          <BrandRing :src="c.image" :alt="c.imageAlt ? tr(c.imageAlt) : ''" sizes="xs:60vw md:280px" :gap="18" />
        </div>
        <div class="lead-case__text">
          <p class="lead-case__client">
            {{ c.client }}<span v-if="c.formerly" class="lead-case__formerly"> ({{ tr(copy.formerly) }} {{ c.formerly }})</span><template v-if="c.year">, {{ c.year }}</template>
          </p>
          <h3 class="lead-case__title">{{ tr(c.title) }}</h3>
          <p v-if="c.detail" class="lead-case__detail">{{ tr(c.detail) }}</p>
          <NuxtLinkLocale v-if="c.newsSlug" :to="`/actualidad/${c.newsSlug}`" class="link">
            {{ tr(copy.read) }}<span class="visually-hidden"> {{ tr(copy.about) }} {{ c.client }}</span>
          </NuxtLinkLocale>
        </div>
      </article>

      <div v-if="others.length" class="more">
        <h3 class="more__title">{{ tr(copy.more) }}</h3>
        <!-- One even grid; each project names its service line. -->
        <ul class="more__list">
          <li v-for="c in others" :key="c.title.es" class="item">
            <NuxtLinkLocale :to="`/portafolio-de-servicios/${c.line}`" class="item__line">{{ lineName(c.line) }}</NuxtLinkLocale>
            <span class="item__title">{{ tr(c.title) }}</span>
            <span v-if="c.client" class="item__client">{{ c.client }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cases__head {
  max-width: 44rem;
}

.cases__lede {
  margin-top: 1.25rem;
}

/* The documented project: photo in the ring, the record beside it. */
.lead-case {
  display: grid;
  gap: 1.5rem;
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 2px solid var(--color-azul);
}

.lead-case__photo {
  width: min(60vw, 15rem);
}

.lead-case__client {
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.lead-case__formerly {
  font-weight: 400;
  color: var(--color-pizarra);
}

.lead-case__title {
  margin-top: 0.5rem;
  font-size: var(--text-2xl);
  line-height: var(--text-2xl--line-height);
  max-width: 24ch;
}

.lead-case__detail {
  max-width: var(--container-measure);
  margin-block: 1rem;
  color: var(--color-pizarra);
}

/* The other projects: an index by service line. */
.more {
  margin-top: 3.5rem;
}

.more__title {
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
}

.more__list {
  display: grid;
  gap: 0 var(--spacing-gutter);
  margin-top: 1.25rem;
}

.item {
  display: grid;
  align-content: start;
  gap: 0.25rem;
  padding-block: 1.25rem;
  border-top: 1px solid var(--color-linea);
}

.item__line {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-azul-hondo);
  text-decoration: none;
}

.item__line:hover {
  text-decoration: underline;
}

.item__title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  line-height: 1.3;
  font-weight: 600;
  color: var(--color-tinta);
}

.item__client {
  color: var(--color-pizarra);
}

@media (width >= 48rem) {
  .more__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width >= 64rem) {
  .lead-case {
    grid-template-columns: 17rem minmax(0, 1fr);
    column-gap: var(--spacing-gutter);
    align-items: center;
  }

  .lead-case__photo {
    width: 15rem;
  }

  .more__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
