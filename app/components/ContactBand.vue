<script setup lang="ts">
import { MessageCircle } from '@lucide/vue'
import { company } from '~/data/company'

/**
 * Closing call to action. Phones, e-mail and address live in the footer right
 * below, so this block only asks the question and offers the two fastest routes.
 */
const props = defineProps<{ title?: string, text?: string }>()
const { tr } = useLang()
const copy = {
  title: { es: 'Cuéntenos qué necesita su organización', en: 'Tell us what your organization needs' },
  text: { es: 'Le responderemos con una propuesta de consultoría, auditoría o formación ajustada a su organización.', en: 'We will reply with a consulting, auditing or training proposal tailored to your organization.' },
  write: { es: 'Solicitar cotización', en: 'Request a quotation' },
} satisfies Record<string, Loc>
</script>

<template>
  <section class="band field-azul" aria-labelledby="band-title">
    <div class="frame grid-page band__grid">
      <h2 id="band-title" class="heading band__title">{{ props.title ?? tr(copy.title) }}</h2>
      <div class="band__side">
        <p class="lede">{{ props.text ?? tr(copy.text) }}</p>
        <div class="band__actions">
          <UiButton to="/contacto?asunto=cotizacion" variant="light">{{ tr(copy.write) }}</UiButton>
          <UiButton :href="company.whatsapp.href" variant="ghost" external>
            <template #icon><MessageCircle aria-hidden="true" /></template>
            WhatsApp
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.band {
  padding-block: var(--spacing-section-sm);
}

.band__grid {
  row-gap: 2rem;
  align-items: center;
}

.band__title,
.band__side {
  grid-column: 1 / -1;
}

/* A closing prompt, not a section opener: one step below the section heading
   size (client, 2026-11-04: "muy grande"). */
.band__title {
  max-width: 24ch;
  font-size: var(--text-2xl);
  line-height: var(--text-2xl--line-height);
}

.band__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

@media (width >= 64rem) {
  .band__title { grid-column: 1 / span 6; }
  .band__side { grid-column: 7 / -1; }
}

@media (width < 30rem) {
  .band__actions > * {
    flex: 1 1 100%;
  }
}
</style>
