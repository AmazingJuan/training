<script setup lang="ts">
import { Phone, Mail, MapPin, MessageCircle, Navigation } from '@lucide/vue'
import { company } from '~/data/company'
import { courses } from '~/data/courses'
import { findService } from '~/data/services'

/**
 * Contact without a form (the company has no way to process web submissions
 * yet): the channels, and a map of the office. Links such as
 * /contacto?asunto=cotizacion&linea=hseq or ?asunto=formacion&programa=…
 * turn the e-mail and WhatsApp buttons into that request, with its subject
 * already written. The page is prerendered without a query string, so the
 * request is read after hydration.
 */
const route = useRoute()
const { tr, lang } = useLang()

const copy = {
  title: { es: 'Contacto', en: 'Contact' },
  lede: {
    es: 'Para solicitar una cotización o información sobre nuestros servicios, escríbanos o llámenos. Con gusto le atenderemos.',
    en: 'To request a quotation or information about our services, write to us or call us. We will be glad to help.',
  },
  yourRequest: { es: 'Su solicitud', en: 'Your request' },
  write: { es: 'Escribir un correo', en: 'Send an email' },
  phones: { es: 'Teléfonos', en: 'Phone numbers' },
  email: { es: 'Correo electrónico', en: 'Email' },
  office: { es: 'Sede administrativa', en: 'Administrative offices' },
  directions: { es: 'Cómo llegar', en: 'Get directions' },
  maps: { es: '(Google Maps, se abre en una pestaña nueva)', en: '(Google Maps, opens in a new tab)' },
  channels: { es: 'Canales de contacto', en: 'Contact channels' },
  where: { es: 'Dónde estamos', en: 'Where we are' },
  pqrsA: { es: '¿Desea radicar una petición, queja, reclamo o felicitación? Use el', en: 'Would you like to submit a request, complaint, claim or compliment? Please use the' },
  pqrsLink: { es: 'formulario de PQRS', en: 'PQRS form' },
} satisfies Record<string, Loc>

usePageSeo({
  title: tr({ es: 'Contacto y cotizaciones en Medellín', en: 'Contact and quotations, Medellín' }),
  description: tr({
    es: 'Solicite una cotización o información sobre formación. Teléfonos, WhatsApp, correo electrónico y ubicación de nuestra sede en Medellín.',
    en: 'Request a quotation or information about training. Phone, WhatsApp, email and the location of our offices in Medellín, Colombia.',
  }),
})

/** The request the visitor came with, as an e-mail subject; always in Spanish, the company's language. */
const request = ref<{ subject: string, label: string } | null>(null)
onMounted(() => {
  const q = route.query
  const line = findService(String(q.linea ?? ''))
  const course = courses.find((c) => c.slug === q.programa)
  if (course) {
    request.value = { subject: `Información sobre el ${course.name.es.toLowerCase()}`, label: tr(course.name) }
  }
  else if (q.asunto === 'formacion') {
    request.value = line
      ? { subject: `Información sobre formación en ${line.name.es}`, label: `${tr({ es: 'Formación en', en: 'Training in' })} ${tr(line.name)}` }
      : { subject: 'Información sobre formación', label: tr({ es: 'Información sobre formación', en: 'Information about training' }) }
  }
  else if (q.asunto === 'cotizacion') {
    request.value = line
      ? { subject: `Solicitud de cotización: ${line.name.es}`, label: `${tr({ es: 'Cotización en', en: 'Quotation for' })} ${tr(line.name)}` }
      : { subject: 'Solicitud de cotización', label: tr({ es: 'Cotización de un servicio', en: 'Quotation for a service' }) }
  }
})

// A short outline in the body, so the first e-mail already says what the company needs to reply.
const mailto = computed(() => {
  const subject = request.value?.subject ?? 'Contacto desde el sitio web'
  const body = 'Nombre:\nOrganización:\nTeléfono:\n\nQué necesitamos (norma, alcance, fecha prevista):\n'
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})
const whatsapp = computed(() => {
  const text = request.value ? `Hola, escribo desde el sitio web. ${request.value.subject}.` : 'Hola, escribo desde el sitio web.'
  return `${company.whatsapp.href}?text=${encodeURIComponent(text)}`
})
</script>

<template>
  <div>
    <PageHeader :title="tr(copy.title)" :lede="tr(copy.lede)" />

    <section class="contact" :aria-label="tr(copy.channels)">
      <div class="frame grid-page contact__grid">
        <div class="contact__info">
          <p v-if="request" class="request">
            <span class="request__label">{{ tr(copy.yourRequest) }}</span>
            {{ request.label }}
          </p>

          <div class="contact__actions">
            <UiButton :href="mailto">
              <template #icon><Mail aria-hidden="true" /></template>
              {{ tr(copy.write) }}
            </UiButton>
            <UiButton :href="whatsapp" variant="outline" external>
              <template #icon><MessageCircle aria-hidden="true" /></template>
              WhatsApp
            </UiButton>
          </div>

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
                <a :href="whatsapp" target="_blank" rel="noopener" class="channels__value">{{ company.whatsapp.display }}</a>
              </div>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <div>
                <p class="channels__label">{{ tr(copy.email) }}</p>
                <a :href="mailto" class="channels__value channels__email">{{ company.email.split('@')[0] }}@<wbr>{{ company.email.split('@')[1] }}</a>
              </div>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <div>
                <p class="channels__label">{{ tr(copy.office) }}</p>
                <p class="channels__value">
                  {{ company.address.building }}, {{ tr(company.address.office).toLowerCase() }}<br>{{ company.address.street }}<br>{{ company.address.area }}, {{ company.address.city }}<template v-if="lang === 'en'">, Colombia</template>
                </p>
                <a :href="company.address.mapUrl" target="_blank" rel="noopener" class="link channels__directions">
                  <Navigation aria-hidden="true" />{{ tr(copy.directions) }}<span class="visually-hidden"> {{ tr(copy.maps) }}</span>
                </a>
              </div>
            </li>
          </ul>

          <p class="pqrs muted">{{ tr(copy.pqrsA) }} <NuxtLinkLocale to="/pqrs" class="link">{{ tr(copy.pqrsLink) }}</NuxtLinkLocale>.</p>
        </div>

        <div class="contact__map">
          <h2 class="visually-hidden">{{ tr(copy.where) }}</h2>
          <ClientOnly>
            <ContactMap />
            <template #fallback>
              <div class="map-placeholder" />
            </template>
          </ClientOnly>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact {
  padding-bottom: var(--spacing-section);
}

.contact__grid {
  row-gap: 3rem;
}

.contact__info,
.contact__map {
  grid-column: 1 / -1;
}

.request {
  display: grid;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-azul);
  border-radius: var(--radius-control);
  background: var(--color-nube);
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-tinta);
}

.request__label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  color: var(--color-azul-hondo);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.channels {
  display: grid;
  gap: 1.5rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 2px solid var(--color-azul);
}

.channels li {
  display: grid;
  grid-template-columns: 1.5rem minmax(0, 1fr);
  gap: 1rem;
}

.channels > li > svg {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.125rem;
  color: var(--color-azul);
}

.channels__label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.channels__value {
  display: block;
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-tinta);
  text-decoration: none;
}

a.channels__value:hover {
  color: var(--color-azul);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.channels__email {
  font-size: var(--text-base);
  overflow-wrap: anywhere;
}

.channels__directions {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.5rem;
  font-weight: 600;
}

.channels__directions svg {
  width: 1rem;
  height: 1rem;
}

.pqrs {
  margin-top: 2.5rem;
  font-size: var(--text-sm);
}

.map-placeholder {
  height: clamp(20rem, 50vw, 34rem);
  border-radius: var(--radius-control);
  background: var(--color-nube);
}

@media (width < 30rem) {
  .contact__actions > * {
    flex: 1 1 100%;
  }
}

@media (width >= 64rem) {
  .contact__info { grid-column: 1 / span 5; }
  .contact__map {
    grid-column: 6 / -1;
    position: sticky;
    top: calc(var(--header-offset) + 1.5rem);
    align-self: start;
  }
}
</style>
