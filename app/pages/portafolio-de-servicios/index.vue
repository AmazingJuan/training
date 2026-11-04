<script setup lang="ts">
import { modes, services, countOffers, servicePath } from '~/data/services'
import { company } from '~/data/company'

const { tr, lang } = useLang()
usePageSeo({
  title: tr({ es: 'Servicios de auditoría, consultoría y formación ISO', en: 'ISO auditing, consulting and training services' }),
  description: tr({
    es: 'Auditoría, consultoría y formación en HSEQ, gestión de activos ISO 55001, servicios regulatorios del sector eléctrico, seguridad de la información y laboratorios.',
    en: 'Auditing, consulting and training in HSEQ, ISO 55001 asset management, electricity sector regulatory services, information security and laboratories.',
  }),
})
const copy = {
  title: { es: '¿Qué necesita su organización?', en: 'What does your organization need?' },
  crumb: { es: 'Servicios', en: 'Services' },
  search: { es: 'Buscar un servicio', en: 'Search for a service' },
  byMode: { es: 'Consulte por tipo de servicio', en: 'Browse by type of service' },
  byLine: { es: 'O por línea de servicio', en: 'Or by service line' },
  byType: { es: 'por tipo de servicio', en: 'by type of service' },
  bandTitle: { es: '¿No sabe por dónde empezar?', en: 'Not sure where to start?' },
  bandText: { es: 'Indíquenos el requisito, la norma o la auditoría que debe atender y le orientaremos.', en: 'Tell us the requirement, standard or audit you need to address and we will advise you.' },
} satisfies Record<string, Loc>
const totalLabel = (n: number) => (lang.value === 'en' ? `${n} services across ${services.length} lines` : `${n} servicios en ${services.length} líneas`)

const modeCards = modes.map((m) => ({
  ...m,
  total: services.reduce((n, s) => n + countOffers(s, m.id), 0),
}))
</script>

<template>
  <div>
    <PageHeader :title="tr(copy.title)" :crumb="tr(copy.crumb)" :lede="tr(company.method)" />

    <section id="buscar" class="frame find" :aria-label="tr(copy.search)">
      <ServiceSearch />
    </section>

    <section class="frame choose" aria-labelledby="por-unidad">
      <h2 id="por-unidad" class="subheading choose__title">{{ tr(copy.byMode) }}</h2>
      <ul class="modes">
        <li v-for="m in modeCards" :key="m.id">
          <NuxtLinkLocale :to="servicePath(m.id)" class="mode">
            <span class="mode__name">{{ tr(m.name) }}</span>
            <span class="mode__summary">{{ tr(m.summary) }}</span>
            <span class="mode__count">{{ totalLabel(m.total) }}</span>
          </NuxtLinkLocale>
        </li>
      </ul>
    </section>

    <section class="section-list" aria-labelledby="por-linea">
      <div class="frame">
        <h2 id="por-linea" class="subheading choose__title">{{ tr(copy.byLine) }}</h2>
        <article v-for="s in services" :key="s.slug" class="svc">
          <div class="svc__head">
            <h3 class="svc__name">
              <NuxtLinkLocale :to="`/portafolio-de-servicios/${s.slug}`">{{ tr(s.name) }}</NuxtLinkLocale>
            </h3>
            <p class="svc__lede">{{ tr(s.lede) }}</p>
          </div>
          <ul class="svc__modes" :aria-label="`${tr(s.name)} ${tr(copy.byType)}`">
            <li v-for="m in modes" :key="m.id">
              <NuxtLinkLocale :to="servicePath(m.id, s.slug)" class="svc__mode">
                <span>{{ tr(m.name) }}</span>
                <span class="svc__n">{{ countOffers(s, m.id) }}</span>
              </NuxtLinkLocale>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <ContactBand :title="tr(copy.bandTitle)" :text="tr(copy.bandText)" />
  </div>
</template>

<style scoped>
.find {
  padding-bottom: var(--spacing-section-sm);
}

.find > * {
  max-width: 52rem;
}

.choose {
  padding-bottom: var(--spacing-section-sm);
}

.choose__title {
  margin-bottom: 1.5rem;
  font-size: var(--text-xl);
  color: var(--color-pizarra);
}

.modes {
  display: grid;
  gap: 1rem;
}

.modes > li {
  min-width: 0;
}

.mode {
  display: flex;
  min-width: 0;
  overflow-wrap: break-word;
  hyphens: auto;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  padding: 2rem 1.75rem 1.75rem;
  border-radius: 12px;
  background: var(--color-azul);
  color: var(--color-blanco);
  text-decoration: none;
  overflow: hidden;
  transition: background-color var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out);
}

.mode:hover {
  background: var(--color-azul-hondo);
  transform: translateY(-3px);
}

.mode__name {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  line-height: var(--text-3xl--line-height);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
}

.mode__summary {
  max-width: 22rem;
}

/* Pinned to the bottom so the three cards' links line up. */
.mode__count {
  margin-top: auto;
  padding-top: 0.75rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.section-list {
  padding-bottom: var(--spacing-section);
}

.svc {
  display: grid;
  gap: 1.25rem;
  padding-block: 1.75rem;
  border-top: 1px solid var(--color-linea);
}

.svc__name {
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
}

.svc__name a {
  color: var(--color-azul);
  text-decoration: none;
}

.svc__name a:hover {
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.svc__lede {
  margin-top: 0.5rem;
  max-width: 34rem;
  color: var(--color-pizarra);
}

.svc__modes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.svc__mode {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  min-height: 2.75rem;
  padding: 0.375rem 0.5rem 0.375rem 1rem;
  border: 2px solid var(--color-linea);
  border-radius: var(--radius-control);
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-tinta);
  text-decoration: none;
  transition: border-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
}

.svc__mode:hover {
  border-color: var(--color-azul);
  color: var(--color-azul);
}

/* Phones: the three units side by side, not three full-width rows per line. */
@media (width < 40rem) {
  .svc__modes {
    display: grid;
    /* Three across when they fit; fewer with large text or a very narrow screen. */
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 6.75rem), 1fr));
  }

  .svc__mode {
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 0.25rem;
    min-width: 0;
    padding-inline: 0.625rem 0.375rem;
    font-size: 0.875rem;
  }
}

.svc__n {
  display: grid;
  place-items: center;
  min-width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--radius-full);
  background: var(--color-nube);
  font-size: 0.8125rem;
  color: var(--color-azul-hondo);
}

@media (width >= 48rem) {
  .modes {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (width >= 64rem) {
  .svc {
    grid-template-columns: minmax(0, 6fr) minmax(0, 6fr);
    column-gap: var(--spacing-gutter);
    align-items: center;
  }

  .svc__modes {
    justify-content: flex-end;
  }
}
</style>
