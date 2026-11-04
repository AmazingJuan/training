<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { company } from '~/data/company'
import { intranetModules } from '~/data/intranet'

// Its own application shell: no site navigation or footer (app/layouts/intranet.vue).
definePageMeta({ layout: 'intranet' })

const { tr, lang } = useLang()
usePageSeo({
  title: 'Intranet',
  description: tr({
    es: 'Acceso del equipo de Training Corporation a Licitdata, el cotizador, los presupuestos y SharePoint.',
    en: 'Training Corporation staff access to Licitdata, the quotation tool, budgets and SharePoint.',
  }),
  noindex: true,
})
const copy = {
  title: { es: 'Herramientas del equipo', en: 'Team tools' },
  lede: {
    es: 'Cada módulo se abre en una pestaña nueva y solicita sus propias credenciales de acceso.',
    en: 'Each module opens in a new tab and asks for its own sign-in.',
  },
  modules: { es: 'Módulos', en: 'Modules' },
  newTab: { es: '(se abre en una pestaña nueva)', en: '(opens in a new tab)' },
  pending: { es: 'Enlace pendiente de configuración', en: 'Link not yet configured' },
  help: { es: '¿No puede ingresar a un módulo? Escriba a', en: 'Cannot access a module? Write to' },
  call: { es: 'o comuníquese al', en: 'or call' },
} satisfies Record<string, Loc>

const { intranet } = useRuntimeConfig().public

// A module without an address is shown as pending instead of linking nowhere.
const modules = intranetModules.map((m) => {
  const url = m.href ?? (intranet[m.id as keyof typeof intranet] || null)
  return { ...m, url, host: url ? new URL(url).host.replace(/^www\./, '') : null }
})

// The open "C" of the logo: 14 % of the circle left open, centred on 3 o'clock.
const GAP = 14
</script>

<template>
  <div>
    <div class="frame intro">
      <h1 class="heading intro__title">{{ tr(copy.title) }}</h1>
      <p class="lede muted intro__lede">{{ tr(copy.lede) }}</p>
    </div>

    <section class="modules" aria-labelledby="modules-title">
      <div class="frame">
        <h2 id="modules-title" class="visually-hidden">{{ tr(copy.modules) }}</h2>
        <ul class="modules__list">
          <li v-for="m in modules" :key="m.id">
            <component
              :is="m.url ? 'a' : 'div'"
              :href="m.url ?? undefined"
              :target="m.url ? '_blank' : undefined"
              :rel="m.url ? 'noopener' : undefined"
              class="door"
              :class="{ 'door--pending': !m.url }"
            >
              <span class="door__ring" aria-hidden="true">
                <svg class="door__orbit" viewBox="0 0 100 100">
                  <circle
                    class="door__arc"
                    cx="50"
                    cy="50"
                    r="46"
                    pathLength="100"
                    :stroke-dasharray="`${100 - GAP} ${GAP}`"
                    :transform="`rotate(${(GAP / 100) * 180} 50 50)`"
                  />
                  <circle class="door__dot" cx="50" cy="4" r="3.6" />
                </svg>
                <component :is="m.icon" class="door__icon" />
              </span>

              <span class="door__body">
                <span class="door__name">{{ tr(m.name) }}</span>
                <span class="door__summary">{{ tr(m.summary) }}</span>
                <span v-if="m.url" class="door__go">
                  <!-- Long hosts may break after a dot, never inside a word. -->
                  <span><template v-for="(part, i) in m.host!.split('.')" :key="i"><wbr v-if="i">{{ i ? '.' : '' }}{{ part }}</template></span>
                  <ArrowUpRight aria-hidden="true" />
                  <span class="visually-hidden">{{ tr(copy.newTab) }}</span>
                </span>
                <span v-else class="door__go door__go--pending">{{ tr(copy.pending) }}</span>
              </span>
            </component>
          </li>
        </ul>

        <p class="muted modules__help">
          {{ tr(copy.help) }}
          <a :href="`mailto:${company.email}`" class="link">{{ company.email }}</a>
          {{ tr(copy.call) }} <a :href="company.phones[0].href" class="link">{{ lang === 'en' ? company.phones[0].intl : company.phones[0].display }}</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.intro {
  padding-block: clamp(2.5rem, 1.5rem + 3vw, 4rem) 2rem;
}

.intro__title {
  color: var(--color-azul);
}

.intro__lede {
  margin-top: 1rem;
}

.modules {
  padding-bottom: var(--spacing-section);
}

.modules__list {
  display: grid;
  border-top: 2px solid var(--color-azul);
}

.modules__list > li {
  min-width: 0;
  border-bottom: 1px solid var(--color-linea);
}

.door {
  min-width: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
  padding-block: 2rem;
  color: var(--color-tinta);
  text-decoration: none;
}

/* The ring around the icon: the logo's open "C", which closes on hover —
   the same gesture as the service lines. */
.door__ring {
  position: relative;
  display: grid;
  place-items: center;
  width: 5.5rem;
  height: 5.5rem;
}

.door__orbit {
  position: absolute;
  inset: 0;
  overflow: visible;
}

.door__arc {
  fill: none;
  stroke: var(--color-azul-vivo);
  stroke-width: 2.6;
  stroke-linecap: round;
  transition: stroke-dasharray var(--duration-slow) var(--ease-out);
}

.door__dot {
  fill: var(--color-azul-vivo);
  transform-origin: 50px 4px;
  transition: transform var(--duration-base) var(--ease-out);
}

.door__icon {
  width: 2.25rem;
  height: 2.25rem;
  color: var(--color-azul);
  stroke-width: 1.75;
  transition: transform var(--duration-base) var(--ease-out);
}

.door__body {
  display: grid;
  min-width: 0;
  gap: 0.375rem;
  hyphens: auto;
  overflow-wrap: break-word;
  padding-top: 0.5rem;
}

.door__name {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  line-height: var(--text-2xl--line-height);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
  color: var(--color-azul);
  transition: color var(--duration-fast) var(--ease-out);
}

.door__summary {
  max-width: 34rem;
  color: var(--color-pizarra);
}

.door__go {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
  gap: 0.375rem;
  margin-top: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-azul);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.22em;
}

.door__go svg {
  flex: none;
  width: 1.125rem;
  height: 1.125rem;
  transition: transform var(--duration-base) var(--ease-out);
}

a.door:hover .door__arc,
a.door:focus-visible .door__arc {
  stroke-dasharray: 100 0;
}

a.door:hover .door__dot,
a.door:focus-visible .door__dot {
  transform: scale(0);
}

a.door:hover .door__icon {
  transform: scale(1.06);
}

a.door:hover .door__name {
  color: var(--color-azul-hondo);
}

a.door:hover .door__go {
  text-decoration-thickness: 2px;
}

a.door:hover .door__go svg {
  flex: none;
  transform: translate(2px, -2px);
}

a.door:focus-visible {
  outline-offset: 6px;
}

/* Not configured yet: visible, clearly inert. */
.door--pending {
  cursor: default;
}

.door--pending .door__arc,
.door--pending .door__dot {
  stroke: var(--color-gris-marca);
  fill: none;
  stroke-dasharray: 4 6;
}

.door--pending .door__dot {
  display: none;
}

.door--pending .door__icon,
.door--pending .door__name {
  color: var(--color-pizarra);
}

.door__go--pending {
  color: var(--color-pizarra);
  font-weight: 600;
  text-decoration: none;
}

.modules__help {
  max-width: var(--container-measure);
  margin-top: 2.5rem;
}

@media (width >= 48rem) {
  .modules__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: var(--spacing-gutter);
  }

  .door {
    padding-block: 2.5rem;
    padding-right: 1rem;
  }

  .door__ring {
    width: 6.5rem;
    height: 6.5rem;
  }
}

/* Small phones or large text: the ring above the text, so the name keeps the full width. */
@media (width < 30rem) {
  .door {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
  }
}
</style>
