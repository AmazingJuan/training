<script setup lang="ts">
import { MessageCircle } from '@lucide/vue'
import { company } from '~/data/company'

/**
 * WhatsApp, bottom right on every page. It waits until the visitor scrolls past
 * the opening, so it never covers the first screen; hidden means out of the tab
 * order too. Quotes go through the contact form ("Solicitar cotización").
 */
const { tr } = useLang()
const copy = {
  wa: { es: `Escribir por WhatsApp al ${company.whatsapp.display}`, en: `Message us on WhatsApp at +57 ${company.whatsapp.display}` },
} satisfies Record<string, Loc>

const { y } = useWindowScroll()
const showWa = ref(false)
onMounted(() => {
  watchEffect(() => { showWa.value = y.value > window.innerHeight * 0.5 })
})
</script>

<template>
  <a :href="company.whatsapp.href" class="fab wa" :class="{ 'wa--hidden': !showWa }" :inert="!showWa ? true : undefined" target="_blank" rel="noopener" :aria-label="tr(copy.wa)">
    <MessageCircle aria-hidden="true" />
  </a>
</template>

<style scoped>
.fab {
  position: fixed;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: 30;
}

.wa {
  display: grid;
  place-items: center;
  flex: none;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-full);
  background: var(--color-azul);
  color: var(--color-blanco);
  box-shadow: 0 10px 24px -10px rgb(0 90 140 / 0.5);
  transition: opacity var(--duration-base) var(--ease-out), visibility var(--duration-base), transform var(--duration-base) var(--ease-out), background-color var(--duration-fast) var(--ease-out);
}

.wa--hidden {
  opacity: 0;
  visibility: hidden;
  transform: translateY(0.75rem);
}

.wa:hover {
  background: var(--color-azul-hondo);
  transform: translateY(-2px);
}

.wa svg {
  width: 1.625rem;
  height: 1.625rem;
}

@media print {
  .fab { display: none; }
}
</style>
