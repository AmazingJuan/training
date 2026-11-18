<script setup lang="ts">
/**
 * Opening: the three strategic business units as the company's own pinwheel,
 * and beside it the single statement agreed with the client (Acta 6, 4 Nov
 * 2026): no subtitle and no supporting facts. The page's one orchestrated
 * motion: the blades swing into place round the centre. The statement is
 * painted at once (it is the page's largest text, what Google times).
 */
const { tr } = useLang()

const copy = {
  title: {
    es: 'Diseñamos a la medida soluciones innovadoras en auditoría, consultoría y formación empresarial',
    en: 'We design tailored, innovative solutions in auditing, consulting and corporate training',
  },
  quote: { es: 'Solicitar cotización', en: 'Request a quotation' },
  services: { es: 'Conocer los servicios', en: 'Explore our services' },
} satisfies Record<string, Loc>

const root = useTemplateRef<HTMLElement>('root')

useMotion(root, ({ gsap }) => {
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo('.units__core', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.1)
    .fromTo('.units__blade', { opacity: 0, rotation: -24, svgOrigin: '500 500' }, { opacity: 1, rotation: 0, svgOrigin: '500 500', duration: 1.1, stagger: 0.12 }, 0.2)
    .fromTo('.hero__line', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.6)
})
</script>

<template>
  <section ref="root" class="hero" aria-labelledby="hero-title">
    <div class="frame hero__grid">
      <div class="hero__wheel">
        <BrandUnits />
      </div>

      <h1 id="hero-title" class="hero__title">
        {{ tr(copy.title) }}
      </h1>

      <div class="hero__actions hero__line">
        <UiButton to="/contacto?asunto=cotizacion">{{ tr(copy.quote) }}</UiButton>
        <UiButton to="/portafolio-de-servicios" variant="outline">{{ tr(copy.services) }}</UiButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(1.5rem, 0.5rem + 3vw, 3.5rem) clamp(3.5rem, 2rem + 4vw, 6rem);
  overflow: hidden;
}

.hero__grid {
  display: grid;
  grid-template-areas: 'title' 'actions' 'wheel';
  gap: 1.75rem;
}

.hero__wheel {
  grid-area: wheel;
  width: min(100%, 30rem);
  justify-self: center;
  margin-top: 1rem;
}

.hero__title {
  grid-area: title;
  font-family: var(--font-display);
  font-size: clamp(1.875rem, 1.2rem + 2.4vw, 3.25rem);
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
  color: var(--color-tinta);
  text-wrap: balance;
  hyphens: manual;
  max-width: 20ch;
}

.hero__actions {
  grid-area: actions;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (width < 30rem) {
  .hero__actions > * {
    flex: 1 1 100%;
  }
}

@media (width >= 64rem) {
  .hero__grid {
    grid-template-columns: minmax(0, 6fr) minmax(0, 6fr);
    /* Title and actions as one block, centred against the wheel. */
    grid-template-areas: 'wheel .' 'wheel title' 'wheel actions' 'wheel .';
    grid-template-rows: 1fr auto auto 1fr;
    column-gap: clamp(2.5rem, 5vw, 6rem);
    row-gap: 0;
  }

  .hero__actions {
    margin-top: 2.5rem;
  }

  .hero__wheel {
    width: 100%;
    max-width: 36rem;
    margin-top: 0;
    justify-self: start;
    align-self: center;
  }
}
</style>

<style>
/* Start state of the load sequence; only when motion is allowed (app.vue). */
html.motion .hero__line,
html.motion .units__blade,
html.motion .units__core {
  opacity: 0;
  /* Safety net: if scripts are slow or fail, show everything anyway. */
  animation: hero-fallback 0.01s 2.5s forwards;
}

@keyframes hero-fallback {
  to { opacity: 1; }
}
</style>
