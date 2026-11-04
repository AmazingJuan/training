<script setup lang="ts">
import { CircleCheck, CircleAlert, X } from '@lucide/vue'
import { services, findMode, findService, servicePath, offerText } from '~/data/services'
import { courses } from '~/data/courses'
import { company, dataPolicy } from '~/data/company'

const route = useRoute()
const quote = useQuote()
const { tr, lang } = useLang()
const quoteLabel = (mode: string, line: string, l: Lang = lang.value) => {
  const m = findMode(mode)
  const s = findService(line)
  return `${m ? m.name[l] : ''}, ${s ? s.short[l] : ''}`
}

const copy = {
  sentQuote: { es: 'Solicitud enviada', en: 'Request sent' },
  sentMsg: { es: 'Mensaje enviado', en: 'Message sent' },
  reply: { es: 'Le responderemos a', en: 'We will reply to' },
  urgent: { es: 'Si es urgente, comuníquese al', en: 'If it is urgent, please call' },
  failedTitle: { es: 'No fue posible enviar el mensaje desde el sitio', en: 'The message could not be sent from the website' },
  writeTo: { es: 'Escríbanos a', en: 'Please write to' },
  orCall: { es: 'o comuníquese al', en: 'or call' },
  kept: { es: 'Sus datos se conservan en el formulario.', en: 'Your details are still in the form.' },
  need: { es: '¿Qué necesita?', en: 'What do you need?' },
  picked: { es: 'Servicios de su solicitud', en: 'Services in your request' },
  remove: { es: 'Retirar', en: 'Remove' },
  addMore: { es: 'Agregar más servicios', en: 'Add more services' },
  name: { es: 'Nombre', en: 'Name' },
  org: { es: 'Organización', en: 'Organization' },
  email: { es: 'Correo electrónico', en: 'Email' },
  phone: { es: 'Teléfono', en: 'Phone' },
  line: { es: 'Línea de servicio', en: 'Service line' },
  message: { es: 'Mensaje', en: 'Message' },
  hintPqr: { es: 'Incluya la fecha y el servicio al que se refiere.', en: 'Please include the date and the service it concerns.' },
  hint: { es: 'Indicar la norma, el alcance o la fecha prevista nos permite responder con mayor precisión.', en: 'Mentioning the standard, scope or expected date helps us reply more precisely.' },
  honeypot: { es: 'No llenar', en: 'Leave blank' },
  consentA: { es: 'Autorizo el tratamiento de mis datos personales para atender esta solicitud, conforme a la', en: 'I authorize the processing of my personal data to handle this request, in accordance with the' },
  consentLink: { es: 'manual de protección de datos personales', en: 'personal data protection manual (in Spanish)' },
  sending: { es: 'Enviando…', en: 'Sending…' },
  sendQuote: { es: 'Enviar solicitud', en: 'Send request' },
  sendMsg: { es: 'Enviar mensaje', en: 'Send message' },
} satisfies Record<string, Loc>
const reviewTitle = computed(() => {
  const n = Object.keys(errors.value).length
  return lang.value === 'en'
    ? `Please review ${n === 1 ? 'one field' : `${n} fields`} before sending`
    : `Revise ${n === 1 ? 'un campo' : `${n} campos`} antes de enviar`
})

const form = reactive<ContactRequest>({
  nombre: '',
  empresa: '',
  correo: '',
  telefono: '',
  tipo: '',
  linea: '',
  mensaje: '',
  servicios: [],
  datos: false,
  idioma: 'es',
  web: '',
})

// The page is prerendered without a query string, so links such as
// /contacto?linea=hseq or ?asunto=formacion&programa=… prefill after hydration.
onMounted(() => {
  const q = route.query
  const kind = String(q.asunto ?? q.tipo ?? '')
  const programa = courses.find((c) => c.slug === q.programa)
  if (requestKinds.some((k) => k.value === kind)) form.tipo = kind as RequestKind
  else if (q.linea) form.tipo = 'cotizacion'
  if (services.some((s) => s.slug === q.linea)) form.linea = String(q.linea)
  else if (programa?.line) form.linea = programa.line
  if (programa) {
    form.mensaje = lang.value === 'en'
      ? `I would like information about the next cohort of the ${programa.name.en.toLowerCase()}.`
      : `Quisiera recibir información sobre la próxima cohorte del ${programa.name.es.toLowerCase()}.`
  }
})

// Services marked while browsing make this a quote request.
watch(quote.count, (n) => { if (n && !form.tipo) form.tipo = 'cotizacion' }, { immediate: true })

const errors = ref<ContactErrors>({})
const status = ref<'idle' | 'sending' | 'sent' | 'failed'>('idle')
const summary = useTemplateRef<HTMLElement>('summary')

// Each error in the summary takes the visitor to the field it is about.
function focusField(name: string) {
  const field = summary.value?.closest('form')?.querySelector<HTMLElement>(`[name="${name}"]`)
  field?.focus({ preventScroll: true })
  field?.scrollIntoView({ block: 'center', behavior: 'smooth' })
}
const done = useTemplateRef<HTMLElement>('done')

const lineOptions = computed(() => services.map((s) => ({ value: s.slug, label: tr(s.name) })))

async function submit() {
  // The company receives the services in Spanish, whatever language the visitor uses.
  form.servicios = quote.items.value.map((i) => `${quoteLabel(i.mode, i.line, 'es')}: ${i.text}`)
  form.idioma = lang.value
  errors.value = validateContact(form, lang.value)
  if (Object.keys(errors.value).length) {
    await nextTick()
    summary.value?.focus()
    return
  }
  status.value = 'sending'
  try {
    await $fetch('/api/contacto', { method: 'POST', body: form })
    status.value = 'sent'
    quote.clear()
    await nextTick()
    done.value?.focus()
  }
  catch {
    status.value = 'failed'
    await nextTick()
    summary.value?.focus()
  }
}
</script>

<template>
  <div class="contact-form">
    <div v-if="status === 'sent'" ref="done" class="notice notice--ok" tabindex="-1" role="status">
      <CircleCheck aria-hidden="true" />
      <div>
        <p class="notice__title">{{ form.servicios.length ? tr(copy.sentQuote) : tr(copy.sentMsg) }}</p>
        <p>{{ tr(copy.reply) }} {{ form.correo }}. {{ tr(copy.urgent) }} {{ tr({ es: company.phones[0].display, en: company.phones[0].intl }) }}.</p>
      </div>
    </div>

    <form v-else novalidate @submit.prevent="submit">
      <div ref="summary" tabindex="-1" class="summary-anchor">
        <div v-if="Object.keys(errors).length" class="notice notice--error" role="alert">
          <CircleAlert aria-hidden="true" />
          <div>
            <p class="notice__title">{{ reviewTitle }}</p>
            <ul><li v-for="(msg, key) in errors" :key="key"><a :href="`#${key}`" class="link" @click.prevent="focusField(key)">{{ msg }}</a></li></ul>
          </div>
        </div>
        <div v-else-if="status === 'failed'" class="notice notice--error" role="alert">
          <CircleAlert aria-hidden="true" />
          <div>
            <p class="notice__title">{{ tr(copy.failedTitle) }}</p>
            <p>
              {{ tr(copy.writeTo) }} <a :href="`mailto:${company.email}`" class="link">{{ company.email }}</a>
              {{ tr(copy.orCall) }} <a :href="company.phones[0].href" class="link">{{ tr({ es: company.phones[0].display, en: company.phones[0].intl }) }}</a>. {{ tr(copy.kept) }}
            </p>
          </div>
        </div>
      </div>

      <fieldset class="kinds">
        <legend class="kinds__legend">{{ tr(copy.need) }}</legend>
        <div class="kinds__options" :aria-describedby="errors.tipo ? 'tipo-error' : undefined">
          <label v-for="k in requestKinds" :key="k.value" class="kind">
            <input v-model="form.tipo" type="radio" name="tipo" :value="k.value" class="kind__input">
            <span class="kind__label">{{ tr(k.label) }}</span>
          </label>
        </div>
        <p v-if="errors.tipo" id="tipo-error" class="kinds__error">{{ errors.tipo }}</p>
      </fieldset>

      <section v-if="quote.count.value" class="picked" aria-labelledby="picked-title">
        <h2 id="picked-title" class="picked__title">{{ tr(copy.picked) }} ({{ quote.count.value }})</h2>
        <ul class="picked__list">
          <li v-for="i in quote.items.value" :key="`${i.mode}${i.line}${i.text}`" class="picked__item">
            <span>
              <NuxtLinkLocale :to="servicePath(i.mode, i.line)" class="picked__meta">{{ quoteLabel(i.mode, i.line) }}</NuxtLinkLocale>
              {{ offerText(i.text, lang) }}
            </span>
            <button type="button" class="picked__remove" @click="quote.remove(i)">
              <X aria-hidden="true" /><span class="visually-hidden">{{ tr(copy.remove) }} {{ offerText(i.text, lang) }}</span>
            </button>
          </li>
        </ul>
        <NuxtLinkLocale to="/portafolio-de-servicios" class="link picked__more">{{ tr(copy.addMore) }}</NuxtLinkLocale>
      </section>

      <div class="grid2">
        <UiField v-model="form.nombre" :label="tr(copy.name)" name="nombre" required autocomplete="name" :error="errors.nombre" />
        <UiField v-model="form.empresa" :label="tr(copy.org)" name="empresa" autocomplete="organization" />
        <UiField v-model="form.correo" :label="tr(copy.email)" name="correo" type="email" required autocomplete="email" :error="errors.correo" />
        <UiField v-model="form.telefono" :label="tr(copy.phone)" name="telefono" type="tel" autocomplete="tel" :error="errors.telefono" />
      </div>

      <UiField v-if="form.tipo !== 'pqr' && !quote.count.value" v-model="form.linea" :label="tr(copy.line)" name="linea" type="select" :options="lineOptions" />
      <UiField
        v-model="form.mensaje"
        :label="tr(copy.message)"
        name="mensaje"
        type="textarea"
        :required="!quote.count.value"
        :hint="form.tipo === 'pqr' ? tr(copy.hintPqr) : tr(copy.hint)"
        :error="errors.mensaje"
      />

      <div class="hp" aria-hidden="true">
        <label>{{ tr(copy.honeypot) }} <input v-model="form.web" type="text" name="web" tabindex="-1" autocomplete="off"></label>
      </div>

      <div class="consent" :class="{ 'consent--error': errors.datos }">
        <label class="consent__label">
          <input v-model="form.datos" type="checkbox" name="datos" :aria-invalid="errors.datos ? true : undefined" :aria-describedby="errors.datos ? 'datos-error' : undefined">
          <span>
            {{ tr(copy.consentA) }}
            <a :href="dataPolicy" class="link" target="_blank" rel="noopener">{{ tr(copy.consentLink) }}</a>.
          </span>
        </label>
        <p v-if="errors.datos" id="datos-error" class="kinds__error">{{ errors.datos }}</p>
      </div>

      <UiButton type="submit" :disabled="status === 'sending'">
        {{ status === 'sending' ? tr(copy.sending) : quote.count.value ? tr(copy.sendQuote) : tr(copy.sendMsg) }}
      </UiButton>
    </form>
  </div>
</template>

<style scoped>
form {
  display: grid;
  gap: 1.75rem;
}

.picked {
  padding: 1.25rem 1.5rem;
  border: 2px solid var(--color-azul);
  border-radius: 10px;
}

.picked__title {
  font-size: var(--text-lg);
  letter-spacing: 0;
  color: var(--color-azul-hondo);
}

.picked__list {
  margin-top: 0.75rem;
}

.picked__item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
  padding-block: 0.625rem;
  border-bottom: 1px solid var(--color-linea);
}

.picked__meta {
  display: block;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.picked__remove {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  color: var(--color-pizarra);
  cursor: pointer;
}

.picked__remove:hover {
  background: var(--color-nube);
  color: var(--color-error);
}

.picked__remove svg {
  width: 1.125rem;
  height: 1.125rem;
}

.picked__more {
  display: inline-block;
  margin-top: 1rem;
  font-size: var(--text-sm);
}

.summary-anchor:focus {
  outline: none;
}

.notice {
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-left: 4px solid;
  border-radius: var(--radius-control);
}

.notice svg {
  width: 1.5rem;
  height: 1.5rem;
}

.notice:focus {
  outline: var(--focus-ring);
  outline-offset: 3px;
}

.notice--ok {
  background: var(--color-nube);
  border-color: var(--color-azul);
  color: var(--color-tinta);
}

.notice--ok svg {
  color: var(--color-azul);
}

.notice--error {
  background: #fbeeed;
  border-color: var(--color-error);
}

.notice--error svg {
  color: var(--color-error);
}

.notice__title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.notice ul {
  list-style: disc;
  padding-left: 1.25rem;
}

.notice--error .link {
  color: var(--color-error);
}

.kinds {
  border: 0;
  padding: 0;
  margin: 0;
}

.kinds__legend {
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.kinds__options {
  display: grid;
  gap: 0.5rem;
}

.kind {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 3.25rem;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-linea);
  border-radius: var(--radius-control);
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out), background-color var(--duration-fast) var(--ease-out);
}

.kind:hover {
  border-color: var(--color-pizarra);
}

.kind:has(:checked) {
  border-color: var(--color-azul);
  background: var(--color-nube);
}

.kind:has(:focus-visible) {
  outline: var(--focus-ring);
  outline-offset: 2px;
}

.kind__input {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: var(--color-azul);
}

.kind__label {
  font-weight: 600;
}

.kinds__error {
  margin-top: 0.5rem;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-error);
}

.grid2 {
  display: grid;
  gap: 1.75rem var(--spacing-gutter);
}

.hp {
  position: absolute;
  left: -9999px;
}

.consent__label {
  display: grid;
  grid-template-columns: 1.25rem 1fr;
  gap: 0.75rem;
  align-items: start;
  font-size: var(--text-sm);
  cursor: pointer;
}

.consent__label input {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.15rem;
  accent-color: var(--color-azul);
}

form > :deep(.btn) {
  justify-self: start;
}

@media (width >= 40rem) {
  .kinds__options {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
