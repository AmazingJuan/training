<script setup lang="ts">
import { news, newsImageSizes } from '~/data/news'

/**
 * "Conozca nuestro acontecer" (Acta 6, 4 Nov 2026): the latest news, summarised.
 * The two most recent posts with a photo lead, side by side; the next most
 * recent follow as headlines. "Conocer más" opens the full News page.
 * Everything is read from the news data, so new posts appear here on their own.
 */
const { tr, lang } = useLang()

const pictured = news.filter((n) => n.image).slice(0, 2)
const headlines = news.filter((n) => !pictured.includes(n)).slice(0, 3)

const excerpt = (n: (typeof news)[number]) => {
  const text = n.blocks[0] ? tr(n.blocks[0].text) : ''
  return text.length > 170 ? `${text.slice(0, 167).replace(/[\s,;:]+\S*$/, '')}…` : text
}

const copy = {
  title: { es: 'Conozca nuestro acontecer', en: 'What we have been doing' },
  more: { es: 'Conocer más', en: 'Read more' },
  moreHidden: { es: ' noticias en Actualidad', en: ' news' },
} satisfies Record<string, Loc>
</script>

<template>
  <section class="news section field-nube" aria-labelledby="news-title">
    <div class="frame">
      <h2 id="news-title" class="heading news__title">{{ tr(copy.title) }}</h2>

      <div class="news__pictured">
        <article v-for="n in pictured" :key="n.slug" class="story">
          <NuxtLinkLocale :to="`/actualidad/${n.slug}`" class="story__link">
            <div class="story__img">
              <NuxtImg
                format="webp"
                :src="n.image!"
                :alt="n.imageAlt ? tr(n.imageAlt) : ''"
                :width="newsImageSizes[n.image!]?.[0]"
                :height="newsImageSizes[n.image!]?.[1]"
                sizes="xs:100vw md:50vw lg:600px"
                loading="lazy"
              />
            </div>
            <time :datetime="n.date" class="date">{{ formatDate(n.date, lang) }}</time>
            <h3 class="story__title">{{ tr(n.title) }}</h3>
            <p class="story__excerpt">{{ excerpt(n) }}</p>
          </NuxtLinkLocale>
        </article>
      </div>

      <ul class="news__headlines">
        <li v-for="n in headlines" :key="n.slug">
          <NuxtLinkLocale :to="`/actualidad/${n.slug}`" class="headline">
            <time :datetime="n.date" class="date">{{ formatDate(n.date, lang) }}</time>
            <span class="headline__title">{{ tr(n.title) }}</span>
          </NuxtLinkLocale>
        </li>
      </ul>

      <div class="news__more">
        <UiButton to="/actualidad" variant="outline">
          {{ tr(copy.more) }}<span class="visually-hidden">{{ tr(copy.moreHidden) }}</span>
        </UiButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news__title {
  max-width: 18ch;
}

.news__pictured {
  display: grid;
  gap: 2.5rem var(--spacing-gutter);
  margin-top: 2.5rem;
}

.story__link,
.headline {
  color: inherit;
  text-decoration: none;
}

.story__link {
  display: grid;
  align-content: start;
  gap: 0.625rem;
}

/* Photos sit square-cornered in the field, at one shared ratio so the pair aligns. */
.story__img {
  overflow: hidden;
  aspect-ratio: 3 / 2;
  margin-bottom: 0.625rem;
  background: var(--color-linea);
}

.story__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 35%;
  transition: transform var(--duration-slow) var(--ease-out);
}

.story__link:hover img {
  transform: scale(1.03);
}

.date {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.story__title {
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
  max-width: 28ch;
}

.story__excerpt {
  max-width: var(--container-measure);
  color: var(--color-pizarra);
}

.story__link:hover .story__title,
.headline:hover .headline__title {
  color: var(--color-azul);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.news__headlines {
  display: grid;
  margin-top: 3rem;
  border-top: 2px solid var(--color-azul);
}

.headline {
  display: grid;
  gap: 0.25rem;
  padding-block: 1.125rem;
  border-bottom: 1px solid var(--color-linea);
}

.headline__title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  line-height: 1.3;
  font-weight: 600;
  color: var(--color-tinta);
}

.news__more {
  margin-top: 2.5rem;
}

@media (width >= 48rem) {
  .news__pictured {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .headline {
    grid-template-columns: 11rem minmax(0, 1fr);
    column-gap: var(--spacing-gutter);
    align-items: baseline;
  }
}
</style>
