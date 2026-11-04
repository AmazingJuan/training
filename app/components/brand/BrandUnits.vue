<script setup lang="ts">
import type { Component } from 'vue'
import { ClipboardCheck, Lightbulb, Users } from '@lucide/vue'
import { modes, type ModeId } from '~/data/services'

/**
 * The three strategic business units as a pinwheel inside the seal (same
 * 1000×1000 viewBox as BrandSeal, laid over it), after the company's own
 * process map: three twisted blades round a centre that names them. Each blade
 * links to its unit in the services explorer and shows the unit's public name
 * over its name inside the company. Text runs along the blade's twist; on the
 * lower blade it runs the other way so it reads upright.
 */
const { tr, localePath } = useLang()

interface Blade { centre: number, tone: 'claro' | 'medio' | 'hondo', icon: Component, sub: Loc, label: Loc }
const blades: Record<ModeId, Blade> = {
  formacion: {
    centre: 200, tone: 'claro', icon: Users,
    sub: { es: 'Gestión del conocimiento', en: 'Knowledge management' },
    label: { es: 'Gestión del conocimiento', en: 'Knowledge management' },
  },
  auditoria: {
    centre: 320, tone: 'medio', icon: ClipboardCheck,
    sub: { es: 'Evaluación organizacional', en: 'Organizational assessment' },
    label: { es: 'Evaluación organizacional', en: 'Organizational assessment' },
  },
  consultoria: {
    centre: 80, tone: 'hondo', icon: Lightbulb,
    // The blade already reads "Consultoría"; the line under it completes the
    // unit's internal name, "Consultoría, asesoría y nuevos negocios".
    sub: { es: 'Asesoría y nuevos negocios', en: 'Advisory and new business' },
    label: { es: 'Consultoría, asesoría y nuevos negocios', en: 'Consulting, advisory and new business' },
  },
}

const centreLines: Loc<string[]> = {
  es: ['Unidades', 'estratégicas', 'de negocio'],
  en: ['Strategic', 'business', 'units'],
}

const C = 500
// Geometry radii; the round stroke (SW) softens the corners and adds SW/2 all round.
const RI = 192
const RO = 356
const SW = 28
const GAP = 16 // visible gap between blades
const TWIST = 26 // degrees the blade turns from its inner to its outer edge
const RM = (RI + RO) / 2

const rad = (a: number) => (a * Math.PI) / 180
const xy = (a: number, r: number) => [C + r * Math.cos(rad(a)), C + r * Math.sin(rad(a))] as const
const pt = (a: number, r: number) => xy(a, r).map((v) => v.toFixed(1)).join(' ')
/** Blade centre angle at radius r: the twist. */
const at = (c: number, r: number) => c + (TWIST * (r - RI)) / (RO - RI)
/** Blade half-width in degrees at radius r, leaving a constant gap. */
const half = (r: number) => 60 - (((GAP + SW) / 2) / r) * (180 / Math.PI)

function bladePath(c: number) {
  const steps = 12
  const rs = Array.from({ length: steps + 1 }, (_, i) => RI + ((RO - RI) * i) / steps)
  const trailing = rs.map((r) => `L ${pt(at(c, r) + half(r), r)}`).join(' ')
  const leading = [...rs].reverse().map((r) => `L ${pt(at(c, r) - half(r), r)}`).join(' ')
  return [
    `M ${pt(at(c, RI) - half(RI), RI)}`,
    `A ${RI} ${RI} 0 0 1 ${pt(at(c, RI) + half(RI), RI)}`,
    trailing,
    `A ${RO} ${RO} 0 0 0 ${pt(at(c, RO) - half(RO), RO)}`,
    leading,
    'Z',
  ].join(' ')
}

/** Text baseline along the blade at radius r: clockwise above the centre, the other way below. */
function track(c: number, r: number, below: boolean) {
  const m = at(c, r)
  const s = half(r) - 2
  return below
    ? `M ${pt(m + s, r)} A ${r} ${r} 0 0 0 ${pt(m - s, r)}`
    : `M ${pt(m - s, r)} A ${r} ${r} 0 0 1 ${pt(m + s, r)}`
}

const NAME = 46
const SUB = 29
const ICON = 50

/** Keyboard and reading order follow the eye: clockwise from the upper left (WCAG 2.4.3). */
const order: ModeId[] = ['formacion', 'auditoria', 'consultoria']

const units = computed(() => order.map((id) => modes.find((m) => m.id === id)!).map((m) => {
  const b = blades[m.id]
  const below = Math.sin(rad(at(b.centre, RM))) > 0
  // Two lines centred on the blade's mid radius. Above the centre glyphs grow
  // outward from the baseline and the name is the outer line; below, they grow
  // inward and the name is the inner line, so both read name first.
  const nameR = below ? RM - 16 : RM + 10
  const subR = below ? RM + 34 : RM - 36
  // Icon at the blade's trailing end, level with the name: the shorter line
  // leaves that corner free.
  const ir = below ? RM - 18 : RM + 24
  const ia = at(b.centre, ir) + (below ? -1 : 1) * (half(ir) - 9)
  const [ix, iy] = xy(ia, ir)
  const out = at(b.centre, RM)
  return {
    id: m.id,
    tone: b.tone,
    icon: b.icon,
    name: tr(m.name),
    sub: tr(b.sub),
    label: `${tr(m.name)}: ${tr(b.label)}`,
    href: localePath(`/servicios/${m.id}`),
    d: bladePath(b.centre),
    nameTrack: track(b.centre, nameR, below),
    subTrack: track(b.centre, subR, below),
    ix: ix - ICON / 2,
    iy: iy - ICON / 2,
    // Hover nudges the blade outward along its middle.
    dx: (Math.cos(rad(out)) * 10).toFixed(1),
    dy: (Math.sin(rad(out)) * 10).toFixed(1),
  }
}))
</script>

<template>
  <svg class="units" viewBox="0 0 1000 1000">
    <defs>
      <template v-for="u in units" :key="u.id">
        <path :id="`unit-name-${u.id}`" :d="u.nameTrack" />
        <path :id="`unit-sub-${u.id}`" :d="u.subTrack" />
      </template>
    </defs>

    <g class="units__core" aria-hidden="true">
      <circle class="units__halo" :cx="C" :cy="C" :r="RI - SW / 2 - 14" />
      <circle class="units__disc" :cx="C" :cy="C" :r="RI - SW / 2 - 34" />
      <text class="units__centre" :x="C" :y="C - 44">
        <tspan v-for="(line, i) in tr(centreLines)" :key="line" :x="C" :dy="i ? 46 : 0">{{ line }}</tspan>
      </text>
    </g>

    <a
      v-for="u in units"
      :key="u.id"
      :href="u.href"
      class="units__seg"
      :class="`units__seg--${u.tone}`"
      :style="{ '--dx': `${u.dx}px`, '--dy': `${u.dy}px` }"
      :aria-label="u.label"
      @click.prevent="navigateTo(u.href)"
    >
      <g class="units__blade">
        <path class="units__shape" :d="u.d" />
        <text class="units__name" aria-hidden="true">
          <textPath :href="`#unit-name-${u.id}`" startOffset="50%">{{ u.name }}</textPath>
        </text>
        <text class="units__sub" aria-hidden="true">
          <textPath :href="`#unit-sub-${u.id}`" startOffset="50%">{{ u.sub }}</textPath>
        </text>
        <component :is="u.icon" class="units__icon" :x="u.ix" :y="u.iy" :width="ICON" :height="ICON" :stroke-width="2" aria-hidden="true" />
      </g>
    </a>
  </svg>
</template>

<style scoped>
.units {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  pointer-events: none;
}

.units__halo {
  fill: var(--color-nube);
}

.units__disc {
  fill: var(--color-blanco);
}

.units__centre {
  font-family: var(--font-display);
  font-size: 38px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-anchor: middle;
  fill: var(--color-tinta);
}

.units__seg {
  --tone: var(--color-azul);
  --ink: var(--color-blanco);
  --tone-hover: var(--color-azul-hondo);
  pointer-events: auto;
  cursor: pointer;
  outline: none;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Light to deep, as in the company's map. White text needs 4.5:1, so the
   light blade carries ink-coloured text instead. */
.units__seg--claro {
  --tone: var(--color-cielo);
  --ink: var(--color-tinta);
  --tone-hover: #5cc0ee;
}

.units__seg--hondo {
  --tone: var(--color-azul-hondo);
  --tone-hover: #004a73;
}

.units__shape {
  fill: var(--tone);
  stroke: var(--tone);
  stroke-width: 28;
  stroke-linejoin: round;
  transition: fill 0.2s, stroke 0.2s;
}

.units__name,
.units__sub {
  fill: var(--ink);
  text-anchor: middle;
}

.units__name {
  font-family: var(--font-display);
  font-size: 46px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.units__sub {
  font-family: var(--font-sans);
  font-size: 29px;
  font-weight: 600;
}

.units__icon {
  color: var(--ink);
}

.units__seg:hover,
.units__seg:focus-visible {
  transform: translate(var(--dx), var(--dy));
}

.units__seg:hover .units__shape,
.units__seg:focus-visible .units__shape {
  fill: var(--tone-hover);
  stroke: var(--tone-hover);
}

.units__seg:focus-visible .units__shape {
  outline: none;
  stroke: var(--color-tinta);
  stroke-width: 34;
}

@media (prefers-reduced-motion: reduce) {
  .units__seg { transition: none; }
  .units__seg:hover,
  .units__seg:focus-visible { transform: none; }
}
</style>
