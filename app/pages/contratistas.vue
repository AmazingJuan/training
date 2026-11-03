<script setup lang="ts">
import { contractorDocuments, company } from '~/data/company'

const { tr } = useLang()
const copy = {
  title: { es: 'Contratistas y proveedores', en: 'Contractors and suppliers' },
  lede: {
    es: 'Documentos necesarios para prestar servicios a Training Corporation y presentar las cuentas de cobro.',
    en: 'The documents required to provide services to Training Corporation and to submit invoices.',
  },
  docs: { es: 'Documentos', en: 'Documents' },
  help: { es: '¿Tiene dudas sobre un pago o un documento? Escriba a', en: 'Questions about a payment or a document? Write to' },
  call: { es: 'o comuníquese al', en: 'or call' },
} satisfies Record<string, Loc>
usePageSeo({
  title: tr(copy.title),
  description: tr({
    es: 'Formato de cuenta de cobro y manual de proveedores y contratistas de Training Corporation.',
    en: 'Training Corporation’s invoice template and suppliers and contractors manual.',
  }),
})
</script>

<template>
  <div>
    <PageHeader
      :title="tr(copy.title)"
      :lede="tr(copy.lede)"
    />
    <section class="docs" :aria-label="tr(copy.docs)">
      <div class="frame grid-page">
        <div class="docs__list">
          <UiDocLink v-for="d in contractorDocuments" :key="d.href" :doc="d" />
          <p class="muted docs__help">
            {{ tr(copy.help) }}
            <a :href="`mailto:${company.email}`" class="link">{{ company.email }}</a>
            {{ tr(copy.call) }} <a :href="company.phones[0].href" class="link">{{ tr({ es: company.phones[0].display, en: company.phones[0].intl }) }}</a>.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.docs {
  padding-bottom: var(--spacing-section);
}

.docs__list {
  grid-column: 1 / -1;
  border-top: 2px solid var(--color-azul);
}

.docs__help {
  margin-top: 2rem;
  max-width: var(--container-measure);
}

@media (width >= 64rem) {
  .docs__list { grid-column: 1 / span 8; }
}
</style>
