/**
 * PQRS request (peticiones, quejas, reclamos, sugerencias y felicitaciones).
 * The fields map the company's «Formato PQRS» (SGI): the customer-facing part
 * of the form, pages 1 and 2. Reception, validation, follow-up and closing
 * (page 3) stay inside the company. One definition is shared by the form and
 * the API route so both validate the same way.
 */

/** «Tipo de solicitud» of the format, in the order a visitor is most likely to look for. */
export const pqrsKinds = [
  { value: 'peticion', label: { es: 'Petición', en: 'Request' }, help: { es: 'Solicitar información, un documento o una actuación de nuestra parte.', en: 'Ask for information, a document or an action on our part.' } },
  { value: 'queja', label: { es: 'Queja', en: 'Complaint' }, help: { es: 'Manifestar inconformidad con la atención o la conducta de una persona de nuestro equipo.', en: 'Express dissatisfaction with how you were treated or with the conduct of a member of our team.' } },
  { value: 'reclamo', label: { es: 'Reclamo', en: 'Claim' }, help: { es: 'Manifestar que un servicio no se prestó como se acordó.', en: 'Report that a service was not delivered as agreed.' } },
  { value: 'apelacion', label: { es: 'Apelación', en: 'Appeal' }, help: { es: 'Solicitar la revisión de una decisión o del resultado de una evaluación.', en: 'Ask us to review a decision or the result of an assessment.' } },
  { value: 'no-conforme', label: { es: 'Servicio no conforme', en: 'Nonconforming service' }, help: { es: 'Informar el incumplimiento de un requisito del servicio.', en: 'Report that a service requirement was not met.' } },
  { value: 'mejora', label: { es: 'Sugerencia de mejora', en: 'Suggestion' }, help: { es: 'Proponer una idea para mejorar nuestros servicios.', en: 'Suggest an idea to improve our services.' } },
  { value: 'observacion', label: { es: 'Observación', en: 'Remark' }, help: { es: 'Compartir un comentario sobre nuestros servicios.', en: 'Share a comment about our services.' } },
  { value: 'felicitacion', label: { es: 'Felicitación', en: 'Compliment' }, help: { es: 'Reconocer un servicio o a una persona de nuestro equipo.', en: 'Recognize a service or a member of our team.' } },
  { value: 'otro', label: { es: 'Otro', en: 'Other' }, help: { es: 'Cualquier otro asunto.', en: 'Any other matter.' } },
] as const satisfies readonly { value: string, label: Loc, help: Loc }[]

export type PqrsKind = (typeof pqrsKinds)[number]['value']

/** Kinds that express dissatisfaction: the form apologizes before asking for details. */
export const pqrsApologyKinds: readonly PqrsKind[] = ['queja', 'reclamo', 'no-conforme']

/** «Fuentes» of the format. */
export const pqrsSources = [
  { value: 'servicio', label: { es: 'La prestación de un servicio', en: 'The delivery of a service' } },
  { value: 'llamada', label: { es: 'Una llamada o la atención telefónica', en: 'A phone call' } },
  { value: 'datos', label: { es: 'El manejo de mis datos personales', en: 'The handling of my personal data' } },
  { value: 'escrita', label: { es: 'Una comunicación escrita (correo, carta o documento)', en: 'A written communication (email, letter or document)' } },
] as const satisfies readonly { value: string, label: Loc }[]

export type PqrsSource = (typeof pqrsSources)[number]['value']

/** Supporting files («Soportes que anexa»): up to four, small enough for a JSON request. */
export const pqrsFiles = {
  max: 4,
  totalBytes: 2.5 * 1024 * 1024,
  accept: '.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx',
  types: [
    'application/pdf', 'image/jpeg', 'image/png',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
} as const

export interface PqrsFile {
  nombre: string
  tipo: string
  /** Size in bytes of the original file. */
  peso: number
  /** File content, base64 without the data: prefix. */
  contenido: string
}

export interface PqrsRequest {
  tipo: PqrsKind | ''
  /** «¿Cuál?» when the kind is «Otro». */
  tipoOtro: string
  fuente: PqrsSource | ''
  /** «Fecha del servicio», yyyy-mm-dd. */
  fechaServicio: string
  /** «Persona que prestó el servicio» (for inspections: the examiner). */
  personaServicio: string
  descripcion: string
  soportes: PqrsFile[]
  nombre: string
  empresa: string
  /** «NIT o C.C.» */
  documento: string
  correo: string
  telefono: string
  direccion: string
  municipio: string
  datos: boolean
  idioma: Lang
  /** Honeypot: humans leave it empty. */
  web: string
}

export type PqrsErrors = Partial<Record<keyof PqrsRequest, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const messages = {
  tipo: { es: 'Seleccione qué desea comunicarnos.', en: 'Please select what you would like to tell us.' },
  tipoOtro: { es: 'Indique de qué se trata su solicitud.', en: 'Please tell us what your request is about.' },
  fuente: { es: 'Seleccione con qué está relacionada su solicitud.', en: 'Please select what your request relates to.' },
  fechaServicio: { es: 'La fecha del servicio no puede ser posterior a hoy.', en: 'The service date cannot be later than today.' },
  descripcion: { es: 'Describa lo sucedido con un poco más de detalle (al menos 20 caracteres).', en: 'Please describe what happened in a little more detail (at least 20 characters).' },
  largo: { es: 'La descripción supera los 4.000 caracteres.', en: 'The description exceeds 4,000 characters.' },
  soportes: { es: 'Adjunte como máximo 4 archivos PDF, de imagen, Word o Excel, de hasta 2,5 MB en total.', en: 'Attach no more than 4 PDF, image, Word or Excel files, up to 2.5 MB in total.' },
  nombre: { es: 'Escriba su nombre completo.', en: 'Please enter your full name.' },
  documento: { es: 'Escriba su NIT o número de cédula, solo con números, puntos o guiones.', en: 'Please enter your tax ID or ID number, using only numbers, dots or hyphens.' },
  correo: { es: 'Escriba un correo con el formato nombre@empresa.com.', en: 'Please enter an email address in the format name@company.com.' },
  telefono: { es: 'Escriba un teléfono de 7 a 15 dígitos; puede usar espacios o el signo +.', en: 'Please enter a phone number of 7 to 15 digits; you may use spaces or the + sign.' },
  municipio: { es: 'Escriba el municipio o la ciudad.', en: 'Please enter your city or municipality.' },
  datos: { es: 'Necesitamos su autorización para tramitar la solicitud.', en: 'We need your authorization to process your request.' },
} satisfies Record<string, Loc>

export function validatePqrs(r: PqrsRequest, lang: Lang = 'es', today = new Date().toISOString().slice(0, 10)): PqrsErrors {
  const e: PqrsErrors = {}
  const m = (k: keyof typeof messages) => messages[k][lang]
  if (!pqrsKinds.some((k) => k.value === r.tipo)) e.tipo = m('tipo')
  if (r.tipo === 'otro' && r.tipoOtro.trim().length < 3) e.tipoOtro = m('tipoOtro')
  if (!pqrsSources.some((s) => s.value === r.fuente)) e.fuente = m('fuente')
  if (r.fechaServicio && (!/^\d{4}-\d{2}-\d{2}$/.test(r.fechaServicio) || r.fechaServicio > today)) e.fechaServicio = m('fechaServicio')
  if (r.descripcion.trim().length < 20) e.descripcion = m('descripcion')
  if (r.descripcion.length > 4000) e.descripcion = m('largo')
  const total = r.soportes.reduce((n, f) => n + f.peso, 0)
  if (r.soportes.length > pqrsFiles.max || total > pqrsFiles.totalBytes || r.soportes.some((f) => !(pqrsFiles.types as readonly string[]).includes(f.tipo))) e.soportes = m('soportes')
  if (r.nombre.trim().length < 3) e.nombre = m('nombre')
  if (!/^[\d.\-\s]{5,20}$/.test(r.documento.trim())) e.documento = m('documento')
  if (!emailPattern.test(r.correo.trim())) e.correo = m('correo')
  const digits = r.telefono.replace(/\D/g, '')
  if (!/^[\d\s()+-]+$/.test(r.telefono) || digits.length < 7 || digits.length > 15) e.telefono = m('telefono')
  if (r.municipio.trim().length < 2) e.municipio = m('municipio')
  if (!r.datos) e.datos = m('datos')
  return e
}
