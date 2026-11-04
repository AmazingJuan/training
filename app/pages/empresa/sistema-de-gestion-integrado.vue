<script setup lang="ts">
import { sgiDocuments, bulletins } from '~/data/company'

const { tr } = useLang()
const copy = {
  title: { es: 'Sistema de Gestión Integrado', en: 'Integrated Management System' },
  lede: {
    es: 'Nuestros sistemas de gestión de la calidad y de seguridad y salud en el trabajo están certificados. Aquí publicamos los certificados y los documentos para clientes, contratistas y proveedores.',
    en: 'Our quality and occupational health and safety management systems are certified. Here we publish the certificates and the documents for clients, contractors and suppliers.',
  },
  company: { es: 'Nosotros', en: 'About us' },
  certs: { es: 'Certificaciones', en: 'Certifications' },
  docs: { es: 'Documentos', en: 'Documents' },
  bulletins: { es: 'Boletines informativos', en: 'Newsletters' },
} satisfies Record<string, Loc>
usePageSeo({
  title: tr(copy.title),
  description: tr({
    es: 'Certificados ISO 9001:2015 e ISO 45001:2018, membresía corporativa del IAM, licencia de SST, manual de protección de datos personales y boletines informativos.',
    en: 'ISO 9001:2015 and ISO 45001:2018 certificates, IAM corporate membership, OHS license, personal data protection manual and newsletters.',
  }),
})

const otherDocs = sgiDocuments.filter((d) => !d.title.es.startsWith('Certificado'))
</script>

<template>
  <div>
    <PageHeader
      :title="tr(copy.title)"
      :lede="tr(copy.lede)"
      :crumbs="[{ label: tr(copy.company), to: '/empresa' }]"
    />

    <section class="section-sm field-azul" aria-labelledby="certs">
      <div class="frame">
        <h2 id="certs" class="visually-hidden">{{ tr(copy.certs) }}</h2>
        <CertificationList />
      </div>
    </section>

    <section class="section" aria-labelledby="docs">
      <div class="frame grid-page docs">
        <div class="docs__col">
          <h2 id="docs" class="subheading docs__title">{{ tr(copy.docs) }}</h2>
          <UiDocLink v-for="d in otherDocs" :key="d.href" :doc="d" />
        </div>
        <div class="docs__col">
          <h2 class="subheading docs__title">{{ tr(copy.bulletins) }}</h2>
          <UiDocLink v-for="d in bulletins" :key="d.href" :doc="d" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.section-sm {
  padding-block: var(--spacing-section-sm);
}

.docs {
  row-gap: 3.5rem;
}

.docs__col {
  grid-column: 1 / -1;
}

.docs__title {
  margin-bottom: 1rem;
  color: var(--color-tinta);
}

@media (width >= 64rem) {
  .docs__col:first-child { grid-column: 1 / span 5; }
  .docs__col:last-child { grid-column: 7 / -1; }
}
</style>
