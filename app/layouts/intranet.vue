<script setup lang="ts">
import { ArrowUpRight, LockKeyhole } from '@lucide/vue'
import { company } from '~/data/company'

/**
 * The staff intranet is its own application, not a page of the public site:
 * no site navigation, footer, WhatsApp button or quote bar. It opens in a new
 * tab from the site and keeps only what staff need here: the brand, the
 * accessibility options, the language and a way back to the public site.
 */
const { tr } = useLang()
const year = new Date().getFullYear()

const copy = {
  skip: { es: 'Saltar al contenido', en: 'Skip to content' },
  home: { es: 'Training Corporation, sitio web', en: 'Training Corporation, website' },
  portal: { es: 'Intranet', en: 'Intranet' },
  staff: { es: 'Acceso exclusivo para el equipo', en: 'Staff access only' },
  site: { es: 'Ir al sitio web', en: 'Go to the website' },
  tools: { es: 'Herramientas', en: 'Tools' },
} satisfies Record<string, Loc>
</script>

<template>
  <div class="portal">
    <a href="#contenido" class="skip-link">{{ tr(copy.skip) }}</a>

    <header class="portal__bar">
      <div class="frame portal__row">
        <div class="portal__id">
          <NuxtLinkLocale to="/" class="portal__brand" :aria-label="tr(copy.home)">
            <BrandLogo />
          </NuxtLinkLocale>
          <p class="portal__name">
            <LockKeyhole aria-hidden="true" />
            <span>{{ tr(copy.portal) }}</span>
          </p>
        </div>
        <div class="portal__tools" role="group" :aria-label="tr(copy.tools)">
          <span class="portal__wide"><A11yMenu /><LangSwitch /></span>
          <span class="portal__narrow"><A11yMenu compact /><LangSwitch compact /></span>
          <NuxtLinkLocale to="/" class="portal__site">
            {{ tr(copy.site) }}<ArrowUpRight aria-hidden="true" />
          </NuxtLinkLocale>
        </div>
      </div>
    </header>

    <main id="contenido" tabindex="-1" class="portal__main focus:outline-none">
      <slot />
    </main>

    <footer class="portal__foot">
      <div class="frame portal__foot-row">
        <p>{{ tr(copy.staff) }}</p>
        <p>© {{ year }} {{ company.legalName }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.portal {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--color-nube);
}

.skip-link {
  position: absolute;
  left: 1rem;
  top: -10rem;
  z-index: 50;
  padding: 0.75rem 1rem;
  background: var(--color-azul);
  color: var(--color-blanco);
  font-weight: 700;
}

.skip-link:focus {
  top: 1rem;
}

.portal__bar {
  background: var(--color-blanco);
  border-bottom: 1px solid var(--color-linea);
}

.portal__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  min-height: 4.5rem;
  padding-block: 0.5rem;
}

.portal__id {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.portal__brand {
  flex: none;
}

/* The portal's name, set off from the logo by a rule, marked as restricted. */
.portal__name {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 1rem;
  border-left: 1px solid var(--color-linea);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 800;
  letter-spacing: var(--tracking-snug);
  color: var(--color-azul);
}

.portal__name svg {
  width: 1.125rem;
  height: 1.125rem;
}

.portal__tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}

.portal__wide,
.portal__narrow {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.portal__wide {
  display: none;
}

@media (width >= 48rem) {
  .portal__wide {
    display: flex;
  }

  .portal__narrow {
    display: none;
  }
}

.portal__site {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-control);
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-azul-hondo);
  text-decoration: none;
}

.portal__site:hover {
  background: var(--color-nube);
}

.portal__site svg {
  width: 1rem;
  height: 1rem;
}

.portal__main {
  flex: 1;
}

.portal__foot {
  border-top: 1px solid var(--color-linea);
  background: var(--color-blanco);
  font-size: var(--text-xs);
  color: var(--color-pizarra);
}

.portal__foot-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  padding-block: 1.25rem;
}
</style>
