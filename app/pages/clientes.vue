<script setup lang="ts">
import { sectors, clientsIn } from '~/data/clients'

const { tr, lang } = useLang()
usePageSeo({
  title: tr({ es: 'Clientes', en: 'Clients' }),
  description: tr({
    es: 'Organizaciones que han confiado en nuestro trabajo: empresas de energía y servicios públicos, gobierno, educación, industria y laboratorios, en Colombia y Centroamérica.',
    en: 'Organizations that have trusted our work: energy and utility companies, government, education, industry and laboratories, in Colombia and Central America.',
  }),
})

// Duplicates across sectors (EPM, CENS appear under laboratories too) are kept, as on the source page.
const groups = sectors.map((s) => ({ ...s, clients: clientsIn(s.id) })).filter((g) => g.clients.length)
const total = new Set(groups.flatMap((g) => g.clients.map((c) => c.name))).size

const copy = {
  title: { es: 'Clientes que han confiado en nuestro trabajo', en: 'Clients who have trusted our work' },
  sectors: { es: 'Sectores', en: 'Sectors' },
  formerly: { es: 'antes', en: 'formerly' },
} satisfies Record<string, Loc>
const lede = computed(() => (lang.value === 'en'
  ? `${total} organizations in ${groups.length} sectors. Most of our experience is in the Colombian electricity sector.`
  : `${total} organizaciones en ${groups.length} sectores. La mayor parte de nuestra experiencia se concentra en el sector eléctrico colombiano.`))
const alt = (c: { name: string, fullName?: string, formerly?: string }) =>
  [c.fullName ? `${c.name}, ${c.fullName}` : c.name, c.formerly && `(${tr(copy.formerly)} ${c.formerly})`].filter(Boolean).join(' ')
</script>

<template>
  <div>
    <PageHeader
      :title="tr(copy.title)"
      :lede="lede"
    />

    <nav class="jump" :aria-label="tr(copy.sectors)">
      <div class="frame">
        <ul class="jump__list">
          <li v-for="g in groups" :key="g.id">
            <a :href="`#${g.id}`">{{ tr(g.name) }} <span>{{ g.clients.length }}</span></a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="frame sectors">
      <section v-for="g in groups" :id="g.id" :key="g.id" class="sector" :class="{ 'sector--lead': g.id === 'energia' }" :aria-labelledby="`${g.id}-t`">
        <h2 :id="`${g.id}-t`" class="sector__title">{{ tr(g.name) }}</h2>
        <ul class="logos">
          <li v-for="c in g.clients" :key="c.name" class="logo">
            <NuxtImg v-if="c.logo" format="webp" :src="c.logo" :alt="alt(c)" sizes="160px" loading="lazy" class="logo__img" />
            <span v-else class="logo__name"><strong>{{ c.name }}</strong><span v-if="c.fullName">{{ c.fullName }}</span></span>
          </li>
        </ul>
      </section>
    </div>

    <ContactBand />
  </div>
</template>

<style scoped>
.jump {
  position: sticky;
  top: var(--header-offset);
  z-index: 10;
  background: var(--color-blanco);
  border-block: 1px solid var(--color-linea);
}

.jump__list {
  display: flex;
  gap: 0.25rem 1.5rem;
  padding-block: 0.75rem;
}

/* Phones: one row to swipe, no scrollbar; the faded right edge shows there is more. */
@media (width < 64rem) {
  .jump__list {
    overflow-x: auto;
    scrollbar-width: none;
    mask-image: linear-gradient(to right, #000 calc(100% - 2.5rem), transparent);
    padding-right: 2.5rem;
  }

  .jump__list::-webkit-scrollbar {
    display: none;
  }
}

/* Desktop: every sector visible, in as many rows as needed. */
@media (width >= 64rem) {
  .jump__list {
    flex-wrap: wrap;
  }
}

.jump__list a {
  display: inline-block;
  padding-block: 0.375rem;
  white-space: nowrap;
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-tinta);
  text-decoration: none;
}

.jump__list a:hover {
  color: var(--color-azul);
}

.jump__list span {
  margin-left: 0.25rem;
  color: var(--color-pizarra);
  font-weight: 600;
}

.sectors {
  padding-block: var(--spacing-section-sm) var(--spacing-section);
}

.sector {
  padding-block: 2.5rem;
  border-top: 1px solid var(--color-linea);
  scroll-margin-top: calc(var(--header-offset) + 4rem);
}

.sector--lead {
  border-top: 2px solid var(--color-azul);
}

.sector__title {
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
  color: var(--color-tinta);
}

.sector--lead .sector__title {
  font-size: var(--text-2xl);
}

.logos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6.25rem, 1fr));
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.logo {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  padding: 0.75rem;
  background: var(--color-blanco);
  border: 1px solid var(--color-linea);
  border-radius: var(--radius-control);
}

.logo__name {
  display: grid;
  gap: 0.125rem;
  text-align: center;
  font-size: 0.8125rem;
  line-height: 1.25;
  color: var(--color-pizarra);
}

.logo__name strong {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 800;
  color: var(--color-tinta);
}

.logo__img {
  /* Out of flow, so tall source images never stretch their row. */
  position: absolute;
  inset: 0.75rem;
  width: calc(100% - 1.5rem);
  height: calc(100% - 1.5rem);
  object-fit: contain;
  mix-blend-mode: multiply;
}

/* Desktop: sector name on the left, logos on the right, so sectors with one
   or two clients don't leave a whole empty row. */
@media (width >= 64rem) {
  .sector {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 9fr);
    column-gap: var(--spacing-gutter);
    align-items: start;
  }

  .sector--lead .sector__title {
    font-size: var(--text-xl);
  }

  .logos {
    grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
    margin-top: 0;
  }
}
</style>
