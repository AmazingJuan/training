/**
 * Corporate facts. Every value here was verified on trainingcorporation.com.co,
 * its WordPress API, or the PDFs published there (checked 2026-10-14), or was
 * supplied by the company (corrections of 2026-11-02).
 * Do not add figures, clients or claims that are not on record.
 * Texts are bilingual (`Loc`): Spanish is the original, English the translation.
 */

// Documents are served from this site at the paths they had on the old WordPress
// site (public/docs, public/wp-content), so existing links to them keep working.
const site = ''

export const company = {
  legalName: 'Training Corporation S.A.S.',
  shortName: 'Training Corporation',
  tagline: {
    es: 'Auditoría, consultoría y formación en sistemas de gestión',
    en: 'Auditing, consulting and training in management systems',
  },
  // Source: home page, "Somos Training".
  summary: {
    es: 'Contribuimos al desarrollo de las competencias de las personas mediante profesionales de alto desempeño. Diseñamos servicios de formación, consultoría y evaluación organizacional para organizaciones que buscan fortalecer su competitividad.',
    en: 'We contribute to the development of people’s competencies through high-performing professionals. We design training, consulting and organizational assessment services for organizations seeking to strengthen their competitiveness.',
  },
  // Source: /portafolio-de-servicios/ intro.
  method: {
    es: 'Investigamos y diseñamos métodos para la prestación de servicios de formación, consultoría y evaluación organizacional que contribuyan a la competitividad de las organizaciones mediante el desarrollo de las competencias de su personal.',
    en: 'We research and design methods for delivering training, consulting and organizational assessment services that contribute to organizations’ competitiveness by developing the competencies of their staff.',
  },
  address: {
    street: 'Carrera 43A n.º 1A Sur-29',
    building: 'Edificio Colmena',
    office: { es: 'Oficina 315', en: 'Office 315' },
    area: 'Avenida El Poblado',
    city: 'Medellín',
    region: 'Antioquia',
    country: 'Colombia',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Edificio+Colmena+Carrera+43A+1A+Sur+29+Medell%C3%ADn',
  },
  phones: [
    { label: { es: 'Fijo', en: 'Landline' }, display: '(604) 574 25 90', intl: '+57 604 574 25 90', href: 'tel:+576045742590' },
    { label: { es: 'Móvil', en: 'Mobile' }, display: '321 707 9467', intl: '+57 321 707 9467', href: 'tel:+573217079467' },
  ],
  whatsapp: { display: '321 707 9467', href: 'https://wa.me/573217079467' },
  email: 'gerencia@trainingcorporation.com.co',
  social: {
    facebook: 'https://www.facebook.com/Trainingcorporationsas/',
    linkedin: 'https://www.linkedin.com/in/training-corporation-s-a-s-04731626a',
  },
  intranet: 'https://trainingcorpltda.sharepoint.com/sites/InnTraining2',
} as const

export interface Certification {
  code: string
  name: Loc
  issuer: string
  number: Loc
  since: Loc
  until: Loc | null
  document: string
}

/** Source: /empresa/sistema-de-gestion-integrado/ and news posts of 2022-06-18. */
export const certifications: Certification[] = [
  // Issuer, numbers and dates as printed on each certificate (PDFs/JPG linked below).
  {
    code: 'ISO 9001:2015',
    name: { es: 'Sistema de gestión de la calidad', en: 'Quality management system' },
    issuer: 'Bureau Veritas Certification',
    number: { es: 'Certificado CO24.05728', en: 'Certificate CO24.05728' },
    since: { es: 'Certificados desde marzo de 2021', en: 'Certified since March 2021' },
    until: { es: 'Vigente hasta el 10 de marzo de 2027', en: 'Valid until March 10, 2027' },
    document: `${site}/docs/TC-9001-NUEVO.pdf`,
  },
  {
    code: 'ISO 45001:2018',
    name: { es: 'Sistema de gestión de la seguridad y salud en el trabajo', en: 'Occupational health and safety management system' },
    issuer: 'Bureau Veritas Certification',
    number: { es: 'Certificado CO24.05730', en: 'Certificate CO24.05730' },
    since: { es: 'Certificados desde marzo de 2021', en: 'Certified since March 2021' },
    until: { es: 'Vigente hasta el 10 de marzo de 2027', en: 'Valid until March 10, 2027' },
    document: `${site}/docs/TC-45001-NUEVO.pdf`,
  },
  {
    code: 'IAM',
    name: { es: 'Miembro corporativo de The Institute of Asset Management', en: 'Corporate member of The Institute of Asset Management' },
    issuer: 'The Institute of Asset Management',
    number: { es: 'Miembro n.º 4000083', en: 'Member no. 4000083' },
    since: { es: 'Miembro desde agosto de 2024', en: 'Member since August 2024' },
    until: null,
    document: `${site}/wp-content/uploads/2024/12/Certificado-IAM-2024_page-0001.jpg`,
  },
]

/** Countries outside Colombia where the company has worked (client list and corrections of 2026-11-02). */
export interface Country {
  /** ISO 3166-1 alpha-3, as used by the map geometry. */
  iso: string
  name: Loc
}

/** Source: /empresa/ "Presencia nacional e internacional", plus the international clients. */
export const presence = {
  departments: [
    'Arauca', 'Antioquia', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá',
    'Casanare', 'Cesar', 'Cundinamarca', 'Córdoba', 'Huila', 'Meta', 'Nariño',
    'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'Santander',
    'Tolima', 'Valle del Cauca',
  ],
  countries: [
    { iso: 'GTM', name: { es: 'Guatemala', en: 'Guatemala' } },
    { iso: 'SLV', name: { es: 'El Salvador', en: 'El Salvador' } },
    { iso: 'NIC', name: { es: 'Nicaragua', en: 'Nicaragua' } },
    { iso: 'CRI', name: { es: 'Costa Rica', en: 'Costa Rica' } },
  ] satisfies Country[],
} as const

/** Source: /empresa/ "Propósito empresarial". */
export const purpose = {
  text: {
    es: 'Como empresa que fortalece el crecimiento de las organizaciones mediante la transferencia de conocimiento en servicios de evaluación, formación, consultoría y asesoría, nos proponemos alcanzar en 2030 nuestra meta de ventas y consolidar nuestra presencia nacional e internacional, a partir de la mejora de la calidad de vida de nuestros grupos de interés.',
    en: 'As a company that strengthens the growth of organizations through knowledge transfer in assessment, training, consulting and advisory services, we aim to reach our sales goal by 2030 and to consolidate our national and international presence by improving the quality of life of our stakeholders.',
  },
  guidelines: [
    { es: 'Generar confianza y fortalecer las relaciones en el tiempo.', en: 'Build trust and strengthen relationships over time.' },
    { es: 'Cumplir la normatividad aplicable a los modelos de gestión certificados.', en: 'Comply with the regulations applicable to our certified management models.' },
    { es: 'Contribuir a la sostenibilidad a partir de nuestra neutralidad en carbono.', en: 'Contribute to sustainability through our carbon neutrality.' },
    { es: 'Gestionar los riesgos para establecer controles que aseguren el mejoramiento continuo.', en: 'Manage risks to establish controls that ensure continual improvement.' },
    { es: 'Promover los mecanismos de participación y consulta.', en: 'Promote participation and consultation mechanisms.' },
    { es: 'Promover la seguridad y la salud mediante la identificación y eliminación de peligros.', en: 'Promote health and safety by identifying and eliminating hazards.' },
    { es: 'Respetar los derechos de los titulares de los datos personales.', en: 'Respect the rights of personal data subjects.' },
    { es: 'Respetar el derecho a la desconexión laboral.', en: 'Respect the right to disconnect from work.' },
  ],
}

/** Source: /empresa/ "Valores". */
export const values: { name: Loc, text: Loc }[] = [
  { name: { es: 'Respeto', en: 'Respect' }, text: { es: 'Reconocemos las diferencias entre las personas y actuamos para preservar la armonía.', en: 'We recognize the differences between people and act to preserve harmony.' } },
  { name: { es: 'Responsabilidad', en: 'Responsibility' }, text: { es: 'Somos fieles a los propósitos y compromisos adquiridos con los grupos de interés, mediante el autocontrol, la autorregulación y la autogestión.', en: 'We remain true to the purposes and commitments made to our stakeholders through self-control, self-regulation and self-management.' } },
  { name: { es: 'Unidad', en: 'Unity' }, text: { es: 'Sumamos nuestros esfuerzos para alcanzar una visión compartida.', en: 'We join our efforts to achieve a shared vision.' } },
  { name: { es: 'Honestidad', en: 'Honesty' }, text: { es: 'Actuamos con coherencia entre lo que pensamos, decimos y hacemos.', en: 'We act consistently with what we think, say and do.' } },
]

/** Source: /empresa/ "Principios". */
export const principles: { name: Loc, text: Loc }[] = [
  { name: { es: 'Inclusividad', en: 'Inclusiveness' }, text: { es: 'Reconocemos a nuestros grupos de interés como la principal fuente de los factores clave de éxito y propiciamos espacios para su participación en soluciones de beneficio mutuo.', en: 'We recognize our stakeholders as the main source of our key success factors and create opportunities for them to take part in mutually beneficial solutions.' } },
  { name: { es: 'Relevancia', en: 'Relevance' }, text: { es: 'Valoramos a los grupos de interés mediante el aprendizaje permanente de nuestros profesionales, para innovar y gestionar conocimiento que mejore su calidad de vida.', en: 'We serve our stakeholders through the continuous learning of our professionals, in order to innovate and manage knowledge that improves their quality of life.' } },
  { name: { es: 'Capacidad de respuesta', en: 'Responsiveness' }, text: { es: 'Establecemos acuerdos de niveles de servicio (ANS) con los grupos de interés para mantener relaciones de confianza y crecimiento.', en: 'We establish service level agreements (SLAs) with our stakeholders to maintain relationships of trust and growth.' } },
  { name: { es: 'Sostenibilidad', en: 'Sustainability' }, text: { es: 'Mantenemos el equilibrio empresarial entre la gestión de la seguridad y salud en el trabajo, los grupos de interés y la rentabilidad.', en: 'We maintain a business balance between occupational health and safety management, our stakeholders and profitability.' } },
]

/** Source: footer "Convenios" image on every page. */
export const agreements = ['Universidad de Medellín', 'Cámara de Comercio de Bogotá'] as const

export interface Person {
  slug: string
  /**
   * Standard form for everyone: full given names and both surnames, with
   * capitals and accents (from /empresa/equipo/; John Fredy's second surname
   * as signed on the SST license and the hygiene regulations).
   */
  name: string
  role: Loc
  /** Square portrait, face at the same scale and height in every photo. */
  photo: string
  /** Third-person profile, built from the person's statement on /empresa/equipo/. */
  profile: Loc
  credentials?: Loc[]
}

/** Source: /empresa/equipo/ (portraits from the same page, re-cropped to one standard). */
export const team: Person[] = [
  {
    slug: 'nancy-rodriguez',
    name: 'Nancy Liliana Rodríguez Vásquez',
    role: { es: 'Gerente', en: 'General Manager' },
    photo: '/images/equipo/nancy-rodriguez.jpg',
    profile: {
      es: 'Dirige la compañía. Bajo su gerencia, los métodos de auditoría de Training Corporation han obtenido reconocimiento nacional por incorporar buenas prácticas derivadas de la calificación internacional de sus auditores líderes, de su experiencia en centenares de auditorías y de su conocimiento de diversos sectores económicos.',
      en: 'Leads the company. Under this leadership, Training Corporation’s audit methods have earned national recognition for incorporating good practices drawn from its lead auditors’ international qualifications, their experience in hundreds of audits and their knowledge of a wide range of economic sectors.',
    },
  },
  {
    slug: 'john-fredy-moreno',
    name: 'John Fredy Moreno Velásquez',
    role: { es: 'Asesor experto', en: 'Senior Advisor' },
    photo: '/images/equipo/john-fredy-moreno.jpg',
    profile: {
      es: 'Asesora a las organizaciones que confían a Training Corporation sus retos de formación, consultoría y evaluación organizacional, incluidos los compromisos de carácter legal ante las entidades gubernamentales de vigilancia y control.',
      en: 'Advises the organizations that entrust Training Corporation with their training, consulting and organizational assessment challenges, including legal obligations before government oversight and control bodies.',
    },
    credentials: [
      { es: 'Ingeniero industrial', en: 'Industrial engineer' },
      { es: 'Especialista en alta gerencia', en: 'Specialist in senior management' },
      { es: 'Auditor líder ISO 9001, 14001, 45001 y 55001', en: 'ISO 9001, 14001, 45001 and 55001 lead auditor' },
      { es: 'Auditor del Consejo Nacional de Operación', en: 'National Operation Council (C.N.O.) auditor' },
    ],
  },
  {
    slug: 'elsy-quintero',
    name: 'Elsy Amparo Quintero López',
    role: { es: 'Directora administrativa y financiera', en: 'Administrative and Financial Director' },
    photo: '/images/equipo/elsy-quintero.jpg',
    profile: {
      es: 'Dirige la adquisición, administración y entrega oportuna de los recursos, espacios, productos y servicios que requiere la operación, para que la gestión del conocimiento que ofrecen los servicios de la compañía cumpla el propósito empresarial.',
      en: 'Directs the procurement, administration and timely delivery of the resources, facilities, products and services the operation requires, so that the knowledge management offered through the company’s services fulfills its corporate purpose.',
    },
  },
  {
    slug: 'jesica-garcia',
    name: 'Jessica María García Vélez',
    role: { es: 'Profesional de aseguramiento del modelo de gestión', en: 'Management Model Assurance Professional' },
    photo: '/images/equipo/jesica-garcia.jpg',
    profile: {
      es: 'Asegura la oportunidad y la eficacia en el logro y el mejoramiento de los objetivos estratégicos y del sistema de gestión integrado en calidad y en seguridad y salud en el trabajo.',
      en: 'Ensures the timeliness and effectiveness with which the strategic objectives and the integrated quality and occupational health and safety management system are achieved and improved.',
    },
  },
  {
    slug: 'angela-manrique',
    name: 'Ángela María Manrique Patiño',
    role: { es: 'Profesional de gestión del conocimiento', en: 'Knowledge Management Professional' },
    photo: '/images/equipo/angela-manrique.jpg',
    profile: {
      es: 'Ejecuta servicios de auditoría, formación y consultoría para la organización y sus clientes, con una orientación permanente al mejoramiento y a la generación de valor agregado.',
      en: 'Delivers auditing, training and consulting services for the organization and its clients, with a constant focus on improvement and added value.',
    },
    credentials: [
      { es: 'Administradora de empresas', en: 'Business administrator' },
      { es: 'Especialista en gerencia de la salud ocupacional, con licencia de SST', en: 'Specialist in occupational health management, with an OHS license' },
      { es: 'Auditora líder NTC-ISO 9001, 14001, 45001 y 55001', en: 'NTC-ISO 9001, 14001, 45001 and 55001 lead auditor' },
    ],
  },
  {
    slug: 'christian-correa',
    name: 'Christian Felipe Correa Arroyave',
    role: { es: 'Profesional de innovación', en: 'Innovation Professional' },
    photo: '/images/equipo/christian-correa.jpg',
    profile: {
      es: 'Identifica, desde la innovación, nuevas oportunidades de negocio y tecnologías que contribuyan al cumplimiento de los objetivos estratégicos, con la aplicación de las normas NTC 5800 y NTC 5801, la guía PMBOK y la metodología Design Thinking.',
      en: 'Identifies, through innovation, new business opportunities and technologies that contribute to the strategic objectives, applying the NTC 5800 and NTC 5801 standards, the PMBOK guide and the Design Thinking methodology.',
    },
  },
  {
    slug: 'daniela-palacio',
    name: 'Daniela Palacio Moreno',
    role: { es: 'Profesional administrativa', en: 'Administrative Professional' },
    photo: '/images/equipo/daniela-palacio.jpg',
    profile: {
      es: 'Presta apoyo administrativo a todas las unidades estratégicas: logística de los servicios, trámites legales y documentales, bases de datos, PQRS y gestión comercial.',
      en: 'Provides administrative support to all strategic business units: service logistics, legal and document procedures, databases, requests and complaints, and sales management.',
    },
  },
]

export interface Case {
  /** Omitted when the company has not named the client. */
  client?: string
  /** The client's former name, shown so earlier records still match. */
  formerly?: string
  year?: number
  /** What was done, in one sentence. */
  title: Loc
  detail?: Loc
  line: string
  newsSlug?: string
  image?: string
  imageAlt?: Loc
}

/**
 * Selected projects. ISA's comes from the news post of 2022; the others were
 * listed by the company on 2026-11-02 and await their scope, year and photos
 * (do not add details that the company has not supplied).
 */
export const cases: Case[] = [
  {
    client: 'ISA Energía',
    formerly: 'ISA Intercolombia',
    year: 2022,
    title: {
      es: 'Programa de auditorías que cubre el ciclo de certificación de cinco modelos de gestión',
      en: 'An audit program covering the certification cycle of five management models',
    },
    detail: {
      es: 'Calidad, ambiente, seguridad y salud en el trabajo, seguridad de la información y gestión de activos, con un enfoque de ciclo de vida en lugar del esquema habitual de un año.',
      en: 'Quality, environment, occupational health and safety, information security and asset management, with a life-cycle approach instead of the usual one-year scheme.',
    },
    line: 'hseq',
    newsSlug: 'isa-intercolombia',
    image: '/images/fotos/isa-torre-transmision.jpg',
    imageAlt: { es: 'Torre de transmisión eléctrica en zona rural', en: 'Electricity transmission tower in a rural area' },
  },
  {
    client: 'CEO, Compañía Energética de Occidente',
    title: { es: 'Servicio pericial', en: 'Expert witness service' },
    line: 'servicios-regulatorios',
  },
  {
    client: 'EMSA, Electrificadora del Meta',
    title: { es: 'Programas de formación para sus equipos', en: 'Training programs for the company’s teams' },
    line: 'servicios-regulatorios',
  },
  {
    title: { es: 'Auditorías a proyectos de generación fotovoltaica', en: 'Audits of photovoltaic generation projects' },
    line: 'servicios-regulatorios',
  },
  {
    title: { es: 'Auditorías regulatorias', en: 'Regulatory audits' },
    line: 'servicios-regulatorios',
  },
  {
    title: { es: 'Proyecto de interventoría', en: 'Technical supervision project' },
    line: 'servicios-regulatorios',
  },
  {
    title: { es: 'Auditorías a laboratorios', en: 'Laboratory audits' },
    line: 'laboratorios',
  },
  {
    title: { es: 'Proyecto de análisis HAZOP', en: 'HAZOP study project' },
    line: 'hseq',
  },
]

export interface CompanyDocument {
  title: Loc
  href: string
  kind: 'pdf' | 'xls' | 'jpg'
}

/** Source: /empresa/sistema-de-gestion-integrado/ and /empresa/. */
export const sgiDocuments: CompanyDocument[] = [
  { title: { es: 'Certificado ISO 9001:2015', en: 'ISO 9001:2015 certificate' }, href: `${site}/docs/TC-9001-NUEVO.pdf`, kind: 'pdf' },
  { title: { es: 'Certificado ISO 45001:2018', en: 'ISO 45001:2018 certificate' }, href: `${site}/docs/TC-45001-NUEVO.pdf`, kind: 'pdf' },
  { title: { es: 'Licencia de seguridad y salud en el trabajo', en: 'Occupational health and safety license' }, href: `${site}/docs/licencia-sst-2025.pdf`, kind: 'pdf' },
  { title: { es: 'Manual de protección de datos personales', en: 'Personal data protection manual' }, href: `${site}/docs/manual-proteccion-datos-personales.pdf`, kind: 'pdf' },
  { title: { es: 'Reglamento de higiene y seguridad industrial', en: 'Industrial hygiene and safety regulations' }, href: `${site}/docs/reglamento-higiene-seguridad-2026.pdf`, kind: 'pdf' },
]

const bulletin = (file: string) => `${site}/wp-content/uploads/2024/12/${file}`

/** Source: /empresa/sistema-de-gestion-integrado/ "Boletín informativo". */
export const bulletins: CompanyDocument[] = [
  { title: { es: 'Propósito empresarial y objetivos del SGI', en: 'Corporate purpose and IMS objectives' }, href: bulletin('BI%20-%2001%20-%202024%20-%20Prop%C3%B3sito%20empresarial%20y%20Objetivos%20SGI.%20(1).pdf'), kind: 'pdf' },
  { title: { es: 'Importancia del orden y el aseo', en: 'The importance of order and cleanliness' }, href: bulletin('BI%20-%2002%20-%202024%20-%20Importancia%20Orden%20y%20Aseo_.pdf'), kind: 'pdf' },
  { title: { es: 'Protocolo de emergencias', en: 'Emergency protocol' }, href: bulletin('BI%20-%2003%20-%202024%20-%20Protocolo%20de%20emergencias.pdf'), kind: 'pdf' },
  { title: { es: 'Manejo de sustancias químicas', en: 'Handling chemical substances' }, href: bulletin('BI%20-%2004%20-%202024%20-%20Manejo%20de%20sustancias%20qu%C3%ADmicas.%20.pdf'), kind: 'pdf' },
  { title: { es: 'Pausas activas', en: 'Active breaks' }, href: bulletin('BI%20-%2005%20-%202024%20-%20Pausas%20activas.pdf'), kind: 'pdf' },
  { title: { es: '¿Cómo gestionar el estrés?', en: 'How to manage stress' }, href: bulletin('BI%20-%2006%20-%202024%20-%20%C2%BFC%C3%B3mo%20gestionar%20el%20estr%C3%A9s.pdf'), kind: 'pdf' },
  { title: { es: 'Riesgos asociados al ruido y la iluminación', en: 'Risks associated with noise and lighting' }, href: bulletin('BI%20-%2007%20-%202024%20-%20Riesgos%20y%20peligros%20asociados%20a%20Ruido%20e%20Iluminaci%C3%B3n.pdf'), kind: 'pdf' },
]

/**
 * Source: documents sent by the company on 2026-11-02 (the roles and
 * responsibilities manual was withdrawn the same day). Old addresses redirect
 * here (nuxt.config.ts, legacyRedirects).
 */
export const contractorDocuments: CompanyDocument[] = [
  { title: { es: 'Formato de cuenta de cobro', en: 'Invoice (cuenta de cobro) template' }, href: `${site}/docs/formato-cuenta-de-cobro.xls`, kind: 'xls' },
  { title: { es: 'Manual de contratistas y proveedores', en: 'Contractors and suppliers manual' }, href: `${site}/docs/manual-contratistas-proveedores.pdf`, kind: 'pdf' },
]

/** The personal data policy, linked from the footer and the contact form's consent. */
export const dataPolicy = `${site}/docs/manual-proteccion-datos-personales.pdf`

/** Documents are published in Spanish only; English pages say so next to each link. */
export const documentsLanguage: Loc = { es: '', en: 'In Spanish' }
