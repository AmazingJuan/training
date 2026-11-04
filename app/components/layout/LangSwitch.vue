<script setup lang="ts">
import { Languages } from '@lucide/vue'

/**
 * Link to the same page in the other language. Written in the language it
 * leads to (with lang and hreflang), so a Spanish reader on the English page
 * recognises "Español" and vice versa. `compact` shows the two-letter code.
 */
defineProps<{ compact?: boolean }>()

const { lang } = useLang()
const switchLocalePath = useSwitchLocalePath()

const other = computed(() => (lang.value === 'es'
  ? { code: 'en' as const, name: 'English', label: 'View this page in English' }
  : { code: 'es' as const, name: 'Español', label: 'Ver esta página en español' }))
</script>

<template>
  <NuxtLink
    :to="switchLocalePath(other.code)"
    class="lang"
    :class="{ 'lang--compact': compact }"
    :lang="other.code"
    :hreflang="other.code"
    :aria-label="other.label"
  >
    <Languages aria-hidden="true" />
    <span>{{ compact ? other.code.toUpperCase() : other.name }}</span>
  </NuxtLink>
</template>

<style scoped>
.lang {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.625rem;
  border-radius: var(--radius-control);
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-tinta);
  text-decoration: none;
  white-space: nowrap;
}

.lang:hover {
  background: var(--color-nube);
  color: var(--color-azul);
}

.lang svg {
  width: 1.125rem;
  height: 1.125rem;
  color: var(--color-azul);
}

.lang--compact {
  padding-inline: 0.5rem;
  font-weight: 600;
}
</style>
