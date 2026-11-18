<script setup lang="ts">
/** Enrolment status of a programme (Acta 6: "Inscripciones abiertas"), marked with the logo's satellite dot. */
const { tr } = useLang()
const label: Loc = { es: 'Inscripciones abiertas', en: 'Enrolment open' }
</script>

<template>
  <p class="enrolment">{{ tr(label) }}</p>
</template>

<style scoped>
.enrolment {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.enrolment::before {
  content: '';
  flex: none;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: var(--radius-full);
  background: var(--color-azul-vivo);
}
</style>
