/**
 * Contact request: one definition shared by the form (client) and the API
 * route (server), so both validate the same way.
 */

export const requestKinds = [
  { value: 'cotizacion', label: { es: 'Cotización de un servicio', en: 'Quotation for a service' } },
  { value: 'formacion', label: { es: 'Información sobre formación', en: 'Information about training' } },
  { value: 'otro', label: { es: 'Otro asunto', en: 'Other matter' } },
] as const satisfies readonly { value: string, label: Loc }[]

export type RequestKind = (typeof requestKinds)[number]['value']

export interface ContactRequest {
  nombre: string
  empresa: string
  correo: string
  telefono: string
  tipo: RequestKind | ''
  linea: string
  mensaje: string
  /** Services marked in the explorer, as "Unidad, línea: servicio". */
  servicios: string[]
  datos: boolean
  /** Language the visitor wrote in, so the reply can be in the same language. */
  idioma: Lang
  /** Honeypot: humans leave it empty. */
  web: string
}

export type ContactErrors = Partial<Record<keyof ContactRequest, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const messages = {
  nombre: { es: 'Escriba su nombre.', en: 'Please enter your name.' },
  correo: { es: 'Escriba un correo con el formato nombre@empresa.com.', en: 'Please enter an email address in the format name@company.com.' },
  telefono: { es: 'Escriba solo números, espacios o el signo +.', en: 'Please use only numbers, spaces or the + sign.' },
  tipo: { es: 'Seleccione el tipo de solicitud.', en: 'Please select the type of request.' },
  mensaje: { es: 'Describa en al menos una frase lo que necesita.', en: 'Please describe what you need in at least one sentence.' },
  servicios: { es: 'La solicitud incluye demasiados servicios; seleccione como máximo 60.', en: 'The request includes too many services; please select no more than 60.' },
  largo: { es: 'El mensaje supera los 4.000 caracteres.', en: 'The message exceeds 4,000 characters.' },
  datos: { es: 'Necesitamos su autorización para responderle.', en: 'We need your authorization in order to reply.' },
} satisfies Record<string, Loc>

export function validateContact(r: ContactRequest, lang: Lang = 'es'): ContactErrors {
  const e: ContactErrors = {}
  const m = (k: keyof typeof messages) => messages[k][lang]
  if (r.nombre.trim().length < 2) e.nombre = m('nombre')
  if (!emailPattern.test(r.correo.trim())) e.correo = m('correo')
  if (r.telefono && !/^[\d\s()+-]{7,20}$/.test(r.telefono)) e.telefono = m('telefono')
  if (!requestKinds.some((k) => k.value === r.tipo)) e.tipo = m('tipo')
  // A message is optional when the request already lists services.
  if (!r.servicios.length && r.mensaje.trim().length < 10) e.mensaje = m('mensaje')
  if (r.servicios.length > 60) e.servicios = m('servicios')
  if (r.mensaje.length > 4000) e.mensaje = m('largo')
  if (!r.datos) e.datos = m('datos')
  return e
}
