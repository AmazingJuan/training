<script setup lang="ts">
import { clientsIn, sectors } from '~/data/clients'

// The power-sector client list is the company's clearest differentiator:
// shown as type, not as a logo carousel.
const utilities = clientsIn('energia').map((c) => c.name)
const { tr, lang } = useLang()
const copy = {
  lede: {
    es: 'Operadores de red, generadores, transmisores y el operador del mercado. Para estas empresas realizamos las verificaciones que exige la CREG, auditorías bajo ISO 55001 y la formación de sus equipos en calidad del servicio.',
    en: 'Network operators, generators, transmission companies and the market operator. For these companies we carry out the verifications required by CREG, audits under ISO 55001 and the training of their teams in quality of service.',
  },
  list: { es: 'Empresas del sector eléctrico', en: 'Electricity sector companies' },
} satisfies Record<string, Loc>
const title = computed(() => (lang.value === 'en'
  ? `${utilities.length} energy companies have worked with us`
  : `${utilities.length} empresas de energía han confiado en nosotros`))
const more = computed(() => (lang.value === 'en'
  ? `View our clients in all ${sectors.length} sectors`
  : `Consultar los clientes de los ${sectors.length} sectores`))
</script>

<template>
  <section class="sector section" aria-labelledby="sector-title">
    <div class="frame grid-page sector__grid">
      <div class="sector__intro">
        <h2 id="sector-title" class="heading">{{ title }}</h2>
        <p class="lede muted sector__lede">{{ tr(copy.lede) }}</p>
      </div>

      <ul class="sector__names" :aria-label="tr(copy.list)">
        <li v-for="name in utilities" :key="name">{{ name }}</li>
      </ul>

      <p class="sector__more">
        <NuxtLinkLocale to="/clientes" class="link">{{ more }}</NuxtLinkLocale>
      </p>
    </div>
  </section>
</template>

<style scoped>
.sector__grid {
  row-gap: 2.5rem;
}

.sector__intro,
.sector__names,
.sector__more {
  grid-column: 1 / -1;
}

.sector__intro .heading {
  max-width: 18ch;
}

.sector__lede {
  margin-top: 1.5rem;
}

.sector__names {
  --sep: 1.4em;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35em 0;
  /* Each name starts with a dot; the list is pulled left by one dot's width
     and that strip is clipped, so no line begins or ends with a stray dot. */
  margin-left: calc(var(--sep) * -1);
  clip-path: inset(0 0 0 var(--sep));
  font-family: var(--font-display);
  font-size: var(--text-lg);
  line-height: 1.35;
  font-weight: 600;
  letter-spacing: var(--tracking-snug);
  color: var(--color-tinta);
}

.sector__names li {
  display: flex;
  align-items: baseline;
  max-width: 100%;
}

.sector__names li::before {
  content: '';
  flex: none;
  width: 0.3em;
  height: 0.3em;
  margin-inline: 0.55em;
  border-radius: var(--radius-full);
  background: var(--color-azul-vivo);
  transform: translateY(-0.25em);
}

@media (width >= 64rem) {
  .sector__intro {
    grid-column: 1 / span 5;
  }

  .sector__names {
    grid-column: 7 / -1;
    grid-row: 1 / span 2;
    align-self: center;
    font-size: var(--text-xl);
  }

  .sector__more {
    grid-column: 1 / span 5;
  }
}
</style>
