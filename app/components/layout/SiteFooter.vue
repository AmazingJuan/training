<script setup lang="ts">
import { Phone, Mail, MessageCircle, MapPin, ArrowUp } from '@lucide/vue'
import { company, certifications, agreements, dataPolicy } from '~/data/company'
import { primaryNav, secondaryNav, contactNav } from '~/data/navigation'

const year = new Date().getFullYear()
const { tr } = useLang()
const copy = {
  directions: { es: 'Cómo llegar', en: 'Get directions' },
  maps: { es: '(abre Google Maps)', en: '(opens Google Maps)' },
  reach: { es: 'Contáctenos', en: 'Call or write' },
  footerNav: { es: 'Pie de página', en: 'Footer' },
  site: { es: 'Sitio', en: 'Site' },
  certs: { es: 'Certificaciones', en: 'Certifications' },
  agreements: { es: 'Convenios', en: 'Agreements' },
  top: { es: 'Volver arriba', en: 'Back to top' },
  newTab: { es: '(se abre en una pestaña nueva)', en: '(opens in a new tab)' },
  whatsapp: { es: 'Escribir por WhatsApp', en: 'Message us on WhatsApp' },
  and: { es: ' y ', en: ' and ' },
} satisfies Record<string, Loc>
// Break the long address only after the @, never inside the domain.
const [emailUser, emailDomain] = company.email.split('@')
// Lenis loads after the page (motion.client.ts): read it when needed.
const nuxtApp = useNuxtApp()

const siteLinks = [...primaryNav, contactNav, ...secondaryNav].filter(
  (item, i, all) => all.findIndex((x) => x.to === item.to) === i,
)

const legal: { label: Loc, href: string }[] = [
  { label: { es: 'Protección de datos personales', en: 'Personal data protection (in Spanish)' }, href: dataPolicy },
  { label: { es: 'LinkedIn', en: 'LinkedIn' }, href: company.social.linkedin },
  { label: { es: 'Facebook', en: 'Facebook' }, href: company.social.facebook },
]

function toTop() {
  if (nuxtApp.$lenis) nuxtApp.$lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
  document.getElementById('contenido')?.focus({ preventScroll: true })
}
</script>

<template>
  <footer class="footer field-hielo">
    <div class="frame footer__meta">
      <div class="meta__brand">
        <BrandLogo />
        <p class="meta__tagline">{{ tr(company.tagline) }}.</p>
      </div>

      <!-- Contact details, compact: the full contact page carries the form and channels. -->
      <section class="meta__block meta__contact" aria-labelledby="footer-contact">
        <h2 id="footer-contact" class="footer__label">{{ tr(copy.reach) }}</h2>
        <address class="contact__address">
          {{ company.address.building }}, {{ tr(company.address.office).toLowerCase() }}<br>
          {{ company.address.street }}<br>
          {{ company.address.area }}, {{ company.address.city }}
        </address>
        <ul class="contact__list">
          <li><Phone aria-hidden="true" /><a :href="company.phones[0].href">{{ company.phones[0].display }}</a></li>
          <li><Phone aria-hidden="true" /><a :href="company.phones[1].href">{{ company.phones[1].display }}</a></li>
          <li>
            <MessageCircle aria-hidden="true" />
            <a :href="company.whatsapp.href" target="_blank" rel="noopener">{{ tr(copy.whatsapp) }}<span class="visually-hidden"> {{ tr(copy.newTab) }}</span></a>
          </li>
          <li><Mail aria-hidden="true" /><a :href="`mailto:${company.email}`">{{ emailUser }}@<wbr>{{ emailDomain }}</a></li>
          <li>
            <MapPin aria-hidden="true" />
            <a :href="company.address.mapUrl" target="_blank" rel="noopener">{{ tr(copy.directions) }}<span class="visually-hidden"> {{ tr(copy.maps) }}</span></a>
          </li>
        </ul>
      </section>

      <nav class="meta__block" :aria-label="tr(copy.footerNav)">
        <h2 class="footer__label">{{ tr(copy.site) }}</h2>
        <ul class="meta__nav">
          <li v-for="item in siteLinks" :key="item.to">
            <NuxtLinkLocale :to="item.to" :target="item.to === '/intranet' ? '_blank' : undefined">
              {{ tr(item.label) }}<span v-if="item.to === '/intranet'" class="visually-hidden"> {{ tr(copy.newTab) }}</span>
            </NuxtLinkLocale>
          </li>
        </ul>
      </nav>

      <div class="meta__block">
        <h2 class="footer__label">{{ tr(copy.certs) }}</h2>
        <ul class="meta__certs">
          <li v-for="c in certifications" :key="c.code">
            <a :href="c.document" target="_blank" rel="noopener"><strong>{{ c.code }}</strong></a>
            <span>{{ tr(c.name) }}</span>
          </li>
        </ul>
        <h2 class="footer__label meta__gap">{{ tr(copy.agreements) }}</h2>
        <p class="meta__muted">{{ agreements.join(tr(copy.and)) }}</p>
      </div>
    </div>

    <div class="frame">
      <div class="colophon">
        <p>© {{ year }} {{ company.legalName }}</p>
        <ul class="colophon__links">
          <li v-for="l in legal" :key="l.href"><a :href="l.href" target="_blank" rel="noopener">{{ tr(l.label) }}</a></li>
        </ul>
        <button type="button" class="colophon__top" @click="toTop">
          <ArrowUp aria-hidden="true" />{{ tr(copy.top) }}
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  font-size: var(--text-sm);
  color: var(--color-tinta);
  border-top: 1px solid var(--color-linea);
}

.footer a {
  color: inherit;
  text-decoration: none;
  text-underline-offset: 0.2em;
}

.footer a:hover {
  text-decoration: underline;
}

.footer__meta {
  position: relative;
  display: grid;
  gap: 2.5rem;
  padding-block: var(--spacing-section-sm) 2.5rem;
}

.meta__tagline {
  max-width: 18rem;
  margin-top: 1rem;
  color: var(--color-pizarra);
}

.footer__label {
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
  letter-spacing: 0;
  color: var(--color-azul-hondo);
}

.meta__gap {
  margin-top: 1.5rem;
}

/* Contact column: address, phones, e-mail and directions, each with its icon. */
.contact__address {
  font-style: normal;
  line-height: 1.55;
}

.contact__list {
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
}

.contact__list li {
  display: grid;
  grid-template-columns: 1.125rem minmax(0, 1fr);
  gap: 0.625rem;
  align-items: start;
}

.contact__list svg {
  width: 1.125rem;
  height: 1.125rem;
  margin-top: 0.2rem;
  color: var(--color-azul);
}

.contact__list a {
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.meta__nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.375rem 1.5rem;
}

.meta__nav a:hover {
  color: var(--color-azul-hondo);
}

.meta__certs {
  display: grid;
  gap: 0.5rem;
}

.meta__certs li {
  display: grid;
}

.meta__certs a {
  color: var(--color-azul-hondo);
}

.meta__certs span,
.meta__muted {
  color: var(--color-pizarra);
}

.colophon {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 2rem;
  padding-block: 1.5rem 2rem;
  border-top: 1px solid var(--color-linea);
  color: var(--color-pizarra);
}

.colophon__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-right: auto;
}

.colophon__top {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding-inline: 0.75rem;
  /* The padding is hit area, not indent: the text lines up with the column. */
  margin-left: -0.75rem;
  border-radius: var(--radius-control);
  font-weight: 600;
  color: var(--color-azul-hondo);
  cursor: pointer;
}

.colophon__top:hover {
  background: var(--color-blanco);
}

.colophon__top svg {
  width: 1.125rem;
  height: 1.125rem;
  transition: transform var(--duration-base) var(--ease-out);
}

.colophon__top:hover svg {
  transform: translateY(-3px);
}

@media (width >= 48rem) {
  .footer__meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: var(--spacing-gutter);
  }
}

@media (width >= 64rem) {
  .footer__meta {
    grid-template-columns: minmax(0, 3fr) minmax(0, 3fr) minmax(0, 4fr) minmax(0, 3fr);
  }
}
</style>
