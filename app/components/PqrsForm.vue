<script setup lang="ts">
import { Check, CircleCheck, CircleAlert, HeartHandshake, Paperclip, Phone, Mail, MessageCircle, X } from '@lucide/vue'
import { company, dataPolicy } from '~/data/company'

/**
 * PQRS, one step at a time (the same pattern as the quotation request of the
 * intranet): a step list on large screens, a progress bar on phones, and a
 * review before sending. Each step validates only its own fields.
 */
const { tr, lang } = useLang()

const copy = {
  steps: { es: 'Pasos de su solicitud', en: 'Steps of your request' },
  stepOf: { es: 'Paso {n} de {t}', en: 'Step {n} of {t}' },
  locked: { es: 'se habilita al completar los pasos anteriores', en: 'available once the previous steps are complete' },
  done: { es: 'completo', en: 'complete' },
  back: { es: 'Atrás', en: 'Back' },
  next: { es: 'Continuar', en: 'Continue' },
  otherWhat: { es: '¿Cuál?', en: 'What is it about?' },
  apologyTitle: { es: 'Lamentamos lo sucedido', en: 'We are sorry about what happened' },
  apology: {
    es: 'Le ofrecemos disculpas por los inconvenientes. Cuéntenos qué pasó: revisaremos su caso con atención y le informaremos por correo electrónico las acciones que tomaremos.',
    en: 'Please accept our apologies for the inconvenience. Tell us what happened: we will review your case carefully and let you know by email what we will do about it.',
  },
  serviceDate: { es: 'Fecha del servicio', en: 'Date of the service' },
  servicePerson: { es: 'Persona que prestó el servicio', en: 'Person who delivered the service' },
  servicePersonHint: { es: 'Si se trata de una inspección, indique el nombre del examinador.', en: 'For an inspection, please give the examiner’s name.' },
  description: { es: 'Descripción', en: 'Description' },
  descriptionHint: { es: 'Indique qué pasó, cuándo y, si aplica, qué espera que hagamos.', en: 'Tell us what happened, when, and, if applicable, what you expect us to do.' },
  files: { es: 'Soportes', en: 'Supporting documents' },
  filesHint: { es: 'Hasta 4 archivos PDF, de imagen, Word o Excel, de 2,5 MB en total. Si pesan más, envíelos respondiendo al correo de confirmación.', en: 'Up to 4 PDF, image, Word or Excel files, 2.5 MB in total. If they are larger, send them by replying to the confirmation email.' },
  addFiles: { es: 'Adjuntar archivos', en: 'Attach files' },
  remove: { es: 'Retirar', en: 'Remove' },
  detailsLede: { es: 'Déjenos sus datos y lo contactaremos.', en: 'Leave us your details and we will contact you.' },
  name: { es: 'Nombre completo', en: 'Full name' },
  org: { es: 'Empresa', en: 'Company' },
  document: { es: 'NIT o cédula', en: 'Tax ID or ID number' },
  email: { es: 'Correo electrónico', en: 'Email' },
  emailHint: { es: 'Le enviaremos aquí el número de su solicitud y la respuesta.', en: 'We will send your request number and our reply here.' },
  phone: { es: 'Teléfono fijo o celular', en: 'Phone or mobile' },
  address: { es: 'Dirección', en: 'Address' },
  city: { es: 'Municipio o ciudad', en: 'City or municipality' },
  reviewLede: { es: 'Revise su solicitud antes de enviarla. Puede corregir cualquier paso.', en: 'Review your request before sending it. You can correct any step.' },
  edit: { es: 'Corregir', en: 'Edit' },
  rKind: { es: 'Solicitud', en: 'Request' },
  rSource: { es: 'Relacionada con', en: 'Relates to' },
  rService: { es: 'Servicio', en: 'Service' },
  rDescription: { es: 'Descripción', en: 'Description' },
  rFiles: { es: 'Soportes', en: 'Supporting documents' },
  rContact: { es: 'Sus datos', en: 'Your details' },
  none: { es: 'Ninguno', en: 'None' },
  honeypot: { es: 'No llenar', en: 'Leave blank' },
  consentA: { es: 'Autorizo el tratamiento de mis datos personales para tramitar esta solicitud, conforme al', en: 'I authorize the processing of my personal data to handle this request, in accordance with the' },
  consentLink: { es: 'manual de protección de datos personales', en: 'personal data protection manual (in Spanish)' },
  sending: { es: 'Enviando…', en: 'Sending…' },
  send: { es: 'Enviar solicitud', en: 'Send request' },
  thanks: { es: 'Gracias por permitirnos mejorar', en: 'Thank you for helping us improve' },
  received: { es: 'Recibimos su solicitud. Le enviaremos el número de solicitud y la respuesta a', en: 'We have received your request. We will send the request number and our reply to' },
  receivedSorry: { es: 'De nuevo, le ofrecemos disculpas por lo sucedido.', en: 'Once again, please accept our apologies.' },
  urgent: { es: 'Si necesita comunicarse antes, llame al', en: 'If you need to reach us sooner, please call' },
  failedTitle: { es: 'No fue posible enviar la solicitud desde el sitio', en: 'The request could not be sent from the website' },
  writeTo: { es: 'Escríbanos a', en: 'Please write to' },
  orCall: { es: 'o comuníquese al', en: 'or call' },
  kept: { es: 'Sus datos se conservan en el formulario.', en: 'Your details are still in the form.' },
  tooBig: { es: 'Los archivos superan los 2,5 MB en total o no son PDF, imagen, Word o Excel.', en: 'The files exceed 2.5 MB in total or are not PDF, image, Word or Excel files.' },
  prefer: { es: '¿Prefiere comunicarse directamente?', en: 'Would you rather talk to us directly?' },
} satisfies Record<string, Loc>

/** The steps of the format, each with the fields it validates. */
const steps: { id: string, title: Loc, short: Loc, fields: (keyof PqrsRequest)[] }[] = [
  { id: 'tipo', title: { es: '¿Qué desea comunicarnos?', en: 'What would you like to tell us?' }, short: { es: 'Tipo', en: 'Type' }, fields: ['tipo', 'tipoOtro'] },
  { id: 'fuente', title: { es: '¿Con qué está relacionada?', en: 'What does it relate to?' }, short: { es: 'Relación', en: 'Relates to' }, fields: ['fuente', 'fechaServicio'] },
  { id: 'detalle', title: { es: 'Cuéntenos lo sucedido', en: 'Tell us what happened' }, short: { es: 'Lo sucedido', en: 'What happened' }, fields: ['descripcion', 'soportes'] },
  { id: 'datos', title: { es: 'Sus datos', en: 'Your details' }, short: { es: 'Sus datos', en: 'Your details' }, fields: ['nombre', 'documento', 'correo', 'telefono', 'municipio'] },
  { id: 'revision', title: { es: 'Revisar y enviar', en: 'Review and send' }, short: { es: 'Revisión', en: 'Review' }, fields: ['datos'] },
]

const form = reactive<PqrsRequest>({
  tipo: '',
  tipoOtro: '',
  fuente: '',
  fechaServicio: '',
  personaServicio: '',
  descripcion: '',
  soportes: [],
  nombre: '',
  empresa: '',
  documento: '',
  correo: '',
  telefono: '',
  direccion: '',
  municipio: '',
  datos: false,
  idioma: 'es',
  web: '',
})

const today = new Date().toISOString().slice(0, 10)
const current = ref(0)
const reached = ref(0)
const errors = ref<PqrsErrors>({})
const status = ref<'idle' | 'sending' | 'sent' | 'failed'>('idle')
const fileError = ref('')
const root = useTemplateRef<HTMLElement>('root')
const heading = useTemplateRef<HTMLElement>('heading')
const done = useTemplateRef<HTMLElement>('done')
const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

const step = computed(() => steps[current.value]!)
const last = computed(() => current.value === steps.length - 1)
const apologize = computed(() => !!form.tipo && pqrsApologyKinds.includes(form.tipo))
const stepOf = computed(() => tr(copy.stepOf).replace('{n}', String(current.value + 1)).replace('{t}', String(steps.length)))

function stepErrors(i: number): PqrsErrors {
  const all = validatePqrs(form, lang.value, today)
  return Object.fromEntries(Object.entries(all).filter(([k]) => steps[i]!.fields.includes(k as keyof PqrsRequest)))
}
const complete = computed(() => steps.map((_, i) => i < steps.length - 1 && Object.keys(stepErrors(i)).length === 0))

async function show(i: number) {
  current.value = i
  errors.value = {}
  await nextTick()
  root.value?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  heading.value?.focus({ preventScroll: true })
}

async function next() {
  if (current.value === 1 && form.fuente !== 'servicio') {
    form.fechaServicio = ''
    form.personaServicio = ''
  }
  if (form.tipo !== 'otro') form.tipoOtro = ''
  errors.value = stepErrors(current.value)
  const first = Object.keys(errors.value)[0]
  if (first) {
    await nextTick()
    root.value?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
    return
  }
  if (last.value) return submit()
  reached.value = Math.max(reached.value, current.value + 1)
  show(current.value + 1)
}

const label = <T extends { value: string, label: Loc }>(list: readonly T[], v: string) => list.find((x) => x.value === v)?.label ?? { es: v, en: v }

const size = (bytes: number) => bytes < 1024 * 1024
  ? `${Math.max(1, Math.round(bytes / 1024))} KB`
  : `${(bytes / 1024 / 1024).toFixed(1).replace('.', lang.value === 'es' ? ',' : '.')} MB`

function readFile(file: File) {
  return new Promise<PqrsFile>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve({ nombre: file.name, tipo: file.type, peso: file.size, contenido: String(reader.result).split(',')[1] ?? '' })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function addFiles(event: Event) {
  const picked = Array.from((event.target as HTMLInputElement).files ?? [])
  fileError.value = ''
  const next = [...form.soportes]
  for (const file of picked) {
    if (next.length >= pqrsFiles.max) break
    next.push(await readFile(file))
  }
  const total = next.reduce((n, f) => n + f.peso, 0)
  if (total > pqrsFiles.totalBytes || next.some((f) => !(pqrsFiles.types as readonly string[]).includes(f.tipo))) fileError.value = tr(copy.tooBig)
  else form.soportes = next
  if (fileInput.value) fileInput.value.value = ''
}

async function submit() {
  form.idioma = lang.value
  const all = validatePqrs(form, lang.value, today)
  const wrong = steps.findIndex((s) => s.fields.some((f) => f in all))
  if (wrong !== -1 && wrong !== current.value) {
    await show(wrong)
    errors.value = stepErrors(wrong)
    return
  }
  status.value = 'sending'
  try {
    await $fetch('/api/pqrs', { method: 'POST', body: form })
    status.value = 'sent'
    await nextTick()
    done.value?.focus()
  }
  catch {
    status.value = 'failed'
  }
}
</script>

<template>
  <div ref="root" class="wizard">
    <div v-if="status === 'sent'" ref="done" class="notice notice--ok wizard__done" tabindex="-1" role="status">
      <CircleCheck aria-hidden="true" />
      <div>
        <p class="notice__title">{{ tr(copy.thanks) }}</p>
        <p>{{ tr(copy.received) }} {{ form.correo }}.<template v-if="apologize"> {{ tr(copy.receivedSorry) }}</template></p>
        <p>{{ tr(copy.urgent) }} {{ tr({ es: company.phones[0].display, en: company.phones[0].intl }) }}.</p>
      </div>
    </div>

    <template v-else>
      <!-- Steps: a list on large screens, one line and a bar on phones. -->
      <nav class="wizard__nav" :aria-label="tr(copy.steps)">
        <div class="bar">
          <p class="bar__now" aria-hidden="true">
            <span>{{ tr(step.short) }}</span>
            <span class="bar__count">{{ stepOf }}</span>
          </p>
          <ol class="bar__list">
            <li v-for="(s, i) in steps" :key="s.id">
              <button type="button" class="bar__seg" :disabled="i > reached || i === current" :aria-current="i === current ? 'step' : undefined" @click="show(i)">
                <span class="bar__fill" :class="{ 'is-on': i === current, 'is-done': i !== current && complete[i], 'is-open': i !== current && !complete[i] && i <= reached }" />
                <span class="visually-hidden">{{ i + 1 }}. {{ tr(s.title) }}<template v-if="i > reached"> ({{ tr(copy.locked) }})</template></span>
              </button>
            </li>
          </ol>
        </div>

        <p class="list__title">{{ tr(copy.steps) }}</p>
        <ol class="list">
          <li v-for="(s, i) in steps" :key="s.id">
            <button
              type="button"
              class="list__step"
              :class="{ 'is-on': i === current, 'is-locked': i > reached }"
              :disabled="i > reached || i === current"
              :aria-current="i === current ? 'step' : undefined"
              @click="show(i)"
            >
              <span class="list__n" :class="{ 'is-done': i !== current && i <= reached && complete[i] }" aria-hidden="true">
                <Check v-if="i !== current && i <= reached && complete[i]" />
                <template v-else>{{ i + 1 }}</template>
              </span>
              {{ tr(s.title) }}
              <span v-if="i !== current && i <= reached && complete[i]" class="visually-hidden">({{ tr(copy.done) }})</span>
              <span v-if="i > reached" class="visually-hidden">({{ tr(copy.locked) }})</span>
            </button>
          </li>
        </ol>

        <div class="direct">
          <p class="direct__title">{{ tr(copy.prefer) }}</p>
          <a :href="company.phones[0].href" class="direct__link"><Phone aria-hidden="true" />{{ tr({ es: company.phones[0].display, en: company.phones[0].intl }) }}</a>
          <a :href="company.whatsapp.href" target="_blank" rel="noopener" class="direct__link"><MessageCircle aria-hidden="true" />WhatsApp</a>
          <a :href="`mailto:${company.email}`" class="direct__link"><Mail aria-hidden="true" /><span>{{ company.email.split('@')[0] }}@<wbr>{{ company.email.split('@')[1] }}</span></a>
        </div>
      </nav>

      <form class="wizard__panel" novalidate @submit.prevent="next">
        <h2 ref="heading" class="panel__title" tabindex="-1">{{ tr(step.title) }}</h2>

        <div v-if="status === 'failed'" class="notice notice--error" role="alert">
          <CircleAlert aria-hidden="true" />
          <div>
            <p class="notice__title">{{ tr(copy.failedTitle) }}</p>
            <p>
              {{ tr(copy.writeTo) }} <a :href="`mailto:${company.email}`" class="link">{{ company.email }}</a>
              {{ tr(copy.orCall) }} <a :href="company.phones[0].href" class="link">{{ tr({ es: company.phones[0].display, en: company.phones[0].intl }) }}</a>. {{ tr(copy.kept) }}
            </p>
          </div>
        </div>

        <!-- 1. «Tipo de solicitud». -->
        <fieldset v-if="step.id === 'tipo'" class="group">
          <legend class="visually-hidden">{{ tr(step.title) }}</legend>
          <div class="choices choices--kinds">
            <label v-for="k in pqrsKinds" :key="k.value" class="choice">
              <input v-model="form.tipo" type="radio" name="tipo" :value="k.value" class="choice__input" required :aria-invalid="errors.tipo ? true : undefined" :aria-describedby="errors.tipo ? 'tipo-error' : undefined">
              <span>
                <span class="choice__label">{{ tr(k.label) }}</span>
                <span class="choice__help">{{ tr(k.help) }}</span>
              </span>
            </label>
          </div>
          <p v-if="errors.tipo" id="tipo-error" class="group__error">{{ errors.tipo }}</p>
          <UiField v-if="form.tipo === 'otro'" v-model="form.tipoOtro" :label="tr(copy.otherWhat)" name="tipoOtro" required :error="errors.tipoOtro" />
          <div v-if="apologize" class="apology" role="status">
            <HeartHandshake aria-hidden="true" />
            <div>
              <p class="apology__title">{{ tr(copy.apologyTitle) }}</p>
              <p>{{ tr(copy.apology) }}</p>
            </div>
          </div>
        </fieldset>

        <!-- 2. «Fuentes», with the service details when it is about a service. -->
        <fieldset v-else-if="step.id === 'fuente'" class="group">
          <legend class="visually-hidden">{{ tr(step.title) }}</legend>
          <div class="choices">
            <label v-for="s in pqrsSources" :key="s.value" class="choice choice--compact">
              <input v-model="form.fuente" type="radio" name="fuente" :value="s.value" class="choice__input" required :aria-invalid="errors.fuente ? true : undefined" :aria-describedby="errors.fuente ? 'fuente-error' : undefined">
              <span class="choice__label">{{ tr(s.label) }}</span>
            </label>
          </div>
          <p v-if="errors.fuente" id="fuente-error" class="group__error">{{ errors.fuente }}</p>
          <div v-if="form.fuente === 'servicio'" class="grid2">
            <UiField v-model="form.fechaServicio" :label="tr(copy.serviceDate)" name="fechaServicio" type="date" :max="today" :error="errors.fechaServicio" />
            <UiField v-model="form.personaServicio" :label="tr(copy.servicePerson)" name="personaServicio" :hint="tr(copy.servicePersonHint)" />
          </div>
        </fieldset>

        <!-- 3. «Descripción de lo sucedido» and «Soportes». -->
        <div v-else-if="step.id === 'detalle'" class="group">
          <UiField v-model="form.descripcion" :label="tr(copy.description)" name="descripcion" type="textarea" required :hint="tr(copy.descriptionHint)" :error="errors.descripcion" />
          <div class="files">
            <p class="files__label">{{ tr(copy.files) }} <span class="files__optional">{{ tr({ es: '(opcional)', en: '(optional)' }) }}</span></p>
            <p id="soportes-hint" class="files__hint">{{ tr(copy.filesHint) }}</p>
            <ul v-if="form.soportes.length" class="files__list">
              <li v-for="(f, i) in form.soportes" :key="`${f.nombre}${i}`" class="files__item">
                <Paperclip aria-hidden="true" />
                <span class="files__name">{{ f.nombre }} <span class="files__size">({{ size(f.peso) }})</span></span>
                <button type="button" class="files__remove" @click="form.soportes.splice(i, 1)">
                  <X aria-hidden="true" /><span class="visually-hidden">{{ tr(copy.remove) }} {{ f.nombre }}</span>
                </button>
              </li>
            </ul>
            <label v-if="form.soportes.length < pqrsFiles.max" class="btn-file">
              <Paperclip aria-hidden="true" />{{ tr(copy.addFiles) }}
              <input ref="fileInput" type="file" name="soportes" multiple :accept="pqrsFiles.accept" class="visually-hidden" aria-describedby="soportes-hint" @change="addFiles">
            </label>
            <p class="group__error" role="alert">{{ fileError || errors.soportes }}</p>
          </div>
        </div>

        <!-- 4. «Datos personales» and «Datos de notificación». -->
        <div v-else-if="step.id === 'datos'" class="group">
          <p class="group__lede">{{ tr(copy.detailsLede) }}</p>
          <div class="grid2">
            <UiField v-model="form.nombre" :label="tr(copy.name)" name="nombre" required autocomplete="name" :error="errors.nombre" />
            <UiField v-model="form.empresa" :label="tr(copy.org)" name="empresa" autocomplete="organization" />
            <UiField v-model="form.documento" :label="tr(copy.document)" name="documento" required :error="errors.documento" />
            <UiField v-model="form.telefono" :label="tr(copy.phone)" name="telefono" type="tel" required autocomplete="tel" :error="errors.telefono" />
            <UiField v-model="form.correo" :label="tr(copy.email)" name="correo" type="email" required autocomplete="email" :hint="tr(copy.emailHint)" :error="errors.correo" class="grid2__wide" />
            <UiField v-model="form.direccion" :label="tr(copy.address)" name="direccion" autocomplete="street-address" />
            <UiField v-model="form.municipio" :label="tr(copy.city)" name="municipio" required autocomplete="address-level2" :error="errors.municipio" />
          </div>
        </div>

        <!-- 5. Review and consent (the format's signature). -->
        <div v-else class="group">
          <p class="group__lede">{{ tr(copy.reviewLede) }}</p>
          <dl class="review">
            <div class="review__row">
              <dt>{{ tr(copy.rKind) }}</dt>
              <dd>{{ form.tipo === 'otro' ? form.tipoOtro : tr(label(pqrsKinds, form.tipo)) }}</dd>
              <button type="button" class="link review__edit" @click="show(0)">{{ tr(copy.edit) }}<span class="visually-hidden">: {{ tr(copy.rKind).toLowerCase() }}</span></button>
            </div>
            <div class="review__row">
              <dt>{{ tr(copy.rSource) }}</dt>
              <dd>
                {{ tr(label(pqrsSources, form.fuente)) }}
                <template v-if="form.fechaServicio || form.personaServicio"><br>{{ [form.fechaServicio, form.personaServicio].filter(Boolean).join(', ') }}</template>
              </dd>
              <button type="button" class="link review__edit" @click="show(1)">{{ tr(copy.edit) }}<span class="visually-hidden">: {{ tr(copy.rSource).toLowerCase() }}</span></button>
            </div>
            <div class="review__row">
              <dt>{{ tr(copy.rDescription) }}</dt>
              <dd class="review__text">{{ form.descripcion }}</dd>
              <button type="button" class="link review__edit" @click="show(2)">{{ tr(copy.edit) }}<span class="visually-hidden">: {{ tr(copy.rDescription).toLowerCase() }}</span></button>
            </div>
            <div class="review__row">
              <dt>{{ tr(copy.rFiles) }}</dt>
              <dd>{{ form.soportes.length ? form.soportes.map((f) => f.nombre).join(', ') : tr(copy.none) }}</dd>
              <button type="button" class="link review__edit" @click="show(2)">{{ tr(copy.edit) }}<span class="visually-hidden">: {{ tr(copy.rFiles).toLowerCase() }}</span></button>
            </div>
            <div class="review__row">
              <dt>{{ tr(copy.rContact) }}</dt>
              <dd>
                {{ form.nombre }}<template v-if="form.empresa">, {{ form.empresa }}</template> ({{ form.documento }})<br>
                {{ form.correo }}<br>
                {{ form.telefono }}<br>
                {{ [form.direccion, form.municipio].filter(Boolean).join(', ') }}
              </dd>
              <button type="button" class="link review__edit" @click="show(3)">{{ tr(copy.edit) }}<span class="visually-hidden">: {{ tr(copy.rContact).toLowerCase() }}</span></button>
            </div>
          </dl>

          <div class="hp" aria-hidden="true">
            <label>{{ tr(copy.honeypot) }} <input v-model="form.web" type="text" name="web" tabindex="-1" autocomplete="off"></label>
          </div>

          <div class="consent">
            <label class="consent__label">
              <input v-model="form.datos" type="checkbox" name="datos" :aria-invalid="errors.datos ? true : undefined" :aria-describedby="errors.datos ? 'datos-error' : undefined">
              <span>
                {{ tr(copy.consentA) }}
                <a :href="dataPolicy" class="link" target="_blank" rel="noopener">{{ tr(copy.consentLink) }}</a>.
              </span>
            </label>
            <p v-if="errors.datos" id="datos-error" class="group__error">{{ errors.datos }}</p>
          </div>
        </div>

        <div class="actions">
          <UiButton v-if="current > 0" type="button" variant="outline" @click="show(current - 1)">{{ tr(copy.back) }}</UiButton>
          <UiButton type="submit" :disabled="status === 'sending'">
            {{ !last ? tr(copy.next) : status === 'sending' ? tr(copy.sending) : tr(copy.send) }}
          </UiButton>
        </div>
      </form>
    </template>
  </div>
</template>

<style scoped>
.wizard {
  display: grid;
  gap: 2rem;
  scroll-margin-top: calc(var(--header-offset, 6rem) + 1rem);
}

.wizard__done {
  max-width: 44rem;
}

/* Phones: a single line and one segment per step. */
.bar__now {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--font-display);
  font-weight: 600;
}

.bar__count {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-pizarra);
}

.bar__list {
  display: flex;
  gap: 0.375rem;
}

.bar__list li {
  flex: 1;
}

.bar__seg {
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.75rem;
}

.bar__seg:disabled {
  cursor: default;
}

.bar__fill {
  width: 100%;
  height: 0.375rem;
  border-radius: var(--radius-full);
  background: var(--color-linea);
  transition: background-color var(--duration-fast) var(--ease-out);
}

.bar__fill.is-on {
  height: 0.625rem;
  background: var(--color-azul);
}

.bar__fill.is-done {
  background: var(--color-azul);
}

.bar__fill.is-open {
  background: var(--color-cielo);
}

.list__title,
.list,
.direct {
  display: none;
}

.panel__title {
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-snug);
}

.panel__title:focus {
  outline: none;
}

.wizard__panel {
  display: grid;
  gap: 1.75rem;
  align-content: start;
  min-width: 0;
}

.group {
  display: grid;
  gap: 1.25rem;
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
}

.group__lede {
  color: var(--color-pizarra);
}

.group__error {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-error);
}

.choices {
  display: grid;
  gap: 0.5rem;
}

.choice {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  min-height: 3rem;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-linea);
  border-radius: var(--radius-control);
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out), background-color var(--duration-fast) var(--ease-out);
}

.choice--compact {
  align-items: center;
}

.choice:hover {
  border-color: var(--color-pizarra);
}

.choice:has(:checked) {
  border-color: var(--color-azul);
  background: var(--color-nube);
}

.choice:has(:focus-visible) {
  outline: var(--focus-ring);
  outline-offset: 2px;
}

.choice__input {
  flex: none;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.15rem;
  accent-color: var(--color-azul);
}

.choice--compact .choice__input {
  margin-top: 0;
}

.choice__label {
  display: block;
  font-weight: 600;
}

.choice__help {
  display: block;
  margin-top: 0.125rem;
  font-size: var(--text-sm);
  line-height: 1.35;
  color: var(--color-pizarra);
}

.apology {
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--color-nube);
  border-left: 4px solid var(--color-azul);
  border-radius: var(--radius-control);
}

.apology svg {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-azul);
}

.apology__title {
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.files {
  display: grid;
  gap: 0.5rem;
  justify-items: start;
}

.files__label {
  font-weight: 600;
}

.files__optional {
  font-weight: 400;
  color: var(--color-pizarra);
}

.files__hint {
  font-size: var(--text-xs);
  color: var(--color-pizarra);
}

.files__list {
  justify-self: stretch;
}

.files__item {
  display: grid;
  grid-template-columns: 1.125rem 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding-block: 0.5rem;
  border-bottom: 1px solid var(--color-linea);
}

.files__item > svg {
  width: 1.125rem;
  height: 1.125rem;
  color: var(--color-pizarra);
}

.files__name {
  overflow-wrap: anywhere;
}

.files__size {
  color: var(--color-pizarra);
  font-size: var(--text-sm);
}

.files__remove {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  color: var(--color-pizarra);
  cursor: pointer;
}

.files__remove:hover {
  background: var(--color-nube);
  color: var(--color-error);
}

.files__remove svg {
  width: 1.125rem;
  height: 1.125rem;
}

.btn-file {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.5rem 1.125rem;
  border: 2px solid var(--color-azul);
  border-radius: var(--radius-control);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-azul);
  cursor: pointer;
}

.btn-file:hover {
  background: var(--color-nube);
}

.btn-file:has(:focus-visible) {
  outline: var(--focus-ring);
  outline-offset: 2px;
}

.btn-file svg {
  width: 1.125rem;
  height: 1.125rem;
}

.review {
  border-top: 2px solid var(--color-azul);
}

.review__row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.25rem 1rem;
  padding-block: 1rem;
  border-bottom: 1px solid var(--color-linea);
}

.review__row dt {
  grid-column: 1;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.review__row dd {
  grid-column: 1;
  overflow-wrap: anywhere;
}

.review__text {
  white-space: pre-line;
}

.review__edit {
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: start;
  font-size: var(--text-sm);
  cursor: pointer;
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
}

.notice--ok svg {
  color: var(--color-azul);
}

.notice--ok p + p {
  margin-top: 0.5rem;
}

.notice--error {
  background: #fbeeed;
  border-color: var(--color-error);
}

.notice--error svg {
  color: var(--color-error);
}

.notice__title {
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.notice--error .link {
  color: var(--color-error);
}

.grid2 {
  display: grid;
  gap: 1.5rem var(--spacing-gutter);
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

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-linea);
}

@media (width >= 40rem) {
  .choices--kinds {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* «Otro» closes the list of kinds across the full row, so no option is left alone. */
  .choices--kinds .choice:last-child {
    grid-column: 1 / -1;
  }

  .grid2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid2__wide {
    grid-column: 1 / -1;
  }
}

/* Wide panels: the nine kinds fit in three even rows. */
@media (width >= 80rem) {
  .choices--kinds {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .choices--kinds .choice:last-child {
    grid-column: auto;
  }
}

/* Large screens: the list of steps beside the form, with the direct channels under it. */
@media (width >= 64rem) {
  .wizard {
    grid-template-columns: 17rem minmax(0, 1fr);
    gap: 3rem;
    align-items: start;
  }

  .wizard__done {
    grid-column: 1 / -1;
  }

  .wizard__nav {
    position: sticky;
    top: calc(var(--header-offset, 6rem) + 1.5rem);
  }

  .bar {
    display: none;
  }

  .list__title {
    display: block;
    margin-bottom: 0.75rem;
    font-weight: 600;
    color: var(--color-pizarra);
  }

  .list {
    display: grid;
    gap: 0.5rem;
  }

  .list__step {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    min-height: 3rem;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    border: 2px solid var(--color-linea);
    border-radius: var(--radius-control);
    font-family: var(--font-display);
    font-size: var(--text-sm);
    font-weight: 600;
    text-align: left;
    color: var(--color-tinta);
    cursor: pointer;
    transition: border-color var(--duration-fast) var(--ease-out);
  }

  .list__step:hover:not(:disabled) {
    border-color: var(--color-azul);
  }

  .list__step.is-on {
    border-color: var(--color-azul);
    background: var(--color-azul);
    color: var(--color-blanco);
    cursor: default;
  }

  .list__step.is-locked {
    color: var(--color-pizarra);
    cursor: default;
  }

  .list__n {
    display: grid;
    place-items: center;
    flex: none;
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-full);
    background: var(--color-nube);
    font-size: var(--text-xs);
    color: var(--color-azul-hondo);
  }

  .list__step.is-on .list__n {
    background: var(--color-azul-hondo);
    color: var(--color-blanco);
  }

  .list__n.is-done {
    background: var(--color-azul);
    color: var(--color-blanco);
  }

  .list__n svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 3;
  }

  .direct {
    display: grid;
    gap: 0.5rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-linea);
  }

  .direct__title {
    margin-bottom: 0.25rem;
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .direct__link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--text-sm);
    color: var(--color-tinta);
    text-decoration: none;
  }

  .direct__link:hover {
    color: var(--color-azul);
    text-decoration: underline;
  }

  .direct__link svg {
    flex: none;
    width: 1rem;
    height: 1rem;
    color: var(--color-azul);
  }
}
</style>
