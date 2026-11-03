import type { Component } from 'vue'
import { Calculator, ClipboardList, FileSearch, FolderOpen } from '@lucide/vue'
import { company } from './company'

export type IntranetModuleId = 'licitdata' | 'cotizador' | 'presupuestos' | 'sharepoint'

export interface IntranetModule {
  id: IntranetModuleId
  name: Loc
  /** What the team does there, in one sentence. */
  summary: Loc
  icon: Component
  /** Fixed address; the others come from runtime config (see nuxt.config.ts). */
  href?: string
}

/** The staff tools, in the order the team reaches for them. */
export const intranetModules: IntranetModule[] = [
  {
    id: 'licitdata',
    name: { es: 'Licitdata', en: 'Licitdata' },
    summary: { es: 'Búsqueda y seguimiento de licitaciones públicas y privadas para la presentación oportuna de propuestas.', en: 'Search and tracking of public and private tenders for the timely submission of proposals.' },
    icon: FileSearch,
  },
  {
    id: 'cotizador',
    name: { es: 'Cotizador', en: 'Quotation tool' },
    summary: { es: 'Revisión de las solicitudes de cotización de los clientes y envío de las propuestas.', en: 'Review of client quotation requests and submission of proposals.' },
    icon: ClipboardList,
  },
  {
    id: 'presupuestos',
    name: { es: 'Presupuestos', en: 'Budgets' },
    summary: { es: 'Elaboración y aprobación del presupuesto de cada servicio antes de su cotización.', en: 'Preparation and approval of each service’s budget before it is quoted.' },
    icon: Calculator,
  },
  {
    id: 'sharepoint',
    name: { es: 'SharePoint', en: 'SharePoint' },
    summary: { es: 'Documentos, formatos y sitios de trabajo del Sistema de Gestión Integrado.', en: 'Documents, forms and workspaces of the Integrated Management System.' },
    icon: FolderOpen,
    href: company.intranet,
  },
]
