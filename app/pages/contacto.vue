<script setup lang="ts">
import { Phone, Mail, MapPin, MessageCircle } from '@lucide/vue'
import { company } from '~/data/company'

const { tr, lang } = useLang()
const copy = {
  title: { es: 'Contacto', en: 'Contact' },
  lede: {
    es: 'Solicite una cotización, consulte la próxima cohorte de un programa o radique una petición, queja o reclamo.',
    en: 'Request a quotation, ask about the next cohort of a program, or submit a request, complaint or claim.',
  },
  call: { es: 'Llamar', en: 'Call' },
  region: { es: 'Formulario y canales de contacto', en: 'Contact form and channels' },
  direct: { es: '¿Prefiere comunicarse directamente?', en: 'Would you rather talk to us directly?' },
  phones: { es: 'Teléfonos', en: 'Phone numbers' },
  email: { es: 'Correo electrónico', en: 'Email' },
  office: { es: 'Sede administrativa', en: 'Administrative offices' },
} satisfies Record<string, Loc>
usePageSeo({
  title: tr({ es: 'Contacto y cotizaciones en Medellín', en: 'Contact and quotations, Medellín' }),
  description: tr({
    es: 'Solicite una cotización o información sobre formación, o radique una petición, queja o reclamo. Teléfonos, WhatsApp, correo electrónico y sede en Medellín.',
    en: 'Request a quotation or information about training, or submit a request, complaint or claim. Phone, WhatsApp, email and offices in Medellín, Colombia.',
  }),
})
</script>

<template>
  <div>
    <PageHeader
      :title="tr(copy.title)"
      :lede="tr(copy.lede)"
    >
      <!-- Phones only: the channels panel sits below the long form there, so call and chat come first. -->
      <div class="quick">
        <a :href="company.phones[0].href" class="quick__link"><Phone aria-hidden="true" />{{ tr(copy.call) }}</a>
        <a :href="company.whatsapp.href" target="_blank" rel="noopener" class="quick__link"><MessageCircle aria-hidden="true" />WhatsApp</a>
      </div>
    </PageHeader>

    <section class="contact" :aria-label="tr(copy.region)">
      <div class="frame grid-page contact__grid">
        <div class="contact__form">
          <ContactForm />
        </div>

        <div class="contact__channels field-azul">
          <h2 id="canales" class="subheading">{{ tr(copy.direct) }}</h2>
          <ul class="channels">
            <li>
              <Phone aria-hidden="true" />
              <div>
                <p class="channels__label">{{ tr(copy.phones) }}</p>
                <a v-for="p in company.phones" :key="p.href" :href="p.href" class="channels__value">{{ tr({ es: p.display, en: p.intl }) }}</a>
              </div>
            </li>
            <li>
              <MessageCircle aria-hidden="true" />
              <div>
                <p class="channels__label">WhatsApp</p>
                <a :href="company.whatsapp.href" target="_blank" rel="noopener" class="channels__value">{{ company.whatsapp.display }}</a>
              </div>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <div>
                <p class="channels__label">{{ tr(copy.email) }}</p>
                <a :href="`mailto:${company.email}`" class="channels__value channels__email">{{ company.email.split('@')[0] }}@<wbr>{{ company.email.split('@')[1] }}</a>
              </div>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <div>
                <p class="channels__label">{{ tr(copy.office) }}</p>
                <a :href="company.address.mapUrl" target="_blank" rel="noopener" class="channels__value">
                  {{ company.address.building }}, {{ tr(company.address.office).toLowerCase() }}<br>{{ company.address.street }}<br>{{ company.address.area }}, {{ company.address.city }}<template v-if="lang === 'en'">, Colombia</template>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.quick {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.quick__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.5rem 1.125rem;
  border: 2px solid var(--color-azul);
  border-radius: var(--radius-control);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-azul);
  text-decoration: none;
}

.quick__link svg {
  width: 1.125rem;
  height: 1.125rem;
}

@media (width >= 64rem) {
  .quick {
    display: none;
  }
}

.contact {
  padding-bottom: var(--spacing-section);
}

.contact__grid {
  row-gap: 3rem;
  align-items: start;
}

.contact__form,
.contact__channels {
  grid-column: 1 / -1;
}

.contact__channels {
  padding: clamp(1.5rem, 1rem + 2vw, 2.5rem);
}

.channels {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.75rem;
}

.channels li {
  display: grid;
  grid-template-columns: 1.5rem minmax(0, 1fr);
  gap: 1rem;
}

.channels svg {
  width: 1.5rem;
  height: 1.5rem;
}

.channels__label {
  font-size: var(--text-xs);
  font-weight: 700;
}

.channels__value {
  display: block;
  font-size: var(--text-lg);
  font-weight: 600;
  color: inherit;
  text-decoration: none;
}

.channels__value:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.channels__email {
  font-size: var(--text-base);
  overflow-wrap: anywhere;
}

@media (width >= 64rem) {
  .contact__form { grid-column: 1 / span 7; }
  .contact__channels { grid-column: 8 / -1; position: sticky; top: calc(var(--header-offset) + 1.5rem); }
}
</style>
