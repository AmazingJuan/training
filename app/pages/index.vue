<script setup lang="ts">
const { tr } = useLang()
usePageSeo({
  title: tr({ es: 'Auditoría, consultoría y formación empresarial', en: 'Auditing, consulting and corporate training' }),
  fullTitle: tr({ es: 'Auditoría, consultoría y formación empresarial en Medellín', en: 'Auditing, consulting and corporate training in Medellín' }),
  description: tr({
    es: 'Diseñamos a la medida soluciones innovadoras en auditoría, consultoría y formación empresarial. Desde Medellín para Colombia y Centroamérica.',
    en: 'We design tailored, innovative solutions in auditing, consulting and corporate training. From Medellín for Colombia and Central America.',
  }),
})
</script>

<template>
  <div>
    <HomeHero />
    <LazyHomeCertifications hydrate-on-visible />
    <LazyHomeNews hydrate-on-visible />
    <LazyHomePresence hydrate-on-visible />
    <LazyHomeTeam hydrate-on-visible />
    <LazyHomeTraining hydrate-on-visible />
    <LazyContactBand hydrate-on-visible />
  </div>
</template>
