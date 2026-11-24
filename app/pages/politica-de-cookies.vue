<script setup lang="ts">
import { company, dataPolicy } from '~/data/company'

/**
 * Cookie and analytics notice. Says which measurement tools the site loads
 * (plugins/analytics.client.ts), what they store, for how long and how to
 * refuse them, under Ley 1581 de 2012 and the company's data protection manual.
 * Keep it in step with the plugin: a new tool or cookie must be listed here.
 */
const { tr, lang } = useLang()

usePageSeo({
  title: tr({ es: 'Política de cookies y analítica', en: 'Cookie and analytics policy' }),
  description: tr({
    es: 'Qué cookies usa el sitio de Training Corporation, con qué fin, por cuánto tiempo y cómo puede bloquearlas o eliminarlas.',
    en: 'Which cookies the Training Corporation website uses, for what purpose, for how long and how you can block or delete them.',
  }),
})

const reviewed = '2026-11-24'

const copy = {
  title: { es: 'Política de cookies y analítica', en: 'Cookie and analytics policy' },
  lede: {
    es: 'Este sitio usa cookies de analítica para saber cuántas personas lo visitan y cómo lo recorren, con el único fin de mejorarlo. No usamos cookies de publicidad.',
    en: 'This website uses analytics cookies to learn how many people visit it and how they move through it, solely to improve it. We do not use advertising cookies.',
  },
  whatTitle: { es: '¿Qué son las cookies?', en: 'What are cookies?' },
  what: {
    es: 'Son pequeños archivos que un sitio web guarda en su navegador para reconocerlo en visitas posteriores. No contienen virus ni dan acceso a otros datos de su equipo.',
    en: 'They are small files a website stores in your browser to recognize it on later visits. They do not contain viruses or give access to other data on your device.',
  },
  toolsTitle: { es: 'Herramientas que usamos', en: 'Tools we use' },
  tools: {
    es: 'Las dos herramientas se cargan después de mostrar la página y no se usan en la intranet de colaboradores.',
    en: 'Both tools load after the page is displayed and are not used on the staff intranet.',
  },
  name: { es: 'Cookie', en: 'Cookie' },
  purpose: { es: 'Finalidad', en: 'Purpose' },
  duration: { es: 'Duración', en: 'Duration' },
  ga: {
    title: 'Google Analytics 4 (Google LLC)',
    text: {
      es: 'Cuenta las visitas, las páginas vistas, el tiempo en el sitio y de dónde llegan los visitantes (buscadores, enlaces o acceso directo). Google Analytics 4 no registra ni almacena direcciones IP, y los datos de cada visita se conservan dos meses.',
      en: 'Counts visits, page views, time on the site and where visitors come from (search engines, links or direct access). Google Analytics 4 does not log or store IP addresses, and the data of each visit is kept for two months.',
    },
    cookies: [
      { name: '_ga', purpose: { es: 'Distingue a un visitante de otro.', en: 'Distinguishes one visitor from another.' }, duration: { es: '2 años', en: '2 years' } },
      { name: '_ga_*', purpose: { es: 'Mantiene el estado de la visita.', en: 'Keeps the state of the visit.' }, duration: { es: '2 años', en: '2 years' } },
    ],
  },
  clarity: {
    title: 'Microsoft Clarity (Microsoft Corporation)',
    text: {
      es: 'Muestra mapas de calor y reproducciones anónimas de cómo se navega el sitio (clics, desplazamiento y movimientos), para detectar partes confusas o difíciles de usar. Clarity oculta lo que se escribe en los formularios, así que esos datos no quedan en las grabaciones.',
      en: 'Shows heatmaps and anonymous replays of how the site is navigated (clicks, scrolling and movements), to find parts that are confusing or hard to use. Clarity masks what is typed into forms, so that data is not captured in the recordings.',
    },
    cookies: [
      { name: '_clck', purpose: { es: 'Reconoce al visitante entre visitas.', en: 'Recognizes the visitor across visits.' }, duration: { es: '1 año', en: '1 year' } },
      { name: '_clsk', purpose: { es: 'Une las páginas de una misma visita.', en: 'Links the pages of a single visit.' }, duration: { es: '1 día', en: '1 day' } },
      { name: 'MUID, CLID, ANONCHK, SM', purpose: { es: 'Cookies de Microsoft para identificar el navegador y la sesión.', en: 'Microsoft cookies that identify the browser and the session.' }, duration: { es: 'Hasta 1 año', en: 'Up to 1 year' } },
    ],
  },
  otherTitle: { es: 'Otros datos guardados en su navegador', en: 'Other data stored in your browser' },
  other: {
    es: 'Las opciones de accesibilidad que usted elija (tamaño del texto, contraste, subrayado, espaciado y animaciones) se guardan solo en su navegador y nunca se envían a Training Corporation ni a terceros.',
    en: 'The accessibility options you choose (text size, contrast, underlining, spacing and animations) are stored only in your browser and are never sent to Training Corporation or third parties.',
  },
  transferTitle: { es: 'Quién trata los datos', en: 'Who processes the data' },
  transfer: {
    es: 'Training Corporation S.A.S. es responsable del tratamiento. Google y Microsoft actúan como encargados y pueden procesar los datos en servidores fuera de Colombia, con medidas de seguridad propias. Los datos se usan solo para estadísticas del sitio; no se venden ni se usan para publicidad.',
    en: 'Training Corporation S.A.S. is the data controller. Google and Microsoft act as processors and may process the data on servers outside Colombia, under their own security measures. The data is used only for site statistics; it is not sold or used for advertising.',
  },
  controlTitle: { es: 'Cómo bloquear o eliminar las cookies', en: 'How to block or delete cookies' },
  control: {
    es: 'Puede rechazar estas cookies sin que el sitio deje de funcionar:',
    en: 'You can refuse these cookies and the site will keep working:',
  },
  controls: [
    { es: 'Bloquéelas o elimínelas desde la configuración de privacidad de su navegador (Chrome, Edge, Firefox o Safari).', en: 'Block or delete them in your browser’s privacy settings (Chrome, Edge, Firefox or Safari).' },
    { es: 'Navegue en modo privado o incógnito: las cookies se borran al cerrar la ventana.', en: 'Browse in private or incognito mode: cookies are deleted when the window closes.' },
  ],
  optOutA: { es: 'Para excluirse solo de Google Analytics, instale el', en: 'To opt out of Google Analytics only, install the' },
  optOutLink: { es: 'complemento de inhabilitación de Google Analytics', en: 'Google Analytics opt-out browser add-on' },
  rightsTitle: { es: 'Sus derechos', en: 'Your rights' },
  rights: {
    es: 'Conforme a la Ley 1581 de 2012, usted puede conocer, actualizar, rectificar y solicitar la supresión de sus datos personales, y revocar su autorización. El procedimiento está en nuestro',
    en: 'Under Colombian Law 1581 of 2012, you may access, update, correct and request deletion of your personal data, and revoke your authorization. The procedure is set out in our',
  },
  manual: { es: 'manual de protección de datos personales', en: 'personal data protection manual (in Spanish)' },
  rightsEnd: { es: '. Puede escribirnos a', en: '. You can write to us at' },
  rightsOr: { es: 'o usar el', en: 'or use the' },
  pqrs: { es: 'formulario de PQRS', en: 'requests and complaints form' },
  reviewed: { es: 'Última actualización de esta política:', en: 'This policy was last updated on' },
}

const tools = [copy.ga, copy.clarity]
</script>

<template>
  <div>
    <PageHeader :title="tr(copy.title)" :lede="tr(copy.lede)" />

    <div class="frame">
    <div class="statement">
      <section aria-labelledby="que-son">
        <h2 id="que-son" class="subheading">{{ tr(copy.whatTitle) }}</h2>
        <p>{{ tr(copy.what) }}</p>
      </section>

      <section aria-labelledby="herramientas">
        <h2 id="herramientas" class="subheading">{{ tr(copy.toolsTitle) }}</h2>
        <p>{{ tr(copy.tools) }}</p>
        <div v-for="tool in tools" :key="tool.title" class="tool">
          <h3 class="tool__title">{{ tool.title }}</h3>
          <p>{{ tr(tool.text) }}</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th scope="col">{{ tr(copy.name) }}</th><th scope="col">{{ tr(copy.purpose) }}</th><th scope="col">{{ tr(copy.duration) }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="c in tool.cookies" :key="c.name">
                  <th scope="row"><code>{{ c.name }}</code></th>
                  <td>{{ tr(c.purpose) }}</td>
                  <td>{{ tr(c.duration) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="otros-datos">
        <h2 id="otros-datos" class="subheading">{{ tr(copy.otherTitle) }}</h2>
        <p>{{ tr(copy.other) }}</p>
      </section>

      <section aria-labelledby="quien">
        <h2 id="quien" class="subheading">{{ tr(copy.transferTitle) }}</h2>
        <p>{{ tr(copy.transfer) }}</p>
      </section>

      <section aria-labelledby="bloquear">
        <h2 id="bloquear" class="subheading">{{ tr(copy.controlTitle) }}</h2>
        <p>{{ tr(copy.control) }}</p>
        <ul>
          <li v-for="c in copy.controls" :key="c.es">{{ tr(c) }}</li>
          <li>
            {{ tr(copy.optOutA) }}
            <a :href="`https://tools.google.com/dlpage/gaoptout?hl=${lang}`" class="link" target="_blank" rel="noopener">{{ tr(copy.optOutLink) }}</a>.
          </li>
        </ul>
      </section>

      <section aria-labelledby="derechos">
        <h2 id="derechos" class="subheading">{{ tr(copy.rightsTitle) }}</h2>
        <p>
          {{ tr(copy.rights) }}
          <a :href="dataPolicy" class="link" target="_blank" rel="noopener">{{ tr(copy.manual) }}</a>{{ tr(copy.rightsEnd) }}
          <a :href="`mailto:${company.email}?subject=Datos%20personales`" class="link">{{ company.email }}</a>
          {{ tr(copy.rightsOr) }} <NuxtLinkLocale to="/pqrs" class="link">{{ tr(copy.pqrs) }}</NuxtLinkLocale>.
        </p>
      </section>

      <p class="muted statement__date">
        {{ tr(copy.reviewed) }} <time :datetime="reviewed">{{ formatDate(reviewed, lang) }}</time>.
      </p>
    </div>
    </div>
  </div>
</template>

<style scoped>
/* Same layout as the accessibility statement. */
.statement {
  display: grid;
  /* minmax(0, …): the cookie tables must not widen the column past the screen. */
  grid-template-columns: minmax(0, 1fr);
  gap: 2.5rem;
  max-width: var(--container-measure);
  padding-block: 0 var(--spacing-section);
}

.statement .subheading {
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
}

.statement section > * + * {
  margin-top: 0.875rem;
}

.statement ul {
  display: grid;
  gap: 0.5rem;
  padding-left: 1.25rem;
  list-style: disc;
}

.statement li::marker {
  color: var(--color-azul);
}

.tool {
  margin-top: 1.75rem;
}

.tool > * + * {
  margin-top: 0.75rem;
}

.tool__title {
  font-weight: 700;
}

/* Narrow screens scroll the table, not the page. */
.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

th,
td {
  padding: 0.5rem 0.75rem 0.5rem 0;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--color-linea);
}

thead th {
  font-weight: 600;
}

tbody th {
  font-weight: 400;
}

.statement__date {
  font-size: var(--text-sm);
}
</style>
