<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Map as MapLibreMap } from 'maplibre-gl'
import { company } from '~/data/company'

/**
 * Where we are: an interactive street map in the brand's own inks, with the
 * office marked by the logo's ring and dot. Vector tiles from OpenFreeMap
 * (OpenStreetMap data, free, no key); the light "positron" style is recoloured
 * on load. Scrolling the page never zooms the map (cooperative gestures).
 * The address is also written out next to the map, which is what screen
 * readers and visitors without WebGL get.
 */
const { tr, lang } = useLang()
const el = useTemplateRef<HTMLElement>('el')
const failed = ref(false)
let map: MapLibreMap | undefined

const copy = {
  label: {
    es: `Mapa de la sede de Training Corporation: ${company.address.building}, ${company.address.street}, ${company.address.area}, ${company.address.city}`,
    en: `Map of Training Corporation’s offices: ${company.address.building}, ${company.address.street}, ${company.address.area}, ${company.address.city}`,
  },
  failed: { es: 'No fue posible cargar el mapa.', en: 'The map could not be loaded.' },
  open: { es: 'Abrir en Google Maps', en: 'Open in Google Maps' },
} satisfies Record<string, Loc>

// Brand palette (main.css) applied to the base style's layers.
const paint: Record<string, Record<string, string>> = {
  background: { 'background-color': '#eef4f8' },
  park: { 'fill-color': '#dde9ef' },
  landcover_wood: { 'fill-color': '#dde9ef' },
  landuse_residential: { 'fill-color': '#e6f0f7' },
  water: { 'fill-color': '#bfe3f5' },
  waterway: { 'line-color': '#bfe3f5' },
  building: { 'fill-color': '#d5e2eb' },
  highway_minor: { 'line-color': '#ffffff' },
  highway_major_casing: { 'line-color': '#c5d6e3' },
  highway_major_inner: { 'line-color': '#ffffff' },
  highway_major_subtle: { 'line-color': '#ffffff' },
  highway_motorway_casing: { 'line-color': '#b0c6d6' },
  highway_motorway_inner: { 'line-color': '#ffffff' },
  highway_motorway_subtle: { 'line-color': '#ffffff' },
  'highway-name-minor': { 'text-color': '#4a5a67', 'text-halo-color': '#ffffff' },
  'highway-name-major': { 'text-color': '#4a5a67', 'text-halo-color': '#ffffff' },
  label_other: { 'text-color': '#4a5a67', 'text-halo-color': '#ffffff' },
  label_village: { 'text-color': '#4a5a67', 'text-halo-color': '#ffffff' },
  label_town: { 'text-color': '#102a3f', 'text-halo-color': '#ffffff' },
  label_city: { 'text-color': '#102a3f', 'text-halo-color': '#ffffff' },
}

onMounted(async () => {
  if (!el.value) return
  try {
    const { Map, Marker, NavigationControl, AttributionControl } = await import('maplibre-gl')
    const { lat, lng } = company.address.geo
    map = new Map({
      container: el.value,
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: [lng, lat],
      zoom: 16,
      minZoom: 11,
      maxZoom: 19,
      attributionControl: false,
      cooperativeGestures: true,
      locale: lang.value === 'en'
        ? {}
        : {
            'CooperativeGesturesHandler.WindowsHelpText': 'Use Ctrl + desplazamiento para acercar el mapa',
            'CooperativeGesturesHandler.MacHelpText': 'Use ⌘ + desplazamiento para acercar el mapa',
            'CooperativeGesturesHandler.MobileHelpText': 'Use dos dedos para mover el mapa',
            'NavigationControl.ZoomIn': 'Acercar',
            'NavigationControl.ZoomOut': 'Alejar',
          },
    })
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right')
    map.addControl(new AttributionControl({ compact: true }), 'bottom-right')
    map.on('style.load', () => {
      for (const [layer, props] of Object.entries(paint)) {
        if (!map?.getLayer(layer)) continue
        for (const [prop, value] of Object.entries(props)) map.setPaintProperty(layer, prop, value)
      }
    })
    map.on('error', (e) => { if (!map?.loaded() && e.error?.message?.includes('style')) failed.value = true })

    // The pin: a solid dot in logo blue on the office, and the name beside it.
    const pin = document.createElement('div')
    pin.className = 'office-pin'
    pin.setAttribute('aria-hidden', 'true')
    pin.innerHTML = `<span class="office-pin__mark"></span><span class="office-pin__label"><strong>${company.shortName}</strong>${company.address.building}, ${tr(company.address.office).toLowerCase()}</span>`
    new Marker({ element: pin, anchor: 'left', offset: [-11, 0] }).setLngLat([lng, lat]).addTo(map)
  }
  catch {
    failed.value = true
  }
})

onBeforeUnmount(() => map?.remove())
</script>

<template>
  <figure class="contact-map">
    <div ref="el" class="contact-map__canvas" role="region" :aria-label="tr(copy.label)" />
    <figcaption v-if="failed" class="contact-map__failed">
      {{ tr(copy.failed) }}
      <a :href="company.address.mapUrl" target="_blank" rel="noopener" class="link">{{ tr(copy.open) }}</a>
    </figcaption>
  </figure>
</template>

<style scoped>
.contact-map {
  position: relative;
  margin: 0;
}

.contact-map__canvas {
  height: clamp(20rem, 50vw, 34rem);
  background: var(--color-nube);
  border-radius: var(--radius-control);
  overflow: hidden;
}

.contact-map__failed {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  color: var(--color-pizarra);
}
</style>

<style>
/* The marker lives inside MapLibre's DOM, outside this component's scope. */
.office-pin {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  pointer-events: none;
}

/* A solid disc in logo blue (an open ring this small reads as a loading spinner). */
.office-pin__mark {
  flex: none;
  width: 1.375rem;
  height: 1.375rem;
  border: 0.25rem solid var(--color-blanco);
  border-radius: 50%;
  background: var(--color-azul);
  box-shadow: 0 0 0 1px rgb(0 90 140 / 0.25), 0 6px 14px -4px rgb(0 90 140 / 0.6);
}

.office-pin__label {
  display: grid;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-control);
  background: var(--color-blanco);
  box-shadow: 0 6px 16px -8px rgb(16 42 63 / 0.35);
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  line-height: 1.3;
  color: var(--color-pizarra);
  white-space: nowrap;
}

.office-pin__label strong {
  font-family: var(--font-display);
  font-size: 0.875rem;
  color: var(--color-tinta);
}

.contact-map .maplibregl-ctrl-attrib {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
}

.contact-map .maplibregl-ctrl-group {
  border-radius: var(--radius-control);
  box-shadow: 0 4px 12px -6px rgb(16 42 63 / 0.35);
}

.contact-map .maplibregl-ctrl-group button:focus-visible {
  outline: var(--focus-ring);
  outline-offset: 2px;
}
</style>
