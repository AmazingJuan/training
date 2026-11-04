<script setup lang="ts">
// The organisation and website markup, on every page.
useOrganizationJsonLd()
const { tr } = useLang()
const skip = { es: 'Saltar al contenido', en: 'Skip to content' }
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a href="#contenido" class="skip-link">{{ tr(skip) }}</a>
    <SiteHeader />
    <main id="contenido" tabindex="-1" class="flex-1 focus:outline-none">
      <slot />
    </main>
    <!-- Below the fold everywhere: its scripts load when it scrolls into view. -->
    <LazySiteFooter hydrate-on-visible />
    <FloatingActions />
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: 1rem;
  top: -10rem;
  z-index: 50;
  padding: 0.75rem 1rem;
  background: var(--color-azul);
  color: var(--color-blanco);
  font-weight: 600;
}

.skip-link:focus {
  top: 1rem;
}
</style>
