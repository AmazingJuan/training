<script setup lang="ts">
import { ChevronDown, LockKeyhole, Menu, MessagesSquare, X, Phone } from '@lucide/vue'
import { primaryNav, contactNav, intranetNav, pqrsNav } from '~/data/navigation'
import { services, countOffers, servicePath } from '~/data/services'
import type { NavItem } from '~/data/navigation'
import { courses } from '~/data/courses'
import type { Course } from '~/data/courses'
import { company } from '~/data/company'

const route = useRoute()
const { tr, lang, localePath } = useLang()
const copy = {
  home: { es: 'Training Corporation, inicio', en: 'Training Corporation, home' },
  main: { es: 'Principal', en: 'Main' },
  mainMobile: { es: 'Principal (móvil)', en: 'Main (mobile)' },
  utility: { es: 'Utilidades', en: 'Utilities' },
  diplomas: { es: 'Diplomados', en: 'Diploma programs' },
  coursesByLine: { es: 'Cursos por línea de servicio', en: 'Courses by service line' },
  byLine: { es: 'Por línea de servicio', en: 'By service line' },
  quote: { es: 'Solicitar cotización', en: 'Request a quotation' },
  open: { es: 'Abrir menú', en: 'Open menu' },
  close: { es: 'Cerrar menú', en: 'Close menu' },
  call: { es: 'Llamar al', en: 'Call' },
  newTab: { es: '(se abre en una pestaña nueva)', en: '(opens in a new tab)' },
} satisfies Record<string, Loc>
// Lenis loads after the page (motion.client.ts): read it when needed.
const nuxtApp = useNuxtApp()

const sheetOpen = ref(false)
const openMenu = ref<string | null>(null)
const toggle = useTemplateRef<HTMLButtonElement>('toggle')
const nav = useTemplateRef<HTMLElement>('nav')

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 8)

const isActive = (item: NavItem | string) => {
  const paths = typeof item === 'string' ? [item] : [item.to, ...(item.match ?? [])]
  return paths.some((to) => {
    const path = localePath(to)
    return route.path === path || route.path.startsWith(`${path}/`)
  })
}
const hasMenu = (item: NavItem) => !!(item.mode || item.children)
const menuId = (item: NavItem) => `menu-${item.to.slice(1).replace(/\//g, '-')}`
const allOf = (item: NavItem) => {
  if (item.mode === 'formacion') return tr({ es: 'Ver diplomados y cursos', en: 'View diploma programs and courses' })
  const name = tr(item.label).toLowerCase()
  return lang.value === 'en' ? `View all ${name} services` : `Ver toda la oferta de ${name}`
}
const courseHint = (c: Course) => (lang.value === 'en' ? `${c.hours} hours, live online` : `${c.hours} horas, virtual en directo`)

watch(() => route.fullPath, () => {
  sheetOpen.value = false
  openMenu.value = null
})

// Freeze the page (and Lenis) while the mobile sheet is open.
const locked = useScrollLock(import.meta.client ? document.documentElement : null)
watch(sheetOpen, (open) => {
  locked.value = open
  if (open) nuxtApp.$lenis?.stop()
  else nuxtApp.$lenis?.start()
})

onClickOutside(nav, () => { openMenu.value = null })

// The utility strip scrolls away with the page; only the main bar stays
// stuck (the header sticks at minus the strip's height). Sticky bars below the
// header (service tabs, sector index…) sit at --header-offset, which is
// therefore the main bar's height, not the whole header's.
const header = useTemplateRef<HTMLElement>('header')
const utility = useTemplateRef<HTMLElement>('utility')
function measure() {
  const total = header.value?.offsetHeight ?? 0
  const strip = utility.value?.offsetHeight ?? 0
  if (!total) return
  const root = document.documentElement.style
  root.setProperty('--utility-h', `${strip}px`)
  root.setProperty('--header-offset', `${total - strip}px`)
}
useResizeObserver(header, measure)
useResizeObserver(utility, measure)

// Open on hover for mouse users, with a short delay so passing over the bar
// doesn't flash menus; touch and keyboard keep using click / Enter.
let hoverTimer: ReturnType<typeof setTimeout> | undefined
function hoverOpen(to: string, e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  clearTimeout(hoverTimer)
  hoverTimer = setTimeout(() => { openMenu.value = to }, openMenu.value ? 0 : 120)
}
function hoverClose(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  clearTimeout(hoverTimer)
  hoverTimer = setTimeout(() => { openMenu.value = null }, 220)
}

onKeyStroke('Escape', () => {
  if (sheetOpen.value) {
    sheetOpen.value = false
    toggle.value?.focus()
  }
  openMenu.value = null
})
</script>

<template>
  <header ref="header" class="header" :class="{ 'header--scrolled': scrolled }">
    <div ref="utility" class="header__utility">
      <div class="frame header__utility-row" role="group" :aria-label="tr(copy.utility)">
        <a :href="company.phones[0].href" class="header__phone">
          <Phone aria-hidden="true" />
          <span><span class="visually-hidden">{{ tr(copy.call) }} </span>{{ company.phones[0].display }}</span>
        </a>
        <SocialLinks class="header__social" />
        <NuxtLinkLocale :to="pqrsNav.to" class="header__intranet header__pqrs">
          <MessagesSquare aria-hidden="true" />
          PQRS
        </NuxtLinkLocale>
        <NuxtLinkLocale :to="intranetNav.to" class="header__intranet" target="_blank">
          <LockKeyhole aria-hidden="true" />
          {{ tr(intranetNav.label) }}<span class="visually-hidden"> {{ tr(copy.newTab) }}</span>
        </NuxtLinkLocale>
        <A11yMenu />
        <LangSwitch />
      </div>
    </div>
    <div class="frame header__bar">
      <NuxtLinkLocale to="/" class="header__brand" :aria-label="tr(copy.home)">
        <BrandLogo />
      </NuxtLinkLocale>

      <nav ref="nav" class="header__nav" :aria-label="tr(copy.main)">
        <ul class="header__list">
          <li
            v-for="item in primaryNav"
            :key="item.to"
            class="header__item"
            :class="{ 'header__item--apart': item.apart }"
            @pointerenter="hasMenu(item) && hoverOpen(item.to, $event)"
            @pointerleave="hasMenu(item) && hoverClose($event)"
          >
            <template v-if="hasMenu(item)">
              <button
                type="button"
                class="header__link"
                :class="{ 'is-active': isActive(item) }"
                :aria-expanded="openMenu === item.to"
                :aria-controls="menuId(item)"
                @click="openMenu = openMenu === item.to ? null : item.to"
              >
                {{ tr(item.label) }}
                <ChevronDown class="header__chev" aria-hidden="true" />
              </button>

              <!-- A business unit: its summary, its service lines and, for training, the diploma programs. -->
              <div v-if="item.mode" v-show="openMenu === item.to" :id="menuId(item)" class="drop drop--unit" :class="{ 'drop--wide': item.mode === 'formacion' }">
                <p v-if="item.hint" class="drop__intro">{{ tr(item.hint) }}</p>
                <div class="unit">
                  <section v-if="item.mode === 'formacion'" class="unit__col" :aria-labelledby="`${menuId(item)}-dip`">
                    <p :id="`${menuId(item)}-dip`" class="unit__group">{{ tr(copy.diplomas) }}</p>
                    <ul class="unit__list">
                      <li v-for="c in courses" :key="c.slug">
                        <NuxtLinkLocale :to="`/cursos-y-formaciones#${c.slug}`" class="drop__link" @click="openMenu = null">
                          <span class="drop__label">{{ tr(c.name) }}</span>
                          <span class="drop__hint">{{ courseHint(c) }}</span>
                        </NuxtLinkLocale>
                      </li>
                    </ul>
                  </section>
                  <section class="unit__col" :aria-labelledby="`${menuId(item)}-lines`">
                    <p :id="`${menuId(item)}-lines`" class="unit__group">{{ item.mode === 'formacion' ? tr(copy.coursesByLine) : tr(copy.byLine) }}</p>
                    <ul class="unit__list">
                      <li v-for="l in services" :key="l.slug">
                        <NuxtLinkLocale :to="servicePath(item.mode, l.slug)" class="mega__line" @click="openMenu = null">
                          <span>{{ tr(l.name) }}</span>
                          <span class="mega__n">{{ countOffers(l, item.mode) }}</span>
                        </NuxtLinkLocale>
                      </li>
                    </ul>
                  </section>
                </div>
                <NuxtLinkLocale :to="item.to" class="drop__all link" @click="openMenu = null">{{ allOf(item) }}</NuxtLinkLocale>
              </div>

              <div v-else v-show="openMenu === item.to" :id="menuId(item)" class="drop">
                <ul class="drop__list">
                  <li v-for="child in item.children" :key="child.to">
                    <NuxtLinkLocale :to="child.to" class="drop__link" @click="openMenu = null">
                      <span class="drop__label">{{ tr(child.label) }}</span>
                      <span v-if="child.hint" class="drop__hint">{{ tr(child.hint) }}</span>
                    </NuxtLinkLocale>
                  </li>
                </ul>
              </div>
            </template>
            <NuxtLinkLocale v-else :to="item.to" class="header__link" :class="{ 'is-active': isActive(item) }">
              {{ tr(item.label) }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </nav>

      <UiButton :to="contactNav.to" class="header__cta">{{ tr(copy.quote) }}</UiButton>

      <div class="header__compact">
        <LangSwitch compact />
        <A11yMenu compact />
      </div>

      <button
        ref="toggle"
        type="button"
        class="header__toggle"
        :aria-expanded="sheetOpen"
        aria-controls="menu-movil"
        :aria-label="sheetOpen ? tr(copy.close) : tr(copy.open)"
        @click="sheetOpen = !sheetOpen"
      >
        <X v-if="sheetOpen" aria-hidden="true" />
        <Menu v-else aria-hidden="true" />
      </button>
    </div>

    <Transition name="sheet">
      <div v-show="sheetOpen" id="menu-movil" class="sheet field-azul" data-lenis-prevent>
        <nav class="frame" :aria-label="tr(copy.mainMobile)">
          <ul class="sheet__list">
            <li v-for="item in [...primaryNav, contactNav, pqrsNav, intranetNav]" :key="item.to" class="sheet__item">
              <NuxtLinkLocale v-if="item === intranetNav" :to="item.to" class="sheet__link" target="_blank">
                {{ tr(item.label) }}<span class="visually-hidden"> {{ tr(copy.newTab) }}</span>
              </NuxtLinkLocale>
              <NuxtLinkLocale v-else :to="item.to" class="sheet__link">{{ tr(item.label) }}</NuxtLinkLocale>
              <ul v-if="item.children" class="sheet__sub">
                <li v-for="child in item.children" :key="child.to">
                  <NuxtLinkLocale :to="child.to" class="sheet__sublink">{{ tr(child.label) }}</NuxtLinkLocale>
                </li>
              </ul>
            </li>
          </ul>
          <div class="sheet__contact">
            <a v-for="p in company.phones" :key="p.href" :href="p.href">{{ p.display }}</a>
            <a :href="`mailto:${company.email}`">{{ company.email }}</a>
          </div>
          <SocialLinks class="sheet__social" />
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  /* The utility strip scrolls off; the main bar stays at the top. */
  top: calc(-1 * var(--utility-h, 0px));
  z-index: 40;
  background: var(--color-blanco);
  transition: box-shadow var(--duration-base) var(--ease-out);
}

.header--scrolled {
  box-shadow: 0 1px 0 var(--color-linea);
}

.header__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 1rem;
  min-height: var(--header-h);
}

.header__brand {
  margin-right: auto;
  padding-block: 0.5rem;
}

/* Utility strip (desktop): phone, staff intranet, accessibility, language. */
.header__utility {
  display: none;
  border-bottom: 1px solid var(--color-linea);
  background: var(--color-nube);
}

.header__utility-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  min-height: 2.75rem;
}

.header__utility .header__social {
  margin-right: auto;
  padding-left: 0.75rem;
  margin-left: 0.5rem;
  border-left: 1px solid var(--color-linea);
}

.header__utility :deep(.a11y__button),
.header__utility :deep(.lang),
.header__utility .header__intranet,
.header__utility .header__phone {
  min-height: 2.5rem;
}

.header__utility :deep(.a11y__button:hover),
.header__utility :deep(.lang:hover),
.header__utility .header__intranet:hover {
  background: var(--color-blanco);
}

.sheet__social {
  margin-top: 1rem;
}

.sheet__social :deep(.social__link) {
  color: var(--color-blanco);
}

.sheet__social :deep(.social__link:hover) {
  background: rgb(255 255 255 / 0.15);
  color: var(--color-blanco);
}

.header__compact {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  /* With large text on a narrow phone the bar wraps instead of scrolling sideways (WCAG 1.4.10). */
  margin-left: auto;
}

.header__nav,
.header__cta {
  display: none;
}

.header__cta {
  flex: none;
  white-space: nowrap;
}

.header__brand {
  flex: none;
}

/* Staff link: quieter than the main navigation, marked as restricted. */
.header__intranet {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-control);
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-pizarra);
  text-decoration: none;
  white-space: nowrap;
  transition: background-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
}

.header__intranet svg {
  width: 1rem;
  height: 1rem;
}

.header__intranet:hover {
  background: var(--color-nube);
  color: var(--color-tinta);
}

.header__list {
  display: flex;
  gap: 0.125rem;
}

.header__item {
  position: relative;
}

/* Suppliers' page: a different audience, set apart by a thin rule. */
.header__item--apart {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  padding-left: 0.625rem;
  border-left: 1px solid var(--color-linea);
}

.header__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.625rem;
  border-radius: var(--radius-control);
  font-family: var(--font-display);
  font-size: 0.9375rem;
  white-space: nowrap;
  font-weight: 600;
  color: var(--color-tinta);
  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
}

.header__link:hover,
.header__link[aria-expanded='true'] {
  background: var(--color-nube);
}

.header__link.is-active {
  color: var(--color-azul);
}

.header__chev {
  width: 1rem;
  height: 1rem;
  transition: transform var(--duration-base) var(--ease-out);
}

.header__link[aria-expanded='true'] .header__chev {
  transform: rotate(180deg);
}

.drop {
  position: absolute;
  top: calc(100% + 0.75rem);
  left: -0.5rem;
  width: min(30rem, 80vw);
  padding: 0.75rem;
  background: var(--color-blanco);
  border: 1px solid var(--color-linea);
  border-radius: 10px;
  box-shadow: 0 24px 48px -24px rgb(11 44 71 / 0.35);
}

.header__nav {
  position: relative;
}

.drop--unit {
  width: min(24rem, 80vw);
  padding: 1rem;
}

/* Training: diploma programs beside the courses by line. */
.drop--wide {
  width: min(40rem, 90vw);
}

.drop__intro {
  padding: 0 0.625rem 0.75rem;
  font-size: var(--text-xs);
  color: var(--color-pizarra);
  border-bottom: 1px solid var(--color-linea);
}

.unit {
  display: grid;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.drop--wide .unit {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.unit__group {
  padding: 0 0.625rem 0.25rem;
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-azul-hondo);
}

.unit__list .drop__link {
  padding: 0.5rem 0.625rem;
}

.mega__line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.625rem;
  border-radius: var(--radius-control);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-tinta);
  text-decoration: none;
}

.mega__line:hover {
  background: var(--color-nube);
  color: var(--color-azul);
}

.mega__n {
  flex: none;
  font-size: 0.8125rem;
  color: var(--color-pizarra);
}

.drop__link {
  display: grid;
  gap: 0.125rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-control);
  text-decoration: none;
  color: var(--color-tinta);
}

.drop__link:hover {
  background: var(--color-nube);
}

.drop__label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
}

.drop__link:hover .drop__label {
  color: var(--color-azul);
}

.drop__hint {
  font-size: var(--text-xs);
  color: var(--color-pizarra);
}

.drop__all {
  display: inline-block;
  margin: 0.5rem 1rem 0.25rem;
  font-size: var(--text-xs);
}

.header__phone {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--color-tinta);
  text-decoration: none;
  white-space: nowrap;
}

.header__phone svg {
  width: 1.125rem;
  height: 1.125rem;
  color: var(--color-azul);
}

.header__phone:hover span {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.header__toggle {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-control);
  background: var(--color-azul);
  color: var(--color-blanco);
}

.header__toggle svg {
  width: 1.5rem;
  height: 1.5rem;
}

.sheet {
  position: fixed;
  inset: var(--header-offset) 0 0;
  overflow-y: auto;
  padding-block: 1.5rem 3rem;
}

.sheet__item {
  padding-block: 0.75rem;
  border-bottom: 1px solid rgb(255 255 255 / 0.25);
}

.sheet__link {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: var(--tracking-snug);
  color: inherit;
  text-decoration: none;
}

.sheet__sub {
  margin-top: 0.5rem;
}

.sheet__sublink {
  display: block;
  padding-block: 0.375rem;
  color: inherit;
  text-decoration: none;
}

.sheet__sublink:hover,
.sheet__link:hover {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.sheet__contact {
  display: grid;
  gap: 0.5rem;
  margin-top: 2rem;
  font-weight: 600;
}

.sheet__contact a {
  color: inherit;
  overflow-wrap: anywhere;
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(-0.75rem);
}

/* Tablets and laptops (768–1343 px) use the compact menu, but the main action stays in sight. */
@media (width >= 48rem) {
  .header__cta {
    display: flex;
    margin-left: auto;
  }

  .header__compact {
    margin-left: 0.5rem;
  }
}

@media (width >= 84rem) {
  .header__nav,
  .header__cta {
    display: flex;
  }

  .header__cta {
    margin-left: 0;
  }

  /* Logo, full menu and «Solicitar cotización» share one row: it never wraps the button below. */
  .header__bar {
    flex-wrap: nowrap;
  }

  .header__link {
    padding-inline: 0.5rem;
  }

  .header__utility {
    display: block;
  }

  .header__toggle,
  .header__compact,
  .sheet {
    display: none !important;
  }
}

/* Narrow desktops (1344–1535 px): the full menu needs a little less room. */
@media (84rem <= width < 96rem) {
  .header__link {
    font-size: 0.875rem;
  }

  .header__brand :deep(.logo) {
    width: 8.75rem;
  }
}
</style>
