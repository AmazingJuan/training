<script setup lang="ts">
import { Accessibility, X } from '@lucide/vue'

/**
 * Accessibility panel: a disclosure button that opens a small dialog of
 * display preferences. Every control is a native element (button with
 * aria-pressed, radio group), so keyboard and screen readers work without any
 * custom key handling; Escape and clicking outside close it and return focus.
 */
defineProps<{ compact?: boolean }>()

const { tr } = useLang()
const { prefs, changed, reset } = useA11y()
const open = ref(false)
const root = useTemplateRef<HTMLElement>('root')
const button = useTemplateRef<HTMLButtonElement>('button')
const panel = useTemplateRef<HTMLElement>('panel')
const id = useId()

const copy = {
  button: { es: 'Accesibilidad', en: 'Accessibility' },
  title: { es: 'Opciones de accesibilidad', en: 'Accessibility options' },
  intro: { es: 'Ajuste la presentación del sitio. Sus preferencias se guardan en este navegador.', en: 'Adjust how the site is displayed. Your preferences are saved in this browser.' },
  text: { es: 'Tamaño del texto', en: 'Text size' },
  contrast: { es: 'Alto contraste', en: 'High contrast' },
  underline: { es: 'Subrayar los enlaces', en: 'Underline links' },
  spacing: { es: 'Aumentar el espaciado del texto', en: 'Increase text spacing' },
  still: { es: 'Detener animaciones', en: 'Stop animations' },
  reset: { es: 'Restablecer', en: 'Reset' },
  statement: { es: 'Declaración de accesibilidad', en: 'Accessibility statement' },
  close: { es: 'Cerrar', en: 'Close' },
} satisfies Record<string, Loc>

const toggles = [
  { key: 'contrast', label: copy.contrast },
  { key: 'underline', label: copy.underline },
  { key: 'spacing', label: copy.spacing },
  { key: 'still', label: copy.still },
] as const

function close(returnFocus = true) {
  if (!open.value) return
  open.value = false
  if (returnFocus) button.value?.focus()
}

watch(open, async (v) => {
  if (!v) return
  await nextTick()
  panel.value?.querySelector<HTMLElement>('input, button')?.focus()
})

onClickOutside(root, () => close(false))
onKeyStroke('Escape', () => close())
const route = useRoute()
watch(() => route.fullPath, () => close(false))
</script>

<template>
  <div ref="root" class="a11y">
    <button
      ref="button"
      type="button"
      class="a11y__button"
      :class="{ 'a11y__button--compact': compact, 'is-changed': changed }"
      :aria-expanded="open"
      :aria-controls="id"
      :aria-label="compact ? tr(copy.button) : undefined"
      @click="open = !open"
    >
      <Accessibility aria-hidden="true" />
      <span v-if="!compact">{{ tr(copy.button) }}</span>
    </button>

    <div v-show="open" :id="id" ref="panel" class="a11y__panel" role="dialog" :aria-label="tr(copy.title)" data-lenis-prevent>
      <div class="a11y__head">
        <p class="a11y__title">{{ tr(copy.title) }}</p>
        <button type="button" class="a11y__close" @click="close()">
          <X aria-hidden="true" /><span class="visually-hidden">{{ tr(copy.close) }}</span>
        </button>
      </div>
      <p class="a11y__intro">{{ tr(copy.intro) }}</p>

      <fieldset class="a11y__sizes">
        <legend>{{ tr(copy.text) }}</legend>
        <div class="a11y__scale">
          <label v-for="(s, i) in textScales" :key="s" class="a11y__size">
            <input v-model="prefs.text" type="radio" :name="`${id}-size`" :value="i">
            <span :style="{ fontSize: `${0.8 + i * 0.16}rem` }">{{ s }} %</span>
          </label>
        </div>
      </fieldset>

      <ul class="a11y__toggles">
        <li v-for="t in toggles" :key="t.key">
          <button type="button" class="switch" :aria-pressed="prefs[t.key]" @click="prefs[t.key] = !prefs[t.key]">
            <span class="switch__label">{{ tr(t.label) }}</span>
            <span class="switch__track" aria-hidden="true"><span class="switch__thumb" /></span>
          </button>
        </li>
      </ul>

      <div class="a11y__foot">
        <button type="button" class="a11y__reset" :disabled="!changed" @click="reset">{{ tr(copy.reset) }}</button>
        <NuxtLinkLocale to="/accesibilidad" class="link">{{ tr(copy.statement) }}</NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<style scoped>
.a11y {
  position: relative;
}

.a11y__button {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.625rem;
  border-radius: var(--radius-control);
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-tinta);
  cursor: pointer;
}

.a11y__button svg {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-azul);
}

.a11y__button--compact {
  min-width: 2.75rem;
  justify-content: center;
}

.a11y__button:hover,
.a11y__button[aria-expanded='true'] {
  background: var(--color-nube);
}

/* A small dot tells returning visitors their own settings are on. */
.a11y__button.is-changed svg {
  border-radius: var(--radius-full);
  box-shadow: 0 0 0 2px var(--color-blanco), 0 0 0 4px var(--color-azul);
}

.a11y__panel {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 60;
  width: min(22rem, calc(100vw - 2rem));
  max-height: calc(100dvh - 6rem);
  overflow-y: auto;
  padding: 1.25rem;
  background: var(--color-blanco);
  color: var(--color-tinta);
  border: 1px solid var(--color-linea);
  border-radius: 10px;
  box-shadow: 0 24px 48px -24px rgb(11 44 71 / 0.35);
}

/* Below the desktop header the panel spans the screen under the bar, so it can
   never open off-screen whatever the button's position or the text size. */
@media (width < 84rem) {
  .a11y__panel {
    position: fixed;
    top: calc(var(--header-offset) + 0.25rem);
    left: 1rem;
    right: 1rem;
    width: auto;
    max-height: calc(100dvh - var(--header-offset) - 1rem);
  }
}

.a11y__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.a11y__title {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 700;
}

.a11y__close {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin: -0.5rem -0.5rem -0.5rem 0;
  border-radius: var(--radius-control);
  color: var(--color-pizarra);
  cursor: pointer;
}

.a11y__close:hover {
  background: var(--color-nube);
  color: var(--color-tinta);
}

.a11y__close svg {
  width: 1.25rem;
  height: 1.25rem;
}

.a11y__intro {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--color-pizarra);
}

.a11y__sizes {
  margin-top: 1.25rem;
  border: 0;
  padding: 0;
}

.a11y__sizes legend {
  font-weight: 700;
  font-size: 0.9375rem;
}

.a11y__scale {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 0.5rem;
  border: 1px solid var(--color-linea);
  border-radius: var(--radius-control);
  overflow: hidden;
}

.a11y__size {
  position: relative;
}

.a11y__size + .a11y__size {
  border-left: 1px solid var(--color-linea);
}

.a11y__size input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.a11y__size span {
  display: grid;
  place-items: center;
  min-height: 2.75rem;
  font-weight: 700;
  line-height: 1;
}

.a11y__size input:checked + span {
  background: var(--color-azul);
  color: var(--color-blanco);
}

.a11y__size input:focus-visible + span {
  outline: var(--focus-ring);
  outline-offset: -3px;
}

.a11y__toggles {
  margin-top: 1rem;
  border-top: 1px solid var(--color-linea);
}

.switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  min-height: 3rem;
  padding-block: 0.375rem;
  border-bottom: 1px solid var(--color-linea);
  text-align: left;
  font-size: 0.9375rem;
  color: var(--color-tinta);
  cursor: pointer;
}

.switch__track {
  flex: none;
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  border-radius: var(--radius-full);
  background: var(--color-pizarra);
  transition: background-color var(--duration-fast) var(--ease-out);
}

.switch__thumb {
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: var(--radius-full);
  background: var(--color-blanco);
  transition: transform var(--duration-fast) var(--ease-out);
}

.switch[aria-pressed='true'] .switch__track {
  background: var(--color-azul);
}

.switch[aria-pressed='true'] .switch__thumb {
  transform: translateX(1rem);
}

.a11y__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.a11y__reset {
  min-height: 2.75rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-azul);
  border-radius: var(--radius-control);
  font-weight: 700;
  color: var(--color-azul);
  cursor: pointer;
}

.a11y__reset:disabled {
  border-color: var(--color-linea);
  color: var(--color-pizarra);
  cursor: default;
}
</style>
