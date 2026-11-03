<script setup lang="ts">
import { presence } from '~/data/company'
import { countryShapes, departmentShapes, mapSize } from '~/data/presenceMap'

/**
 * Presence map: one real geographic frame from Guatemala to southern Colombia,
 * so the Central American work sits where it actually is, not in an inset.
 * Served departments and countries are lit; the rest of the region is context.
 * The drawing is a picture for sighted visitors; the same facts are written out
 * below it as lists, which is what screen readers get.
 */
const { tr, lang } = useLang()

// Bogotá is enclosed by Cundinamarca and lit with it.
const served = new Set<string>([...presence.departments, 'Bogotá D.C.'])
const servedCountries = new Set<string>(presence.countries.map((c) => c.iso))
const countryName = Object.fromEntries(presence.countries.map((c) => [c.iso, c.name]))

const shapes = departmentShapes.map((d) => ({ ...d, lit: served.has(d.name) }))
const context = countryShapes.filter((c) => c.iso !== 'COL').map((c) => ({ ...c, lit: servedCountries.has(c.iso) }))
const colombia = countryShapes.find((c) => c.iso === 'COL')

// Label anchors: countries whose centroid would sit on a neighbour's coast get nudged.
const nudge: Record<string, [number, number]> = { SLV: [-6, 26], CRI: [-40, 18], GTM: [0, -4], NIC: [10, 0] }
const labels = context.filter((c) => c.lit).map((c) => {
  const [dx, dy] = nudge[c.iso] ?? [0, 0]
  return { iso: c.iso, x: c.x + dx, y: c.y + dy }
})

const listFormat = computed(() => new Intl.ListFormat(langTag[lang.value], { type: 'conjunction' }))
const countries = computed(() => listFormat.value.format(presence.countries.map((c) => tr(c.name))))

/** Mouse readout: the department or country under the pointer. */
const hovered = ref<{ name: string, lit: boolean } | null>(null)

const copy = {
  title: { es: 'Presencia en Colombia y Centroamérica', en: 'Present in Colombia and Central America' },
  lede: {
    es: `Hemos prestado servicios en ${presence.departments.length} departamentos de Colombia. Nuestros profesionales atienden directamente a cada organización cliente, lo que nos permite mantener relaciones cercanas y duraderas.`,
    en: `We have delivered services in ${presence.departments.length} Colombian departments. Our professionals work directly with each client organization, which allows us to maintain close and lasting relationships.`,
  },
  abroad: { es: 'Fuera de Colombia hemos prestado servicios en', en: 'Outside Colombia we have delivered services in' },
  mapLabel: {
    es: 'Mapa de Colombia y Centroamérica con los departamentos y países donde Training Corporation ha prestado servicios',
    en: 'Map of Colombia and Central America showing the departments and countries where Training Corporation has delivered services',
  },
  deptList: { es: 'Departamentos de Colombia con servicios', en: 'Colombian departments served' },
  served: { es: 'con servicios', en: 'served' },
  notServed: { es: 'sin servicios registrados', en: 'no services on record' },
  legendServed: { es: 'Con servicios', en: 'Served' },
  legendOther: { es: 'Sin servicios registrados', en: 'No services on record' },
} satisfies Record<string, Loc>

</script>

<template>
  <section id="presencia" class="presence section" aria-labelledby="presence-title">
    <div class="frame grid-page presence__grid">
      <div class="presence__head">
        <h2 id="presence-title" class="heading">{{ tr(copy.title) }}</h2>
        <p class="lede presence__lede">{{ tr(copy.lede) }}</p>
        <p class="presence__abroad">{{ tr(copy.abroad) }} <strong>{{ countries }}</strong>.</p>

        <h3 class="presence__list-title">{{ tr(copy.deptList) }}</h3>
        <ul class="presence__list">
          <li v-for="d in presence.departments" :key="d">{{ d }}</li>
        </ul>
      </div>

      <figure class="presence__map">
        <svg
          :viewBox="`0 0 ${mapSize.width} ${mapSize.height}`"
          class="map"
          role="img"
          :aria-label="tr(copy.mapLabel)"
          @pointerleave="hovered = null"
        >
          <g class="map__context">
            <path
              v-for="c in context"
              :key="c.iso"
              :d="c.d"
              class="map__shape map__shape--country"
              :class="{ 'is-lit': c.lit }"
              @pointerenter="hovered = c.lit ? { name: tr(countryName[c.iso]!), lit: true } : null"
            />
          </g>
          <path v-if="colombia" :d="colombia.d" class="map__colombia" />
          <g>
            <path
              v-for="d in shapes"
              :key="d.name"
              :d="d.d"
              class="map__shape map__shape--dept"
              :class="{ 'is-lit': d.lit }"
              @pointerenter="hovered = { name: d.name, lit: d.lit }"
            />
          </g>
          <g class="map__labels" aria-hidden="true">
            <text v-for="l in labels" :key="l.iso" :x="l.x" :y="l.y" text-anchor="middle">{{ tr(countryName[l.iso]!) }}</text>
            <text v-if="colombia" :x="colombia.x" :y="colombia.y" text-anchor="middle" class="map__label-main">Colombia</text>
          </g>
        </svg>

        <figcaption class="map__caption">
          <span class="map__legend" aria-hidden="true">
            <span class="map__key map__key--lit" />{{ tr(copy.legendServed) }}
            <span class="map__key" />{{ tr(copy.legendOther) }}
          </span>
          <span class="map__readout" aria-hidden="true">
            <template v-if="hovered">{{ hovered.name }}: {{ hovered.lit ? tr(copy.served) : tr(copy.notServed) }}</template>
          </span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.presence__grid {
  row-gap: 2.5rem;
}

.presence__head,
.presence__map {
  grid-column: 1 / -1;
}

.presence__head .heading {
  max-width: 16ch;
}

.presence__lede {
  margin-top: 1.5rem;
  color: var(--color-pizarra);
}

.presence__abroad {
  margin-top: 1rem;
  color: var(--color-pizarra);
}

.presence__abroad strong {
  color: var(--color-tinta);
  font-weight: 700;
}

.presence__list-title {
  margin-top: 2rem;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-azul-hondo);
}

.presence__list {
  columns: 2;
  column-gap: 1.5rem;
  margin-top: 0.75rem;
  font-size: var(--text-sm);
  line-height: 1.7;
}

.presence__list li {
  break-inside: avoid;
}

/* The map: a technical chart in the brand's own inks on a light ground.
   Served territory in logo blue (3.5:1 against unserved land, WCAG 1.4.11);
   neighbouring countries lighter still, as context. */
.presence__map {
  margin: 0;
}

.map {
  display: block;
  /* The frame cuts the continent; fade its edges into the ground instead of a hard box. */
  mask-image:
    linear-gradient(to right, transparent, #000 6%, #000 94%, transparent),
    linear-gradient(to bottom, transparent, #000 5%, #000 92%, transparent);
  mask-composite: intersect;
  width: 100%;
  height: auto;
  overflow: visible;
}

.map__shape {
  stroke: var(--color-blanco);
  stroke-width: 1.4;
  stroke-linejoin: round;
  transition: fill var(--duration-fast) var(--ease-out);
}

.map__shape--country {
  fill: #e1e9f0;
}

.map__shape--dept {
  fill: var(--color-mapa);
}

.map__shape.is-lit {
  fill: var(--color-azul);
}

.map__shape.is-lit:hover {
  fill: var(--color-azul-hondo);
}

.map__shape--dept:not(.is-lit):hover {
  fill: #b0c6d6;
}

.map__colombia {
  fill: none;
  stroke: var(--color-azul-hondo);
  stroke-width: 1.5;
  stroke-opacity: 0.6;
  pointer-events: none;
}

.map__labels text {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  fill: var(--color-tinta);
  paint-order: stroke;
  stroke: var(--color-blanco);
  stroke-width: 6px;
  stroke-linejoin: round;
  pointer-events: none;
}

.map__labels .map__label-main {
  font-size: 32px;
  letter-spacing: 0.02em;
  stroke-width: 7px;
}

.map__caption {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  margin-top: 1rem;
  font-size: var(--text-sm);
  color: var(--color-pizarra);
}

.map__legend {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.map__key {
  display: inline-block;
  width: 0.875rem;
  height: 0.875rem;
  margin-left: 0.5rem;
  border-radius: 0.2rem;
  background: var(--color-mapa);
}

.map__key:first-child {
  margin-left: 0;
}

.map__key--lit {
  background: var(--color-azul);
}

.map__readout {
  min-height: 1.5em;
  font-weight: 600;
  color: var(--color-tinta);
}

@media (width >= 64rem) {
  .presence__head {
    grid-column: 1 / span 5;
    align-self: center;
  }

  .presence__map {
    grid-column: 6 / -1;
  }
}

/* High-contrast mode (accessibility panel): served in the darkened blue, everything
   else white with black edges, so the boundaries never depend on a pale tint.
   (:global() must wrap the whole selector, or Vue drops what follows it.) */
:global(html.a11y-contrast .map__shape) {
  stroke: #000;
}

:global(html.a11y-contrast .map__shape--country:not(.is-lit)) {
  fill: #fff;
}

:global(html.a11y-contrast .map__key) {
  border: 1px solid #000;
}
</style>
