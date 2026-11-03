<script setup lang="ts">
const { tr } = useLang()
usePageSeo({
  title: tr({ es: 'Auditoría, consultoría y formación ISO', en: 'ISO auditing, consulting and training' }),
  fullTitle: tr({ es: 'Training Corporation: auditoría y formación ISO en Medellín', en: 'Training Corporation: ISO auditing and training in Colombia' }),
  description: tr({
    es: 'Auditoría, consultoría y formación en ISO 9001, 45001, 55001 y 27001 y en regulación CREG del sector eléctrico. Desde Medellín para Colombia y Centroamérica.',
    en: 'Auditing, consulting and training in ISO 9001, 45001, 55001 and 27001 and in CREG electricity regulation. From Medellín for Colombia and Central America.',
  }),
})
</script>

<template>
  <div>
    <HomeHero />
    <LazyHomeCertifications hydrate-on-visible />
    <LazyHomeServices hydrate-on-visible />
    <LazyHomeSector hydrate-on-visible />
    <LazyHomeCases hydrate-on-visible />
    <LazyHomePresence hydrate-on-visible />
    <LazyHomeTeam hydrate-on-visible />
    <LazyHomeTraining hydrate-on-visible />
    <LazyContactBand hydrate-on-visible />
  </div>
</template>
