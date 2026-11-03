<script setup lang="ts">
import { company } from '~/data/company'

/**
 * Accessibility statement. Colombian public-interest sites follow Resolución
 * 1519 de 2020 (MinTIC), annex 1, which adopts WCAG 2.1 level AA (NTC 5854 is
 * the earlier national standard). The statement says what the site does, how
 * the panel helps, what is known not to conform, and how to report a barrier.
 */
const { tr, lang } = useLang()

usePageSeo({
  title: tr({ es: 'Declaración de accesibilidad', en: 'Accessibility statement' }),
  description: tr({
    es: 'Compromiso de accesibilidad de Training Corporation: WCAG 2.1 nivel AA conforme a la Resolución 1519 de 2020 de MinTIC, opciones de visualización y canal para reportar barreras.',
    en: 'Training Corporation’s accessibility commitment: WCAG 2.1 level AA in line with MinTIC Resolution 1519 of 2020, display options and a channel to report barriers.',
  }),
})

const reviewed = '2026-11-02'

const copy = {
  title: { es: 'Declaración de accesibilidad', en: 'Accessibility statement' },
  lede: {
    es: 'Training Corporation se compromete a que este sitio pueda ser utilizado por todas las personas, con independencia de sus capacidades o de la tecnología que empleen.',
    en: 'Training Corporation is committed to making this website usable by everyone, regardless of their abilities or the technology they use.',
  },
  standardTitle: { es: 'Estándar aplicado', en: 'Standard applied' },
  standard: {
    es: 'El sitio se diseña y se revisa conforme a las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, nivel AA, adoptadas en Colombia por la Resolución 1519 de 2020 del Ministerio de Tecnologías de la Información y las Comunicaciones (anexo 1), y a la NTC 5854.',
    en: 'The site is designed and reviewed against the Web Content Accessibility Guidelines (WCAG) 2.1, level AA, adopted in Colombia by Resolution 1519 of 2020 of the Ministry of Information and Communications Technologies (annex 1), and against the Colombian technical standard NTC 5854.',
  },
  measuresTitle: { es: 'Medidas incorporadas', en: 'Measures in place' },
  measures: [
    { es: 'Estructura semántica con encabezados, regiones y listas, y un enlace para saltar al contenido principal.', en: 'Semantic structure with headings, landmarks and lists, and a link to skip to the main content.' },
    { es: 'Navegación completa con teclado y foco visible en todos los elementos interactivos.', en: 'Full keyboard navigation with a visible focus indicator on every interactive element.' },
    { es: 'Contraste mínimo de 4,5:1 en el texto y de 3:1 en los elementos gráficos y de interfaz.', en: 'Minimum contrast of 4.5:1 for text and 3:1 for graphical and interface elements.' },
    { es: 'Textos alternativos en las imágenes informativas y en el mapa de presencia, cuya información también se presenta como texto.', en: 'Text alternatives for informative images and for the presence map, whose information is also given as text.' },
    { es: 'Formularios con etiquetas visibles, instrucciones y mensajes de error que indican cómo corregir cada campo.', en: 'Forms with visible labels, instructions and error messages that explain how to correct each field.' },
    { es: 'Respeto de la preferencia del sistema operativo de reducir el movimiento.', en: 'Respect for the operating system’s reduced motion preference.' },
    { es: 'Contenido disponible en español y en inglés, con el idioma de cada página declarado.', en: 'Content available in Spanish and English, with the language of each page declared.' },
  ],
  panelTitle: { es: 'Opciones de accesibilidad', en: 'Accessibility options' },
  panel: {
    es: 'El botón «Accesibilidad» de la parte superior de cada página permite ajustar la presentación del sitio. Las preferencias se guardan en su navegador:',
    en: 'The “Accessibility” button at the top of every page lets you adjust how the site is displayed. Your preferences are saved in your browser:',
  },
  options: [
    { es: 'Tamaño del texto: 100 %, 115 %, 130 % o 150 %.', en: 'Text size: 100%, 115%, 130% or 150%.' },
    { es: 'Alto contraste.', en: 'High contrast.' },
    { es: 'Subrayado de todos los enlaces.', en: 'Underlining of all links.' },
    { es: 'Mayor espaciado entre líneas, letras y palabras, según el criterio 1.4.12 de las WCAG 2.1.', en: 'Increased line, letter and word spacing, following WCAG 2.1 success criterion 1.4.12.' },
    { es: 'Detención de animaciones, transiciones y desplazamiento suave.', en: 'Stopping animations, transitions and smooth scrolling.' },
  ],
  limitsTitle: { es: 'Limitaciones conocidas', en: 'Known limitations' },
  limits: [
    { es: 'Los documentos PDF publicados (certificados, portafolios, boletines y manuales) son documentos de origen externo o escaneados y pueden no ser accesibles para lectores de pantalla. Si necesita uno en formato accesible, solicítelo por los canales indicados a continuación.', en: 'Published PDF documents (certificates, portfolios, newsletters and manuals) are externally produced or scanned and may not be accessible to screen readers. If you need one in an accessible format, please request it through the channels below.' },
    { es: 'Los documentos y el video corporativo están disponibles únicamente en español.', en: 'Documents and the corporate video are available in Spanish only.' },
    { es: 'El video corporativo se reproduce desde Vimeo y no cuenta con subtítulos.', en: 'The corporate video plays from Vimeo and does not have captions.' },
  ],
  reportTitle: { es: 'Reporte de barreras de accesibilidad', en: 'Reporting accessibility barriers' },
  report: {
    es: 'Si encuentra un contenido o una función que no pueda utilizar, infórmenos e indique la página y la dificultad encontrada. Responderemos en un plazo máximo de quince días hábiles.',
    en: 'If you find any content or feature you cannot use, please let us know, including the page and the difficulty you encountered. We will respond within fifteen business days.',
  },
  email: { es: 'Correo electrónico', en: 'Email' },
  phone: { es: 'Teléfono', en: 'Phone' },
  form: { es: 'Formulario de contacto', en: 'Contact form' },
  formLink: { es: 'Enviar un mensaje', en: 'Send a message' },
  reviewed: { es: 'Última revisión de esta declaración:', en: 'This statement was last reviewed on' },
} satisfies Record<string, Loc | Loc[]>
</script>

<template>
  <div>
    <PageHeader :title="tr(copy.title)" :lede="tr(copy.lede)" />

    <div class="frame statement">
      <section aria-labelledby="estandar">
        <h2 id="estandar" class="subheading">{{ tr(copy.standardTitle) }}</h2>
        <p>{{ tr(copy.standard) }}</p>
      </section>

      <section aria-labelledby="medidas">
        <h2 id="medidas" class="subheading">{{ tr(copy.measuresTitle) }}</h2>
        <ul>
          <li v-for="m in copy.measures" :key="m.es">{{ tr(m) }}</li>
        </ul>
      </section>

      <section aria-labelledby="opciones">
        <h2 id="opciones" class="subheading">{{ tr(copy.panelTitle) }}</h2>
        <p>{{ tr(copy.panel) }}</p>
        <ul>
          <li v-for="o in copy.options" :key="o.es">{{ tr(o) }}</li>
        </ul>
      </section>

      <section aria-labelledby="limitaciones">
        <h2 id="limitaciones" class="subheading">{{ tr(copy.limitsTitle) }}</h2>
        <ul>
          <li v-for="l in copy.limits" :key="l.es">{{ tr(l) }}</li>
        </ul>
      </section>

      <section aria-labelledby="reportar">
        <h2 id="reportar" class="subheading">{{ tr(copy.reportTitle) }}</h2>
        <p>{{ tr(copy.report) }}</p>
        <dl class="channels">
          <div>
            <dt>{{ tr(copy.email) }}</dt>
            <dd><a :href="`mailto:${company.email}?subject=Accesibilidad`" class="link">{{ company.email }}</a></dd>
          </div>
          <div>
            <dt>{{ tr(copy.phone) }}</dt>
            <dd><a :href="company.phones[0].href" class="link">{{ lang === 'en' ? company.phones[0].intl : company.phones[0].display }}</a></dd>
          </div>
          <div>
            <dt>{{ tr(copy.form) }}</dt>
            <dd><NuxtLinkLocale to="/contacto?asunto=pqr" class="link">{{ tr(copy.formLink) }}</NuxtLinkLocale></dd>
          </div>
        </dl>
      </section>

      <p class="muted statement__date">
        {{ tr(copy.reviewed) }} <time :datetime="reviewed">{{ formatDate(reviewed, lang) }}</time>.
      </p>
    </div>
  </div>
</template>

<style scoped>
.statement {
  display: grid;
  gap: 2.5rem;
  max-width: var(--container-measure);
  margin-inline: auto;
  padding-block: var(--spacing-section-sm) var(--spacing-section);
}

@media (width >= 64rem) {
  .statement {
    margin-inline: 0;
  }
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

.channels {
  display: grid;
  gap: 0.75rem;
}

.channels dt {
  font-weight: 700;
}

.statement__date {
  font-size: var(--text-sm);
}
</style>
