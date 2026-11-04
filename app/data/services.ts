/**
 * Services, organised the way the company works: three strategic business
 * units (UEN) — auditoría, consultoría, formación — across five lines.
 * Items come from the official portfolio PDFs linked on each
 * /portafolio-de-servicios/* page (March 2024 uploads), from /empresa/equipo/
 * (audit list) and from the news posts; each was assigned to the unit that
 * delivers it. Line slugs keep the current URLs.
 *
 * Every text is bilingual (`Loc`): Spanish is the original, English the translation.
 */

export type ModeId = 'auditoria' | 'consultoria' | 'formacion'

export interface Mode {
  id: ModeId
  name: Loc
  /** The unit's name inside the company (news post of 2022-06-18). */
  unit: Loc
  /** One sentence: what this unit does. */
  summary: Loc
}

/** Same text in both languages (standards, codes, proper names). */
const both = (s: string): Loc => ({ es: s, en: s })

export const modes: Mode[] = [
  {
    id: 'auditoria',
    name: { es: 'Auditoría', en: 'Auditing' },
    unit: { es: 'Evaluación organizacional', en: 'Organizational assessment' },
    summary: {
      es: 'Auditorías de primera y segunda parte y verificaciones regulatorias, realizadas por auditores líderes certificados.',
      en: 'First- and second-party audits and regulatory verifications, conducted by certified lead auditors.',
    },
  },
  {
    id: 'consultoria',
    name: { es: 'Consultoría', en: 'Consulting' },
    unit: { es: 'Consultoría y nuevos negocios', en: 'Consulting and new business' },
    summary: {
      es: 'Diagnóstico, diseño, implementación y mantenimiento de sistemas de gestión, en conjunto con el equipo de la organización.',
      en: 'Diagnosis, design, implementation and maintenance of management systems, together with the organization’s own team.',
    },
  },
  {
    id: 'formacion',
    name: { es: 'Formación', en: 'Training' },
    unit: { es: 'Gestión del conocimiento', en: 'Knowledge management' },
    summary: {
      es: 'Diplomados, cursos de fundamentos y formación y calificación de auditores internos.',
      en: 'Diploma programs, foundation courses, and training and qualification of internal auditors.',
    },
  },
]

export const findMode = (id: string) => modes.find((m) => m.id === id)

/** A block of services inside one unit and line, optionally by sub-area (Calidad, SST…). */
export interface OfferGroup {
  area?: Loc
  items: Loc[]
}

export interface ServiceLine {
  slug: string
  name: Loc
  /** Short name for tight spaces (navigation, chips). */
  short: Loc
  /** One sentence, from the PDF cover. */
  lede: Loc
  /** Who it is for / regulatory context, from the PDF. */
  context: Loc
  offers: Record<ModeId, OfferGroup[]>
  benefits: Loc[]
  /** Normative frameworks named in the PDF. */
  frameworks: Loc[]
  sourcePdf: string
  /** Search result title and description: the standards people search for. */
  seo: { title: Loc, description: Loc }
  /** The standard or regulation people search with this line (titles of explorer pages). */
  keyword: Loc
}

const pdf = (file: string) => `/wp-content/uploads/2024/03/${file}`

const area = {
  calidad: { es: 'Calidad', en: 'Quality' },
  sst: { es: 'Seguridad y salud en el trabajo', en: 'Occupational health and safety' },
  ambiental: { es: 'Gestión ambiental', en: 'Environmental management' },
  integrado: { es: 'Sistema integrado', en: 'Integrated system' },
} satisfies Record<string, Loc>

export const services: ServiceLine[] = [
  {
    slug: 'hseq',
    name: { es: 'Sistemas de gestión HSEQ', en: 'HSEQ management systems' },
    short: both('HSEQ'),
    lede: {
      es: 'Calidad, ambiente y seguridad y salud en el trabajo, de manera independiente o como sistema integrado.',
      en: 'Quality, environment, and occupational health and safety, separately or as an integrated system.',
    },
    context: {
      es: 'Acompañamos a empresas públicas y privadas en la implementación, integración, auditoría y mantenimiento de sus sistemas de gestión, incluido el Modelo Integrado de Planeación y Gestión (MIPG) para entidades públicas.',
      en: 'We support public and private organizations in implementing, integrating, auditing and maintaining their management systems, including the Integrated Planning and Management Model (MIPG) required of Colombian public entities.',
    },
    offers: {
      auditoria: [
        {
          area: area.calidad,
          items: [
            { es: 'Auditoría interna a NTC-ISO 9001', en: 'Internal audit against NTC-ISO 9001' },
            { es: 'Auditoría interna al Modelo Integrado de Planeación y Gestión (MIPG), Decreto 1499 de 2017', en: 'Internal audit of the Integrated Planning and Management Model (MIPG), Decree 1499 of 2017' },
            { es: 'Auditoría de segunda parte a proveedores', en: 'Second-party supplier audits' },
          ],
        },
        {
          area: area.sst,
          items: [
            { es: 'Auditoría interna a NTC-ISO 45001', en: 'Internal audit against NTC-ISO 45001' },
            { es: 'Auditoría interna al SG-SST según el Decreto 1072 de 2015 y la Resolución 0312 de 2019', en: 'Internal audit of the OHS management system under Decree 1072 of 2015 and Resolution 0312 of 2019' },
            { es: 'Auditoría de segunda parte al cumplimiento del SG-SST', en: 'Second-party audit of OHS management system compliance' },
            { es: 'Auditoría al plan estratégico de seguridad vial (Resolución 40595 de 2022)', en: 'Audit of the strategic road safety plan (Resolution 40595 of 2022)' },
          ],
        },
        {
          area: area.integrado,
          items: [
            { es: 'Auditoría interna integrada a NTC-ISO 9001, 14001 y 45001', en: 'Integrated internal audit against NTC-ISO 9001, 14001 and 45001' },
            { es: 'Auditoría de segunda parte al sistema integrado', en: 'Second-party audit of the integrated system' },
          ],
        },
      ],
      consultoria: [
        {
          area: area.calidad,
          items: [
            { es: 'Diagnóstico e implementación de NTC-ISO 9001', en: 'NTC-ISO 9001 gap analysis and implementation' },
            { es: 'Plataforma estratégica, indicadores y revisión por la dirección', en: 'Strategic framework, indicators and management review' },
            { es: 'Gestión de riesgos y oportunidades y estandarización de procesos', en: 'Risk and opportunity management and process standardization' },
            { es: 'Implementación del MIPG según el Decreto 1499 de 2017', en: 'MIPG implementation under Decree 1499 of 2017' },
            { es: 'Investigación, diseño e innovación (I+D+i)', en: 'Research, design and innovation (R&D&I)' },
            { es: 'Cumplimiento de RETIE y RETILAP', en: 'Compliance with RETIE and RETILAP' },
          ],
        },
        {
          area: area.sst,
          items: [
            { es: 'Diseño, administración y ejecución del SG-SST (Decreto 1072 de 2015, Resolución 0312 de 2019)', en: 'Design, administration and operation of the OHS management system (Decree 1072 of 2015, Resolution 0312 of 2019)' },
            { es: 'Lineamientos de SST para el sector eléctrico (Resolución 5018 de 2019)', en: 'OHS guidelines for the electricity sector (Resolution 5018 of 2019)' },
            { es: 'Plan estratégico de seguridad vial (Resolución 40595 de 2022)', en: 'Strategic road safety plan (Resolution 40595 of 2022)' },
            { es: 'Plan de gestión del riesgo de desastres (Ley 1523 de 2012), simulacros y simulaciones', en: 'Disaster risk management plan (Law 1523 of 2012), drills and simulations' },
            { es: 'Sistema Globalmente Armonizado (Resolución 773 de 2021)', en: 'Globally Harmonized System (Resolution 773 of 2021)' },
            { es: 'COPASST, comité de convivencia, brigadas y programas de vigilancia epidemiológica', en: 'Joint OHS committee (COPASST), workplace coexistence committee, emergency brigades and epidemiological surveillance programs' },
            { es: 'Investigación de incidentes, inspecciones de seguridad e higiene industrial', en: 'Incident investigation, safety inspections and industrial hygiene' },
            { es: 'Batería psicolaboral y fisioterapia en SST', en: 'Psychosocial risk assessment and occupational physiotherapy' },
          ],
        },
        {
          area: area.ambiental,
          items: [
            { es: 'Implementación de NTC-ISO 14001', en: 'NTC-ISO 14001 implementation' },
            { es: 'Gases de efecto invernadero según NTC-ISO 14064', en: 'Greenhouse gas accounting under NTC-ISO 14064' },
            { es: 'Aspectos e impactos ambientales y requisitos legales', en: 'Environmental aspects and impacts, and legal requirements' },
            { es: 'Gestión integral de residuos y aforo de residuos sólidos', en: 'Comprehensive waste management and solid waste measurement' },
            { es: 'Evaluación ambiental de proyectos constructivos y revisiones socioambientales', en: 'Environmental assessment of construction projects and social and environmental reviews' },
          ],
        },
        {
          area: area.integrado,
          items: [
            { es: 'Elaboración, implementación y mantenimiento del sistema de gestión integrado', en: 'Development, implementation and maintenance of the integrated management system' },
            { es: 'Riesgos, peligros, indicadores y revisión por la dirección del sistema integrado', en: 'Risks, hazards, indicators and management review of the integrated system' },
          ],
        },
      ],
      formacion: [
        {
          area: area.calidad,
          items: [
            { es: 'Fundamentos de NTC-ISO 9001', en: 'NTC-ISO 9001 foundations' },
            { es: 'Formación y calificación de auditores internos ISO 9001 con la guía GTC-ISO 19011', en: 'ISO 9001 internal auditor training and qualification, following GTC-ISO 19011' },
            { es: 'Formación en el Modelo Integrado de Planeación y Gestión (MIPG)', en: 'Training in the Integrated Planning and Management Model (MIPG)' },
          ],
        },
        {
          area: area.sst,
          items: [
            { es: 'Fundamentos de NTC-ISO 45001', en: 'NTC-ISO 45001 foundations' },
            { es: 'Formación y calificación de auditores internos ISO 45001', en: 'ISO 45001 internal auditor training and qualification' },
            { es: 'Seguridad basada en el comportamiento y planes de emergencia', en: 'Behavior-based safety and emergency plans' },
            { es: 'Liderazgo transformador, trabajo en equipo, comunicación asertiva y resolución de conflictos', en: 'Transformational leadership, teamwork, assertive communication and conflict resolution' },
          ],
        },
        {
          area: area.ambiental,
          items: [
            { es: 'Fundamentos de NTC-ISO 14001', en: 'NTC-ISO 14001 foundations' },
            { es: 'Formación y calificación de auditores internos ISO 14001', en: 'ISO 14001 internal auditor training and qualification' },
            { es: 'Diplomado en sostenibilidad con auditor interno en huella de carbono', en: 'Diploma program in sustainability, with carbon footprint internal auditor qualification' },
          ],
        },
        {
          area: area.integrado,
          items: [{ es: 'Formación y calificación de auditores internos integrales HSEQ', en: 'Integrated HSEQ internal auditor training and qualification' }],
        },
      ],
    },
    benefits: [
      { es: 'Cumplir las normas y la regulación en calidad, ambiente y seguridad y salud en el trabajo.', en: 'Comply with quality, environmental and occupational health and safety standards and regulations.' },
      { es: 'Identificar peligros, riesgos y amenazas de forma sistemática.', en: 'Identify hazards, risks and threats systematically.' },
      { es: 'Tomar decisiones orientadas a la mejora de los procesos.', en: 'Make decisions aimed at improving processes.' },
      { es: 'Demostrar a los grupos de interés el compromiso con la calidad, la seguridad de las personas y el medio ambiente.', en: 'Demonstrate to stakeholders a commitment to quality, people’s safety and the environment.' },
    ],
    frameworks: [
      both('NTC-ISO 9001'), both('NTC-ISO 14001'), both('NTC-ISO 45001'), both('NTC-ISO 14064'),
      { es: 'Decreto 1072 de 2015', en: 'Decree 1072 of 2015' },
      { es: 'Resolución 0312 de 2019', en: 'Resolution 0312 of 2019' },
      { es: 'Decreto 1499 de 2017', en: 'Decree 1499 of 2017' },
      both('GTC-ISO 19011'),
    ],
    keyword: { es: 'ISO 9001, 14001 y 45001', en: 'ISO 9001, 14001 and 45001' },
    sourcePdf: pdf('PORTAFOLIO-HSEQ-CALIDAD-AMBIENTAL-SEGSST-1.pdf'),
    seo: {
      title: { es: 'Sistemas de gestión HSEQ: ISO 9001, 14001 y 45001', en: 'HSEQ management systems: ISO 9001, 14001 and 45001' },
      description: {
        es: 'Auditoría interna, consultoría y formación en ISO 9001, 14001 y 45001, Decreto 1072 y MIPG, para empresas y entidades públicas de toda Colombia.',
        en: 'Internal auditing, consulting and training in ISO 9001, 14001 and 45001, Decree 1072 and MIPG, for companies and public entities throughout Colombia.',
      },
    },
  },
  {
    slug: 'gestion-de-activos',
    name: { es: 'Gestión de activos', en: 'Asset management' },
    short: { es: 'Gestión de activos', en: 'Asset management' },
    lede: {
      es: 'Sistemas de gestión de activos según ISO 55001 para el sector eléctrico y el alumbrado público.',
      en: 'ISO 55001 asset management systems for the electricity sector and public lighting.',
    },
    context: {
      es: 'Los operadores de red deben cumplir la Resolución CREG 015 de 2018, y los municipios de categoría especial, primera y segunda deben certificar un sistema de gestión de activos de alumbrado público conforme a la Resolución 101 013 de 2022. Acompañamos ambos procesos con base en la norma ISO 55001.',
      en: 'Colombian distribution network operators must comply with CREG Resolution 015 of 2018, and special, first- and second-category municipalities must certify a public lighting asset management system under Resolution 101 013 of 2022. We support both processes on the basis of ISO 55001.',
    },
    offers: {
      auditoria: [
        {
          items: [
            { es: 'Auditoría interna al sistema de gestión de activos según NTC-ISO 55001', en: 'Internal audit of the asset management system against NTC-ISO 55001' },
          ],
        },
      ],
      consultoria: [
        {
          area: { es: 'Diagnóstico', en: 'Diagnosis' },
          items: [
            { es: 'Grado de madurez con la metodología de autoevaluación SAM del IAM', en: 'Maturity assessment using the IAM’s SAM self-assessment methodology' },
            { es: 'Brecha por numeral de NTC-ISO 55001, con su madurez de 0 a 100 %', en: 'Clause-by-clause NTC-ISO 55001 gap analysis, with maturity scored from 0 to 100%' },
            { es: 'Plan de trabajo de implementación con el valor de las inversiones para la certificación', en: 'Implementation work plan, with the investment required for certification' },
          ],
        },
        {
          area: { es: 'Implementación', en: 'Implementation' },
          items: [
            { es: 'Alineación del alcance del sistema con los activos del plan de inversión (CREG 015, art. 6.1)', en: 'Alignment of the system’s scope with the assets in the investment plan (CREG 015, art. 6.1)' },
            { es: 'Plan estratégico de gestión de activos (PEGA) y su derivación en planes tácticos y operativos', en: 'Strategic asset management plan (SAMP) and its cascade into tactical and operational plans' },
            { es: 'Alineación de funciones financieras y no financieras según ISO 55010', en: 'Alignment of financial and non-financial functions under ISO 55010' },
            { es: 'Decisiones basadas en costo, riesgo y desempeño y plan de mantenimiento optimizado', en: 'Cost, risk and performance-based decision-making and optimized maintenance planning' },
            { es: 'Criticidad (NORSOK Z-008), índice de salud (ISO 17359) y análisis de causa raíz (IEC 62740)', en: 'Criticality (NORSOK Z-008), health index (ISO 17359) and root cause analysis (IEC 62740)' },
            { es: 'Taxonomía de activos (ISO 14224), confiabilidad, gestión del cambio y casos de negocio', en: 'Asset taxonomy (ISO 14224), reliability, management of change and business cases' },
          ],
        },
      ],
      formacion: [
        {
          items: [
            { es: 'Diplomado en gestión de activos con certificación opcional de auditor líder ISO 55001', en: 'Diploma program in asset management, with optional ISO 55001 lead auditor certification' },
            { es: 'Fundamentos de NTC-ISO 55001', en: 'NTC-ISO 55001 foundations' },
            { es: 'Formación y calificación de auditores internos y líderes en gestión de activos', en: 'Asset management internal and lead auditor training and qualification' },
            { es: 'Taller para la alta dirección', en: 'Workshop for senior management' },
          ],
        },
      ],
    },
    benefits: [
      { es: 'Cumplir los artículos 6.1 y 6.3.3.4 de la Resolución CREG 015 de 2018.', en: 'Comply with articles 6.1 and 6.3.3.4 of CREG Resolution 015 of 2018.' },
      { es: 'Alinear el alcance del sistema con los activos del plan de inversión.', en: 'Align the system’s scope with the assets in the investment plan.' },
      { es: 'Disponer de un plan de trabajo a cuatro o cinco años para la certificación.', en: 'Have a four- to five-year work plan toward certification.' },
    ],
    frameworks: [
      both('NTC-ISO 55001'), both('ISO 55010'),
      { es: 'Resolución CREG 015 de 2018', en: 'CREG Resolution 015 of 2018' },
      { es: 'Resolución 101 013 de 2022', en: 'Resolution 101 013 of 2022' },
      { es: 'Metodología SAM del IAM', en: 'IAM SAM methodology' },
    ],
    keyword: both('ISO 55001'),
    sourcePdf: pdf('Portafolio-de-GA-1.pdf'),
    seo: {
      title: { es: 'Gestión de activos ISO 55001', en: 'ISO 55001 asset management' },
      description: {
        es: 'Auditoría, consultoría y formación en gestión de activos ISO 55001 para el sector eléctrico y el alumbrado público: CREG 015 de 2018 y Resolución 101 013.',
        en: 'ISO 55001 asset management auditing, consulting and training for the electricity sector and public lighting: CREG 015 of 2018 and Resolution 101 013.',
      },
    },
  },
  {
    slug: 'servicios-regulatorios',
    name: { es: 'Servicios regulatorios', en: 'Regulatory services' },
    short: { es: 'Regulatorios', en: 'Regulatory' },
    lede: {
      es: 'Verificaciones regulatorias del sector eléctrico colombiano y formación en calidad del servicio.',
      en: 'Regulatory verifications for the Colombian electricity sector and training in quality of service.',
    },
    context: {
      es: 'Realizamos las verificaciones que la CREG, el Consejo Nacional de Operación y XM exigen a los agentes del sector eléctrico, y formamos a sus equipos en la regulación de calidad del servicio.',
      en: 'We carry out the verifications that CREG (the energy and gas regulator), the National Operation Council (C.N.O.) and XM (the market operator) require of electricity sector agents, and we train their teams in quality-of-service regulation.',
    },
    offers: {
      auditoria: [
        {
          area: { es: 'Verificaciones regulatorias', en: 'Regulatory verifications' },
          items: [
            { es: 'Calidad del servicio en sistemas de distribución local (Resolución CREG 101 032 de 2022)', en: 'Quality of service in local distribution systems (CREG Resolution 101 032 of 2022)' },
            { es: 'Planes de inversión de los operadores de red (Resolución CREG 101 022 de 2022)', en: 'Network operators’ investment plans (CREG Resolution 101 022 of 2022)' },
            { es: 'Esquema de incentivos y compensaciones (CREG 015 de 2018, numeral 5.2.10)', en: 'Incentive and compensation scheme (CREG 015 of 2018, section 5.2.10)' },
            { es: 'Auditorías regulatorias según las resoluciones CREG 025 de 2013 y 097 de 2008', en: 'Regulatory audits under CREG resolutions 025 of 2013 and 097 of 2008' },
            { es: 'Guía de ciberseguridad del C.N.O. (Acuerdo 1502 de 2021)', en: 'C.N.O. cybersecurity guideline (Agreement 1502 of 2021)' },
            { es: 'Proyectos aprobados por la UPME', en: 'Projects approved by UPME (the mining and energy planning unit)' },
          ],
        },
        {
          area: { es: 'Auditorías de segunda parte', en: 'Second-party audits' },
          items: [
            { es: 'Proyectos ejecutados por contratistas y cumplimiento contractual', en: 'Projects executed by contractors and contractual compliance' },
            { es: 'Requisitos ambientales y de seguridad y salud en el trabajo de contratistas', en: 'Contractors’ environmental and occupational health and safety requirements' },
            { es: 'Cumplimiento del manual HSEQ para contratistas', en: 'Compliance with the HSEQ manual for contractors' },
          ],
        },
      ],
      consultoria: [
        {
          items: [
            { es: 'Reglamento técnico de instalaciones eléctricas (RETIE)', en: 'Technical regulation for electrical installations (RETIE)' },
            { es: 'Reglamento técnico de iluminación y alumbrado público (RETILAP)', en: 'Technical regulation for lighting and public lighting (RETILAP)' },
            { es: 'Remuneración de la distribución de energía según CREG 015 de 2018', en: 'Electricity distribution remuneration under CREG 015 of 2018' },
            { es: 'Lineamientos de SST en el sector eléctrico (Resolución 5018 de 2019)', en: 'OHS guidelines for the electricity sector (Resolution 5018 of 2019)' },
            { es: 'Autogeneración a pequeña escala y generación distribuida', en: 'Small-scale self-generation and distributed generation' },
          ],
        },
      ],
      formacion: [
        {
          items: [
            { es: 'Calidad del sistema de transmisión regional y de distribución local', en: 'Quality of regional transmission and local distribution systems' },
            { es: 'Clasificación y exclusión de eventos, calidad media e indicadores individuales', en: 'Event classification and exclusion, average quality and individual indicators' },
            { es: 'Remuneración de la distribución según CREG 015 de 2018 y Circular 036 de 2023', en: 'Distribution remuneration under CREG 015 of 2018 and Circular 036 of 2023' },
            { es: 'Autogeneración a pequeña escala, alumbrado público y contratos de calidad extra', en: 'Small-scale self-generation, public lighting and premium quality contracts' },
            { es: 'Diplomado en interventoría de obras eléctricas', en: 'Diploma program in technical supervision of electrical works' },
          ],
        },
      ],
    },
    benefits: [
      { es: 'Garantizar el cumplimiento de los requisitos legales aplicables.', en: 'Ensure compliance with applicable legal requirements.' },
      { es: 'Mantener las condiciones técnicas mínimas para la prestación del servicio.', en: 'Maintain the minimum technical conditions for service delivery.' },
      { es: 'Adaptar el negocio a los cambios regulatorios.', en: 'Adapt the business to regulatory change.' },
    ],
    frameworks: [
      { es: 'Resolución CREG 101 032 de 2022', en: 'CREG Resolution 101 032 of 2022' },
      { es: 'Resolución CREG 101 022 de 2022', en: 'CREG Resolution 101 022 of 2022' },
      { es: 'Resolución CREG 015 de 2018', en: 'CREG Resolution 015 of 2018' },
      { es: 'Acuerdo C.N.O. 1502 de 2021', en: 'C.N.O. Agreement 1502 of 2021' },
      both('RETIE'), both('RETILAP'),
    ],
    keyword: both('CREG'),
    sourcePdf: pdf('Portafolio-de-servicios-regulatorios-1.pdf'),
    seo: {
      title: { es: 'Servicios regulatorios del sector eléctrico (CREG)', en: 'Electricity sector regulatory services (CREG)' },
      description: {
        es: 'Verificaciones regulatorias para operadores de red: calidad del servicio (CREG 101 032), planes de inversión (CREG 101 022), CREG 015, RETIE y RETILAP.',
        en: 'Regulatory verifications for network operators: quality of service (CREG 101 032), investment plans (CREG 101 022), CREG 015, RETIE and RETILAP.',
      },
    },
  },
  {
    slug: 'seguridad-de-la-informacion-y-ciberseguridad',
    name: { es: 'Seguridad de la información y ciberseguridad', en: 'Information security and cybersecurity' },
    short: { es: 'Seguridad de la información', en: 'Information security' },
    lede: {
      es: 'Seguridad de la información, privacidad y ciberseguridad según ISO/IEC 27001.',
      en: 'Information security, privacy and cybersecurity under ISO/IEC 27001.',
    },
    context: {
      es: 'Trabajamos con organizaciones que implementan ISO/IEC 27001:2022 o realizan la transición a esa versión, con entidades de certificación digital que buscan la acreditación y con agentes del sector eléctrico obligados por la guía de ciberseguridad del C.N.O.',
      en: 'We work with organizations implementing or transitioning to ISO/IEC 27001:2022, digital certification entities seeking accreditation, and electricity sector agents bound by the C.N.O. cybersecurity guideline.',
    },
    offers: {
      auditoria: [
        {
          items: [
            { es: 'Auditoría a NTC-ISO/IEC 27001 con la guía GTC-ISO 19011', en: 'Audit against NTC-ISO/IEC 27001, following GTC-ISO 19011' },
            { es: 'Auditoría a la guía de ciberseguridad del C.N.O. (Acuerdo 1502 de 2021)', en: 'Audit against the C.N.O. cybersecurity guideline (Agreement 1502 of 2021)' },
            { es: 'Auditoría a los criterios CEA-3.0-07 para entidades de certificación digital', en: 'Audit against the CEA-3.0-07 criteria for digital certification entities' },
            { es: 'Auditoría a NTC-ISO 27701 (privacidad), NTC-ISO/IEC 27005 (riesgos) y NTC-ISO/IEC 27002 (controles)', en: 'Audit against NTC-ISO 27701 (privacy), NTC-ISO/IEC 27005 (risk) and NTC-ISO/IEC 27002 (controls)' },
          ],
        },
      ],
      consultoria: [
        {
          items: [
            { es: 'Diagnóstico e implementación de ISO/IEC 27001:2022', en: 'ISO/IEC 27001:2022 gap analysis and implementation' },
            { es: 'Transición de ISO/IEC 27001:2013 a la versión 2022', en: 'Transition from ISO/IEC 27001:2013 to the 2022 version' },
            { es: 'Diagnóstico para la acreditación digital según CEA-3.0-07', en: 'Readiness assessment for digital accreditation under CEA-3.0-07' },
            { es: 'Sistema de gestión de privacidad de la información según la Ley 1581 de 2012', en: 'Privacy information management system under Law 1581 of 2012' },
            { es: 'Planes de acción, mantenimiento, mejora y revisión por la dirección', en: 'Action plans, maintenance, improvement and management review' },
          ],
        },
      ],
      formacion: [
        {
          items: [
            { es: 'Cambios y fundamentos de ISO/IEC 27001:2022', en: 'ISO/IEC 27001:2022 changes and foundations' },
            { es: 'Formación y calificación de auditores internos ISO/IEC 27001', en: 'ISO/IEC 27001 internal auditor training and qualification' },
            { es: 'Controles según ISO/IEC 27002 y gestión de riesgos según ISO 27005', en: 'Controls under ISO/IEC 27002 and risk management under ISO 27005' },
            { es: 'Marco de ciberseguridad según GTC-ISO/IEC-TS 27110', en: 'Cybersecurity framework under GTC-ISO/IEC-TS 27110' },
            { es: 'Protección de datos personales y responsabilidad demostrada (Ley 1581 de 2012)', en: 'Personal data protection and demonstrated accountability (Law 1581 of 2012)' },
          ],
        },
      ],
    },
    benefits: [
      { es: 'Proteger y controlar la información de la organización.', en: 'Protect and control the organization’s information.' },
      { es: 'Identificar riesgos y amenazas para definir controles, protocolos y políticas.', en: 'Identify risks and threats in order to define controls, protocols and policies.' },
      { es: 'Demostrar a los grupos de interés el compromiso con la ciberseguridad.', en: 'Demonstrate to stakeholders a commitment to cybersecurity.' },
    ],
    frameworks: [
      both('NTC-ISO/IEC 27001:2022'), both('NTC-ISO/IEC 27002'), both('NTC-ISO 27701'), both('NTC-ISO/IEC 27005'), both('CEA-3.0-07'),
      { es: 'Ley 1581 de 2012', en: 'Law 1581 of 2012' },
    ],
    keyword: both('ISO/IEC 27001'),
    sourcePdf: pdf('Portafolio-del-servicio-de-seguridad-de-la-informacion-1.pdf'),
    seo: {
      title: { es: 'Seguridad de la información ISO/IEC 27001', en: 'ISO/IEC 27001 information security' },
      description: {
        es: 'Auditoría, consultoría y formación en seguridad de la información y ciberseguridad: ISO/IEC 27001:2022, guía del C.N.O. y protección de datos (Ley 1581).',
        en: 'Information security and cybersecurity auditing, consulting and training: ISO/IEC 27001:2022, the C.N.O. guideline and data protection (Law 1581).',
      },
    },
  },
  {
    slug: 'laboratorios',
    name: { es: 'Laboratorios', en: 'Laboratories' },
    short: { es: 'Laboratorios', en: 'Laboratories' },
    lede: {
      es: 'Laboratorios de ensayo y calibración y organismos de inspección según ISO/IEC 17025 y 17020.',
      en: 'Testing and calibration laboratories and inspection bodies under ISO/IEC 17025 and 17020.',
    },
    context: {
      es: 'Auditamos con alcance técnico en química de aceites, materiales y aguas; fisicoquímica; microbiología; ingeniería civil; metrología; medidores de agua, gas y energía; ingeniería eléctrica y mecánica, y transformadores de medida.',
      en: 'Our audits cover the technical scopes of oil, materials and water chemistry; physical chemistry; microbiology; civil engineering; metrology; water, gas and electricity meters; electrical and mechanical engineering; and instrument transformers.',
    },
    offers: {
      auditoria: [
        {
          items: [
            { es: 'Auditoría de primera parte a NTC-ISO/IEC 17025 (laboratorios de ensayo y calibración)', en: 'First-party audit against NTC-ISO/IEC 17025 (testing and calibration laboratories)' },
            { es: 'Auditoría de primera parte a NTC-ISO/IEC 17020 (organismos de inspección)', en: 'First-party audit against NTC-ISO/IEC 17020 (inspection bodies)' },
            { es: 'Medición de energía: calibración y ensayo en laboratorio y en sitio', en: 'Energy metering: laboratory and on-site calibration and testing' },
          ],
        },
      ],
      consultoria: [
        {
          items: [
            { es: 'Diagnóstico del sistema de gestión del laboratorio', en: 'Laboratory management system diagnosis' },
            { es: 'Diseño e implementación del sistema según NTC-ISO/IEC 17025', en: 'System design and implementation under NTC-ISO/IEC 17025' },
            { es: 'Planes de acción para cumplir ISO/IEC 17020 e ISO/IEC 17025', en: 'Action plans to meet ISO/IEC 17020 and ISO/IEC 17025' },
            { es: 'Mantenimiento, mejora y revisión por la alta dirección', en: 'Maintenance, improvement and senior management review' },
          ],
        },
      ],
      formacion: [
        {
          items: [
            { es: 'Formación y calificación de auditores internos ISO/IEC 17025', en: 'ISO/IEC 17025 internal auditor training and qualification' },
            { es: 'Incertidumbre, trazabilidad, verificación y validación de métodos', en: 'Measurement uncertainty, traceability, and method verification and validation' },
            { es: 'Ensayos de aptitud y aseguramiento de la calidad de los resultados', en: 'Proficiency testing and quality assurance of results' },
            { es: 'Metrología y análisis de la LFMN y su reglamento', en: 'Metrology and analysis of the LFMN and its regulation' },
            { es: 'Redacción de informes técnicos e interpretación de resultados', en: 'Technical report writing and interpretation of results' },
          ],
        },
      ],
    },
    benefits: [
      { es: 'Resultados más precisos, confiables y sistemáticos.', en: 'More accurate, reliable and consistent results.' },
      { es: 'Acceso a mercados que exigen informes y certificados reconocidos internacionalmente.', en: 'Access to markets that require internationally recognized reports and certificates.' },
      { es: 'Integración entre ISO 9001 e ISO/IEC 17025.', en: 'Integration between ISO 9001 and ISO/IEC 17025.' },
    ],
    frameworks: [both('NTC-ISO/IEC 17025'), both('NTC-ISO/IEC 17020'), both('GTC-ISO 19011')],
    keyword: { es: 'ISO/IEC 17025 y 17020', en: 'ISO/IEC 17025 and 17020' },
    sourcePdf: pdf('Portafolio-del-servicio-de-laboratorio-1.pdf'),
    seo: {
      title: { es: 'Laboratorios ISO/IEC 17025 y organismos ISO/IEC 17020', en: 'ISO/IEC 17025 laboratories and ISO/IEC 17020 bodies' },
      description: {
        es: 'Auditoría, consultoría y formación para laboratorios de ensayo y calibración (ISO/IEC 17025) y organismos de inspección (ISO/IEC 17020).',
        en: 'Auditing, consulting and training for testing and calibration laboratories (ISO/IEC 17025) and inspection bodies (ISO/IEC 17020).',
      },
    },
  },
]

export const findService = (slug: string) => services.find((s) => s.slug === slug)

/** Number of services a line offers in one unit. */
export const countOffers = (line: ServiceLine, mode: ModeId) =>
  line.offers[mode].reduce((n, g) => n + g.items.length, 0)

export const servicePath = (mode: ModeId, line?: string) => (line ? `/servicios/${mode}/${line}` : `/servicios/${mode}`)

/** "1 servicio", "9 servicios" / "1 service", "9 services". */
export const servicesLabel = (n: number, lang: Lang = 'es') =>
  lang === 'en' ? `${n} ${n === 1 ? 'service' : 'services'}` : `${n} ${n === 1 ? 'servicio' : 'servicios'}`

/** Every offer by its Spanish text, the key under which quote requests store it. */
const offerIndex = new Map<string, Loc>(
  services.flatMap((s) => Object.values(s.offers).flatMap((groups) => groups.flatMap((g) => g.items.map((i) => [i.es, i] as const)))),
)

/** A stored offer (Spanish text) in the visitor's language; unknown texts pass through. */
export const offerText = (es: string, lang: Lang) => offerIndex.get(es)?.[lang] ?? es
