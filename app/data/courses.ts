/**
 * Training programmes. Source: brochures linked from the home page and
 * /cursos-y-formaciones/ (2025 editions). Dates and prices belong to that
 * edition; the site shows them as the last published cohort, never as upcoming.
 * Texts are bilingual (`Loc`); the programmes themselves are taught in Spanish.
 */

export interface Course {
  slug: string
  name: Loc
  summary: Loc
  /** Credentials awarded. */
  awards: Loc[]
  hours: number
  sessions: number
  mode: Loc
  schedule: Loc
  lastCohort: Loc
  audience: Loc[]
  modules: { title: Loc, goal: Loc }[]
  /** Standard supplied to participants. */
  material: Loc
  brochure: string
  line?: string
}

const uploads = '/wp-content/uploads'

const live = { es: 'Virtual, en directo (en español)', en: 'Online, live (taught in Spanish)' }

export const courses: Course[] = [
  {
    slug: 'diplomado-gestion-de-activos',
    name: { es: 'Diplomado en gestión de activos', en: 'Diploma program in asset management' },
    summary: {
      es: 'Conocimientos, prácticas y herramientas metodológicas para implementar un sistema de gestión de activos en empresas intensivas en activos, con una segunda titulación opcional como auditor según ISO 55001.',
      en: 'Knowledge, practices and methodological tools for implementing an asset management system in asset-intensive organizations, with an optional second qualification as an ISO 55001 auditor.',
    },
    awards: [
      { es: 'Diplomado en gestión de activos', en: 'Diploma in asset management' },
      { es: 'Auditor líder ISO 55001:2024 (opcional)', en: 'ISO 55001:2024 lead auditor (optional)' },
    ],
    hours: 120,
    sessions: 30,
    mode: live,
    schedule: {
      es: 'Martes, miércoles y jueves de 6:00 p. m. a 10:00 p. m. y sábados de 8:00 a. m. a 12:00 m. (hora de Colombia)',
      en: 'Tuesdays, Wednesdays and Thursdays, 6:00 p.m. to 10:00 p.m., and Saturdays, 8:00 a.m. to 12:00 noon (Colombia time)',
    },
    lastCohort: { es: 'Cohorte 3, de abril a mayo de 2025', en: 'Cohort 3, April to May 2025' },
    audience: [
      { es: 'Gerentes, directores y coordinadores de gestión de activos', en: 'Asset management managers, directors and coordinators' },
      { es: 'Profesionales, tecnólogos y técnicos de áreas con uso intensivo de activos', en: 'Professionals, technologists and technicians in asset-intensive areas' },
      { es: 'Coordinadores de sistemas de gestión, líderes de proceso y auditores', en: 'Management system coordinators, process leaders and auditors' },
    ],
    modules: [
      { title: { es: 'Formulación del proyecto de implantación', en: 'Formulating the implementation project' }, goal: { es: 'Planificar la implantación de un sistema de gestión de activos.', en: 'Plan the implementation of an asset management system.' } },
      { title: { es: 'Fundamentos de ISO 55001', en: 'ISO 55001 foundations' }, goal: { es: 'Comprender los conceptos y los requisitos generales de la norma.', en: 'Understand the standard’s concepts and general requirements.' } },
      { title: { es: 'Planeación estratégica', en: 'Strategic planning' }, goal: { es: 'Elaborar el plan estratégico de gestión de activos (PEGA–SAMP).', en: 'Develop the strategic asset management plan (SAMP).' } },
      { title: { es: 'Planeación táctica y operativa', en: 'Tactical and operational planning' }, goal: { es: 'Desplegar los objetivos estratégicos en los niveles táctico y operativo.', en: 'Cascade strategic objectives to the tactical and operational levels.' } },
      { title: { es: 'Requisitos de la información', en: 'Information requirements' }, goal: { es: 'Asegurar la disponibilidad y la calidad de la información de los activos.', en: 'Ensure the availability and quality of asset information.' } },
      { title: { es: 'Auditoría a sistemas de gestión de activos', en: 'Auditing asset management systems' }, goal: { es: 'Auditar según ISO 19011 e ISO/IEC 17021 y comprender la certificación de tercera parte.', en: 'Audit in accordance with ISO 19011 and ISO/IEC 17021, and understand third-party certification.' } },
    ],
    material: { es: 'Norma ISO 55001:2024 original', en: 'Original copy of ISO 55001:2024' },
    brochure: `${uploads}/2025/03/Brochure_Diplomado_Gesti%C3%B3n_de_Activos_2025.pdf`,
    line: 'gestion-de-activos',
  },
  {
    slug: 'diplomado-sostenibilidad',
    name: { es: 'Diplomado en sostenibilidad', en: 'Diploma program in sustainability' },
    summary: {
      es: 'Herramientas para implementar estrategias de sostenibilidad en las organizaciones: gestión ambiental, responsabilidad social, gobernanza y medición de la huella de carbono, con la competencia de auditor interno.',
      en: 'Tools for implementing sustainability strategies in organizations: environmental management, social responsibility, governance and carbon footprint measurement, with internal auditor competence.',
    },
    awards: [
      { es: 'Diplomado en sostenibilidad', en: 'Diploma in sustainability' },
      { es: 'Auditor interno en huella de carbono', en: 'Carbon footprint internal auditor' },
    ],
    hours: 94,
    sessions: 24,
    mode: live,
    schedule: {
      es: 'Martes, miércoles y jueves de 6:00 p. m. a 10:00 p. m. (hora de Colombia)',
      en: 'Tuesdays, Wednesdays and Thursdays, 6:00 p.m. to 10:00 p.m. (Colombia time)',
    },
    lastCohort: { es: 'Cohorte 1, de junio a julio de 2025', en: 'Cohort 1, June to July 2025' },
    audience: [
      { es: 'Gerentes, directores y coordinadores de sostenibilidad', en: 'Sustainability managers, directors and coordinators' },
      { es: 'Consultores, emprendedores y líderes de proyectos sostenibles', en: 'Consultants, entrepreneurs and sustainable project leaders' },
      { es: 'Coordinadores de sistemas de gestión, líderes de proceso y auditores', en: 'Management system coordinators, process leaders and auditors' },
    ],
    modules: [
      { title: { es: 'Fundamentos de sostenibilidad', en: 'Sustainability foundations' }, goal: { es: 'Comprender sus principios, su evolución y su impacto actual.', en: 'Understand its principles, its development and its current impact.' } },
      { title: { es: 'Gestión ambiental y riesgos', en: 'Environmental management and risk' }, goal: { es: 'Identificar y gestionar los riesgos ambientales.', en: 'Identify and manage environmental risks.' } },
      { title: { es: 'Responsabilidad social y gobernanza', en: 'Social responsibility and governance' }, goal: { es: 'Implementar prácticas éticas en la organización.', en: 'Implement ethical practices within the organization.' } },
      { title: { es: 'Integración de la sostenibilidad', en: 'Integrating sustainability' }, goal: { es: 'Incorporarla en la cultura organizacional y en el modelo de negocio.', en: 'Embed it in the organizational culture and business model.' } },
      { title: { es: 'Huella de carbono: cuantificación de GEI', en: 'Carbon footprint: GHG quantification' }, goal: { es: 'Aplicar metodologías de cuantificación de emisiones.', en: 'Apply emissions quantification methodologies.' } },
      { title: { es: 'Auditoría interna de huella de carbono', en: 'Carbon footprint internal audit' }, goal: { es: 'Planificar y ejecutar auditorías según ISO 14064 y GTC 19011.', en: 'Plan and conduct audits in accordance with ISO 14064 and GTC 19011.' } },
    ],
    material: { es: 'Norma ISO 14064-1 original', en: 'Original copy of ISO 14064-1' },
    brochure: `${uploads}/2025/05/Brochure-Diplomado-de-sostenibilidad-2025.pdf`,
    line: 'hseq',
  },
]
