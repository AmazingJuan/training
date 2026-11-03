<script setup lang="ts">
/**
 * Right under the opening: the company's own certifications and membership.
 * Real issuer, numbers and validity (CertificationList).
 */
const { tr } = useLang()
const copy = {
  title: { es: 'Nuestras certificaciones', en: 'Our certifications' },
  intro: {
    es: 'Nuestro sistema de gestión está certificado por Bureau Veritas, con un alcance que comprende los servicios de formación, consultoría y auditoría que ofrecemos.',
    en: 'Our management system is certified by Bureau Veritas, with a scope that covers the training, consulting and auditing services we offer.',
  },
  link: { es: 'Consultar el Sistema de Gestión Integrado', en: 'View our Integrated Management System' },
} satisfies Record<string, Loc>
</script>

<template>
  <section id="certificaciones" class="certs-band field-nube" aria-labelledby="certs-title">
    <div class="frame grid-page certs-band__grid">
      <h2 id="certs-title" class="subheading certs-band__title">{{ tr(copy.title) }}</h2>
      <div class="certs-band__intro">
        <p class="muted">{{ tr(copy.intro) }}</p>
        <NuxtLinkLocale to="/empresa/sistema-de-gestion-integrado" class="link">{{ tr(copy.link) }}</NuxtLinkLocale>
      </div>
      <CertificationList class="certs-band__list" />
    </div>
  </section>
</template>

<style scoped>
.certs-band {
  padding-block: var(--spacing-section-sm);
}

.certs-band__grid {
  row-gap: 1rem;
}

.certs-band__title,
.certs-band__intro,
.certs-band__list {
  grid-column: 1 / -1;
}

.certs-band__title {
  max-width: 14ch;
  color: var(--color-tinta);
}

.certs-band__intro {
  display: grid;
  justify-items: start;
  gap: 1rem;
  max-width: 34rem;
}

.certs-band__list {
  margin-top: 2rem;
}

@media (width >= 64rem) {
  .certs-band__title {
    grid-column: 1 / span 5;
  }

  .certs-band__intro {
    grid-column: 7 / -1;
    align-self: end;
  }
}
</style>
