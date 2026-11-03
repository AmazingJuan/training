<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

const { tr } = useLang()
const copy = {
  pageTitle: { es: 'Página no encontrada | Training Corporation', en: 'Page not found | Training Corporation' },
  title404: { es: 'Esta página no existe o cambió de dirección', en: 'This page does not exist or has moved' },
  title: { es: 'No fue posible cargar esta página', en: 'This page could not be loaded' },
  text404: { es: 'El sitio fue rediseñado y algunas direcciones cambiaron. Puede comenzar por aquí:', en: 'The site has been redesigned and some addresses have changed. You can start here:' },
  text: { es: 'Intente de nuevo en unos minutos o visite una de estas secciones:', en: 'Please try again in a few minutes or visit one of these sections:' },
  home: { es: 'Inicio', en: 'Home' },
  services: { es: 'Servicios', en: 'Services' },
  courses: { es: 'Formación: diplomados y cursos', en: 'Training: diploma programs and courses' },
  contact: { es: 'Contacto', en: 'Contact' },
} satisfies Record<string, Loc>
useSeoMeta({ title: notFound.value ? tr(copy.pageTitle) : 'Error | Training Corporation', robots: 'noindex' })
</script>

<template>
  <NuxtLayout>
    <section class="frame err">
      <h1 class="heading err__title">{{ notFound ? tr(copy.title404) : tr(copy.title) }}</h1>
      <p class="lede muted err__text">
        {{ notFound ? tr(copy.text404) : tr(copy.text) }}
      </p>
      <ul class="err__links">
        <li><NuxtLinkLocale to="/" class="link">{{ tr(copy.home) }}</NuxtLinkLocale></li>
        <li><NuxtLinkLocale to="/portafolio-de-servicios" class="link">{{ tr(copy.services) }}</NuxtLinkLocale></li>
        <li><NuxtLinkLocale to="/cursos-y-formaciones" class="link">{{ tr(copy.courses) }}</NuxtLinkLocale></li>
        <li><NuxtLinkLocale to="/contacto" class="link">{{ tr(copy.contact) }}</NuxtLinkLocale></li>
      </ul>
      <!-- Most broken links point to an old service page: let the visitor find it directly. -->
      <div v-if="notFound" class="err__search">
        <ServiceSearch :sync-url="false" />
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.err {
  padding-block: var(--spacing-section);
}

.err__title {
  max-width: 18ch;
  color: var(--color-azul);
}

.err__text {
  margin-top: 1.5rem;
}

.err__search {
  max-width: 52rem;
  margin-top: 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--color-linea);
}

.err__links {
  display: grid;
  gap: 0.75rem;
  margin-top: 2rem;
  font-size: var(--text-lg);
}
</style>
