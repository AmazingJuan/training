<script setup lang="ts">
import type { ModeId, OfferGroup } from '~/data/services'

/** The services of one line in one unit, to read; quotes go through the contact form. */
defineProps<{ mode: ModeId, line: string, groups: OfferGroup[], lineName: string }>()

const { tr } = useLang()
</script>

<template>
  <div class="offers">
    <div v-for="g in groups" :key="g.area?.es ?? 'all'" class="offers__group">
      <h3 v-if="g.area" class="offers__area">{{ tr(g.area) }}</h3>
      <ul class="offers__list dot-list">
        <li v-for="item in g.items" :key="item.es" class="offer">{{ tr(item) }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.offers {
  display: grid;
  gap: 2.25rem;
}

.offers__area {
  margin-bottom: 0.5rem;
  font-size: var(--text-lg);
  line-height: 1.3;
  color: var(--color-azul);
}

.offer {
  --dot-offset: 0.75rem;
  padding-block: 0.75rem;
  border-bottom: 1px solid var(--color-linea);
}
</style>
