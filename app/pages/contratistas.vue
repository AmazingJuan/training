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
    es: 'Manual de contratistas y proveedores y formato de cuenta de cobro de Training Corporation.',
    en: 'Training Corporation’s suppliers and contractors manual and invoice template.',
  }),
})

/**
 * Links in the order a contractor needs them (Acta 6: rank the links): the
 * manual first, before providing the service; the invoice template after it.
 * The order is a real sequence, so the steps are numbered.
 */
const [manual, invoice] = contractorDocuments
const steps = [
  {
    doc: manual!,
    when: { es: 'Antes de prestar el servicio', en: 'Before providing the service' },
    what: {
      es: 'Consulte las condiciones y los requisitos para prestar servicios o suministrar bienes a Training Corporation.',
      en: 'Read the terms and requirements for providing services or supplying goods to Training Corporation.',
    },
  },
  {
    doc: invoice!,
    when: { es: 'Para presentar el cobro', en: 'To submit your invoice' },
    what: {
      es: 'Diligencie este formato para presentar su cuenta de cobro.',
      en: 'Fill in this template to submit your invoice.',
    },
  },
] satisfies { doc: (typeof contractorDocuments)[number], when: Loc, what: Loc }[]
</script>

<template>
  <div>
    <PageHeader
      :title="tr(copy.title)"
      :lede="tr(copy.lede)"
    />
    <section class="docs" :aria-label="tr(copy.docs)">
      <div class="frame grid-page">
        <ol class="steps">
          <li v-for="(s, i) in steps" :key="s.doc.href" class="step" :class="{ 'step--first': i === 0 }">
            <span class="step__n" aria-hidden="true">{{ i + 1 }}</span>
            <div class="step__body">
              <h2 class="step__when">{{ tr(s.when) }}</h2>
              <p class="step__what">{{ tr(s.what) }}</p>
              <UiDocLink :doc="s.doc" class="step__doc" />
            </div>
          </li>
        </ol>
        <p class="muted docs__help">
          {{ tr(copy.help) }}
          <a :href="`mailto:${company.email}`" class="link">{{ company.email }}</a>
          {{ tr(copy.call) }} <a :href="company.phones[0].href" class="link">{{ tr({ es: company.phones[0].display, en: company.phones[0].intl }) }}</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.docs {
  padding-bottom: var(--spacing-section);
}

.steps,
.docs__help {
  grid-column: 1 / -1;
}

.step {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  column-gap: 1.25rem;
  padding-block: 2rem;
  border-top: 1px solid var(--color-linea);
}

.step--first {
  border-top: 2px solid var(--color-azul);
}

/* The step number in the logo's solid dot. */
.step__n {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background: var(--color-azul);
  color: var(--color-blanco);
  font-family: var(--font-display);
  font-weight: 700;
}

.step__when {
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
}

.step__what {
  max-width: var(--container-measure);
  margin-top: 0.5rem;
  color: var(--color-pizarra);
}

.step__doc {
  margin-top: 1rem;
  border-top: 1px solid var(--color-linea);
}

.docs__help {
  margin-top: 1rem;
  max-width: var(--container-measure);
}

@media (width >= 64rem) {
  .steps,
  .docs__help { grid-column: 1 / span 8; }
}
</style>
