import { findMode, servicePath } from './services'
import type { ModeId } from './services'

export interface NavItem {
  label: Loc
  to: string
  /** One line shown in the desktop dropdown. */
  hint?: Loc
  children?: NavItem[]
  /** A business unit: its dropdown lists the unit's service lines (and, for training, the diploma programs). */
  mode?: ModeId
  /** Other paths that belong to this item, for the active state. */
  match?: string[]
  /** Shown apart from the rest (a different audience). */
  apart?: boolean
}

const unit = (id: ModeId, to: string, match: string[] = []): NavItem => ({
  label: findMode(id)!.name,
  to,
  hint: findMode(id)!.summary,
  mode: id,
  match: [servicePath(id), ...match],
})

/**
 * Primary navigation: the three business units first (what visitors come for),
 * then clients, company, news and the suppliers' documents. Training and the
 * diploma programs are one item: /cursos-y-formaciones holds both.
 */
export const primaryNav: NavItem[] = [
  // Who we are, then what we do (the three units), the proof, the news;
  // last, set apart, the page for a different audience: our suppliers.
  {
    label: { es: 'Nosotros', en: 'About us' },
    to: '/empresa',
    children: [
      { label: { es: 'Nuestra empresa', en: 'Our company' }, to: '/empresa', hint: { es: 'Propósito, presencia, valores y principios', en: 'Purpose, presence, values and principles' } },
      { label: { es: 'Nuestro equipo', en: 'Our team' }, to: '/empresa/equipo', hint: { es: 'Los profesionales responsables de cada servicio', en: 'The professionals responsible for each service' } },
      { label: { es: 'Sistema de Gestión Integrado', en: 'Integrated Management System' }, to: '/empresa/sistema-de-gestion-integrado', hint: { es: 'Certificados, licencia de SST y boletines', en: 'Certificates, OHS license and bulletins' } },
    ],
  },
  unit('auditoria', servicePath('auditoria')),
  unit('consultoria', servicePath('consultoria')),
  unit('formacion', '/cursos-y-formaciones'),
  { label: { es: 'Clientes', en: 'Clients' }, to: '/clientes' },
  { label: { es: 'Actualidad', en: 'News' }, to: '/actualidad' },
  { label: { es: 'Contratistas y proveedores', en: 'Contractors and suppliers' }, to: '/contratistas', apart: true },
]

export const contactNav: NavItem = { label: { es: 'Contacto', en: 'Contact' }, to: '/contacto' }

/** Staff entry point (Licitdata, cotizador, presupuestos, SharePoint). */
export const intranetNav: NavItem = { label: { es: 'Intranet', en: 'Intranet' }, to: '/intranet' }

/** Suppliers and contractors: invoice template and manual. Reached from the header, not only the footer. */
export const contractorsNav: NavItem = {
  label: { es: 'Contratistas y proveedores', en: 'Contractors and suppliers' },
  to: '/contratistas',
  hint: { es: 'Formato de cuenta de cobro y manual de proveedores', en: 'Invoice template and suppliers manual' },
}

export const accessibilityNav: NavItem = { label: { es: 'Declaración de accesibilidad', en: 'Accessibility statement' }, to: '/accesibilidad' }

export const secondaryNav: NavItem[] = [
  contractorsNav,
  { label: { es: 'Sistema de Gestión Integrado', en: 'Integrated Management System' }, to: '/empresa/sistema-de-gestion-integrado' },
  accessibilityNav,
  intranetNav,
]
