<script setup lang="ts">
/**
 * PQRS: the web version of the company's «Formato PQRS», one step at a time.
 * Visitors fill the customer part of the format; the company assigns the
 * request number and handles reception, validation and closing internally.
 */
const { tr } = useLang()
const copy = {
  title: { es: 'Peticiones, quejas, reclamos y felicitaciones', en: 'Requests, complaints, claims and compliments' },
  lede: {
    es: 'Su opinión nos ayuda a mejorar. Le enviaremos el número de su solicitud y la respuesta por correo electrónico.',
    en: 'Your feedback helps us improve. We will send your request number and our reply by email.',
  },
  region: { es: 'Formulario de PQRS', en: 'PQRS form' },
} satisfies Record<string, Loc>

usePageSeo({
  title: tr({ es: 'PQRS: peticiones, quejas, reclamos y felicitaciones', en: 'PQRS: requests, complaints, claims and compliments' }),
  description: tr({
    es: 'Radique en línea una petición, queja, reclamo, apelación, sugerencia o felicitación sobre los servicios de Training Corporation.',
    en: 'Submit online a request, complaint, claim, appeal, suggestion or compliment about Training Corporation’s services.',
  }),
})
</script>

<template>
  <div>
    <PageHeader :title="tr(copy.title)" :lede="tr(copy.lede)" />

    <section class="pqrs" :aria-label="tr(copy.region)">
      <div class="frame">
        <PqrsForm />
      </div>
    </section>
  </div>
</template>

<style scoped>
.pqrs {
  padding-bottom: var(--spacing-section);
}
</style>
