<script setup lang="ts">
import { purpose, values, principles, agreements, sgiDocuments, presence } from '~/data/company'

const { tr, lang } = useLang()
usePageSeo({
  title: tr({ es: 'Quiénes somos', en: 'About us' }),
  description: tr({
    es: 'Propósito empresarial, presencia en 21 departamentos de Colombia y en Centroamérica, valores y principios de Training Corporation S.A.S.',
    en: 'Corporate purpose, presence in 21 Colombian departments and in Central America, values and principles of Training Corporation S.A.S.',
  }),
  image: '/images/fotos/edificio-colmena.jpg',
})

const presenceText = computed(() => {
  const countries = new Intl.ListFormat(langTag[lang.value], { type: 'conjunction' }).format(presence.countries.map((c) => tr(c.name)))
  return lang.value === 'en'
    ? `We have delivered services in ${presence.departments.length} Colombian departments and in ${countries}.`
    : `Hemos prestado servicios en ${presence.departments.length} departamentos de Colombia y en ${countries}.`
})

const reglamento = sgiDocuments.find((d) => d.title.es.startsWith('Reglamento'))!

const copy = {
  title: { es: 'Una empresa que transfiere conocimiento', en: 'A company that transfers knowledge' },
  lede: {
    es: 'Fortalecemos el crecimiento de las organizaciones mediante servicios de evaluación, formación, consultoría y asesoría, prestados por profesionales de alto desempeño.',
    en: 'We strengthen the growth of organizations through assessment, training, consulting and advisory services delivered by high-performing professionals.',
  },
  team: { es: 'Nuestro equipo', en: 'Our team' },
  sgi: { es: 'Sistema de Gestión Integrado', en: 'Integrated Management System' },
  photoAlt: { es: 'Fachada del Edificio Colmena, sede administrativa en Medellín', en: 'Façade of the Colmena building, our administrative offices in Medellín' },
  caption: { es: 'Sede administrativa: Edificio Colmena, El Poblado, Medellín.', en: 'Administrative offices: Colmena building, El Poblado, Medellín.' },
  video: { es: 'Video corporativo', en: 'Corporate video' },
  videoLede: { es: 'Training Corporation en poco más de tres minutos.', en: 'Training Corporation in just over three minutes (in Spanish).' },
  purpose: { es: 'Propósito empresarial hacia 2030', en: 'Corporate purpose toward 2030' },
  values: { es: 'Valores', en: 'Values' },
  principles: { es: 'Principios', en: 'Principles' },
  agreements: { es: 'Convenios', en: 'Agreements' },
  and: { es: ' y ', en: ' and ' },
  rules: { es: 'Reglamento', en: 'Regulations' },
  presence: { es: 'Presencia nacional e internacional', en: 'National and international presence' },
  map: { es: 'Ver el mapa de presencia', en: 'View the presence map' },
} satisfies Record<string, Loc>
</script>

<template>
  <div>
    <PageHeader
      :title="tr(copy.title)"
      :lede="tr(copy.lede)"
    >
      <div class="sub-nav">
        <UiButton to="/empresa/equipo" variant="outline">{{ tr(copy.team) }}</UiButton>
        <UiButton to="/empresa/sistema-de-gestion-integrado" variant="outline">{{ tr(copy.sgi) }}</UiButton>
      </div>
      <template #aside>
        <BrandRing
          src="/images/fotos/edificio-colmena.jpg"
          :alt="tr(copy.photoAlt)"
          focus="50% 40%"
          sizes="xs:80vw sm:420px"
          loading="eager"
        >
          <template #caption>{{ tr(copy.caption) }}</template>
        </BrandRing>
      </template>
    </PageHeader>

    <section class="section-sm" aria-labelledby="video">
      <div class="frame grid-page film">
        <div class="film__text">
          <h2 id="video" class="subheading">{{ tr(copy.video) }}</h2>
          <p class="film__lede">{{ tr(copy.videoLede) }}</p>
        </div>
        <CorporateVideo class="film__video" />
      </div>
    </section>

    <section class="section field-azul" aria-labelledby="proposito">
      <div class="frame grid-page purpose">
        <div class="purpose__text">
          <h2 id="proposito" class="heading">{{ tr(copy.purpose) }}</h2>
          <p class="lede purpose__lede">{{ tr(purpose.text) }}</p>
        </div>
        <ol class="purpose__list">
          <li v-for="g in purpose.guidelines" :key="g.es">{{ tr(g) }}</li>
        </ol>
      </div>
    </section>

    <!-- Presence in short; the map itself lives on the home page. -->
    <section class="section-sm field-nube" aria-labelledby="presencia-t">
      <div class="frame grid-page presence-sum">
        <h2 id="presencia-t" class="subheading presence-sum__title">{{ tr(copy.presence) }}</h2>
        <div class="presence-sum__text">
          <p class="lede">{{ presenceText }}</p>
          <NuxtLinkLocale :to="{ path: '/', hash: '#presencia' }" class="link">{{ tr(copy.map) }}</NuxtLinkLocale>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="valores">
      <div class="frame grid-page tenets">
        <div class="tenets__col">
          <h2 id="valores" class="heading">{{ tr(copy.values) }}</h2>
          <dl class="tenets__list">
            <div v-for="v in values" :key="v.name.es">
              <dt>{{ tr(v.name) }}</dt>
              <dd>{{ tr(v.text) }}</dd>
            </div>
          </dl>
        </div>
        <div class="tenets__col">
          <h2 class="heading">{{ tr(copy.principles) }}</h2>
          <dl class="tenets__list">
            <div v-for="p in principles" :key="p.name.es">
              <dt>{{ tr(p.name) }}</dt>
              <dd>{{ tr(p.text) }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="section-sm field-nube" aria-labelledby="convenios">
      <div class="frame grid-page agreements">
        <div class="agreements__col">
          <h2 id="convenios" class="subheading">{{ tr(copy.agreements) }}</h2>
          <p class="lede">{{ agreements.join(tr(copy.and)) }}.</p>
        </div>
        <div class="agreements__col">
          <h2 class="subheading">{{ tr(copy.rules) }}</h2>
          <UiDocLink :doc="reglamento" />
        </div>
      </div>
    </section>

    <ContactBand />
  </div>
</template>

<style scoped>
.film {
  row-gap: 1.25rem;
  align-items: end;
}

.film__text,
.film__video {
  grid-column: 1 / -1;
}

.film__lede {
  margin-top: 0.5rem;
  color: var(--color-pizarra);
}

@media (width >= 64rem) {
  .film__text {
    grid-column: 1 / span 3;
    align-self: start;
  }

  .film__video {
    grid-column: 4 / -1;
  }
}

.sub-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.purpose {
  row-gap: 3rem;
}

.purpose__text,
.purpose__list {
  grid-column: 1 / -1;
}

.purpose__lede {
  margin-top: 1.5rem;
}

.purpose__list {
  display: grid;
  gap: 0;
  counter-reset: g;
  border-top: 2px solid var(--color-blanco);
}

.purpose__list li {
  padding-block: 0.875rem;
  border-bottom: 1px solid rgb(255 255 255 / 0.4);
  font-weight: 600;
}

.tenets {
  row-gap: 4rem;
}

.tenets__col {
  grid-column: 1 / -1;
}

.tenets__col .heading {
  color: var(--color-tinta);
}

.tenets__list {
  display: grid;
  margin-top: 2rem;
}

.tenets__list > div {
  padding-block: 1.25rem;
  border-top: 1px solid var(--color-linea);
}

.tenets__list dt {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: var(--tracking-snug);
}

.tenets__list dd {
  margin-top: 0.375rem;
  color: var(--color-pizarra);
}

.section-sm {
  padding-block: var(--spacing-section-sm);
}

.agreements {
  row-gap: 2.5rem;
}

.agreements__col {
  grid-column: 1 / -1;
}

.agreements__col .lede,
.agreements__col :deep(.doc) {
  margin-top: 1rem;
}

.presence-sum {
  row-gap: 1.25rem;
}

.presence-sum__title,
.presence-sum__text {
  grid-column: 1 / -1;
}

.presence-sum__text .link {
  display: inline-block;
  margin-top: 1rem;
}

@media (width >= 64rem) {
  .presence-sum__title { grid-column: 1 / span 5; }
  .presence-sum__text { grid-column: 7 / -1; }
  .purpose__text { grid-column: 1 / span 6; }
  .purpose__list { grid-column: 8 / -1; }
  .tenets__col:first-child { grid-column: 1 / span 5; }
  .tenets__col:last-child { grid-column: 7 / -1; }

  /* Values and principles share rows (heading + four items each), so the
     rules between items line up across both columns. */
  .tenets { row-gap: 0; }

  .tenets__col {
    display: grid;
    /* Both columns on the same five rows, never placed one after the other. */
    grid-row: 1 / span 5;
    grid-template-rows: subgrid;
  }

  .tenets__list {
    grid-row: span 4;
    grid-template-rows: subgrid;
  }
  .agreements__col:first-child { grid-column: 1 / span 5; }
  .agreements__col:last-child { grid-column: 7 / -1; }
}
</style>
