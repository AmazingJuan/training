<script setup lang="ts">
import { news, newsImageSizes } from '~/data/news'

const { tr, lang } = useLang()
const copy = {
  title: { es: 'Actualidad', en: 'News' },
  lede: { es: 'Proyectos, certificaciones y novedades desde 2020.', en: 'Projects, certifications and news since 2020.' },
} satisfies Record<string, Loc>
usePageSeo({
  title: tr(copy.title),
  description: tr({
    es: 'Proyectos, certificaciones y novedades de Training Corporation: auditorías ISO 55001, programas de formación, reconocimientos y sostenibilidad.',
    en: 'Training Corporation projects, certifications and news: ISO 55001 audits, training programs, recognitions and sustainability.',
  }),
})

const excerpt = (text: string) => (text.length > 180 ? `${text.slice(0, 177).replace(/\s+\S*$/, '')}…` : text)
const [first, ...rest] = news
</script>

<template>
  <div>
    <PageHeader :title="tr(copy.title)" :lede="tr(copy.lede)" />

    <div class="frame news">
      <article v-if="first" class="lead">
        <NuxtLinkLocale :to="`/actualidad/${first.slug}`" class="lead__link">
          <div v-if="first.image" class="lead__img">
            <NuxtImg format="webp" :src="first.image" :alt="first.imageAlt ? tr(first.imageAlt) : ''" :width="newsImageSizes[first.image]?.[0]" :height="newsImageSizes[first.image]?.[1]" sizes="xs:100vw sm:100vw lg:700px" />
          </div>
          <div class="lead__text">
            <time :datetime="first.date" class="date">{{ formatDate(first.date, lang) }}</time>
            <h2 class="subheading lead__title">{{ tr(first.title) }}</h2>
            <p class="muted">{{ excerpt(first.blocks[0] ? tr(first.blocks[0].text) : '') }}</p>
          </div>
        </NuxtLinkLocale>
      </article>

      <ol class="list">
        <li v-for="n in rest" :key="n.slug" class="item">
          <NuxtLinkLocale :to="`/actualidad/${n.slug}`" class="item__link">
            <time :datetime="n.date" class="date">{{ formatDate(n.date, lang) }}</time>
            <h2 class="item__title">{{ tr(n.title) }}</h2>
            <p class="muted item__excerpt">{{ excerpt(n.blocks[0] ? tr(n.blocks[0].text) : '') }}</p>
          </NuxtLinkLocale>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.news {
  padding-bottom: var(--spacing-section);
}

.lead__link,
.item__link {
  color: inherit;
  text-decoration: none;
}

.lead__link {
  display: grid;
  gap: 1.5rem;
  padding-block: 2rem 3rem;
  border-top: 2px solid var(--color-azul);
}

.lead__img {
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--color-nube);
}

.lead__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.lead__link:hover img {
  transform: scale(1.03);
}

.lead__title {
  margin-block: 0.75rem 1rem;
}

.lead__link:hover .lead__title,
.item__link:hover .item__title {
  color: var(--color-azul);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.date {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.list {
  display: grid;
}

.item__link {
  display: grid;
  gap: 0.5rem;
  padding-block: 1.75rem;
  border-top: 1px solid var(--color-linea);
}

.item__title {
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
}

.item__excerpt {
  max-width: var(--container-measure);
}

@media (width >= 64rem) {
  .lead__link {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    gap: var(--spacing-gutter);
    align-items: center;
  }

  .item__link {
    grid-template-columns: 12rem minmax(0, 5fr) minmax(0, 6fr);
    column-gap: var(--spacing-gutter);
    align-items: baseline;
  }
}
</style>
