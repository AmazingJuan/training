/**
 * Receives the PQRS form and forwards it to NUXT_CONTACT_WEBHOOK, the same
 * service that receives the contact form, marked with `formulario: 'pqrs'` so
 * it can be routed to whoever handles PQRS. Without a webhook it answers 503
 * and the form points people to the phone and e-mail instead.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<PqrsRequest>>(event)
  const text = (v: unknown, max: number) => String(v ?? '').slice(0, max)

  const request: PqrsRequest = {
    tipo: text(body?.tipo, 20) as PqrsRequest['tipo'],
    tipoOtro: text(body?.tipoOtro, 120),
    fuente: text(body?.fuente, 20) as PqrsRequest['fuente'],
    fechaServicio: text(body?.fechaServicio, 10),
    personaServicio: text(body?.personaServicio, 200),
    descripcion: text(body?.descripcion, 4001),
    soportes: Array.isArray(body?.soportes)
      ? body.soportes.slice(0, pqrsFiles.max + 1).map((f) => ({
          nombre: text(f?.nombre, 200),
          tipo: text(f?.tipo, 120),
          peso: Number(f?.peso) || 0,
          contenido: text(f?.contenido, Math.ceil(pqrsFiles.totalBytes * 1.4)),
        }))
      : [],
    nombre: text(body?.nombre, 200),
    empresa: text(body?.empresa, 200),
    documento: text(body?.documento, 30),
    correo: text(body?.correo, 200),
    telefono: text(body?.telefono, 40),
    direccion: text(body?.direccion, 200),
    municipio: text(body?.municipio, 120),
    datos: body?.datos === true,
    idioma: body?.idioma === 'en' ? 'en' : 'es',
    web: text(body?.web, 200),
  }

  // Bots fill the hidden field; accept silently and drop.
  if (request.web) return { ok: true }

  // The declared size must match the content actually sent.
  for (const f of request.soportes) {
    const real = Math.floor((f.contenido.length * 3) / 4) - (f.contenido.endsWith('==') ? 2 : f.contenido.endsWith('=') ? 1 : 0)
    if (Math.abs(real - f.peso) > 4) f.peso = real
  }

  const errors = validatePqrs(request, request.idioma)
  if (Object.keys(errors).length) {
    throw createError({ statusCode: 422, statusMessage: 'Datos incompletos', data: { errors } })
  }

  const { contactWebhook } = useRuntimeConfig(event)
  if (!contactWebhook) {
    throw createError({ statusCode: 503, statusMessage: 'Envío no configurado' })
  }

  const label = (list: readonly { value: string, label: Loc }[], v: string) => list.find((x) => x.value === v)?.label.es ?? v
  const { web: _, ...payload } = request
  await $fetch(contactWebhook, {
    method: 'POST',
    body: {
      formulario: 'pqrs',
      ...payload,
      // The company reads the request in Spanish, whatever language the visitor used.
      tipoTexto: request.tipo === 'otro' ? `Otro: ${request.tipoOtro}` : label(pqrsKinds, request.tipo),
      fuenteTexto: label(pqrsSources, request.fuente),
      recibido: new Date().toISOString(),
      origen: 'trainingcorporation.com.co/pqrs',
    },
    timeout: 15000,
  }).catch(() => {
    throw createError({ statusCode: 502, statusMessage: 'No se pudo entregar la solicitud' })
  })

  return { ok: true }
})
