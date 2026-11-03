<script setup lang="ts">
import { team } from '~/data/company'

const { tr } = useLang()
const copy = {
  title: { es: 'Profesionales responsables de cada servicio', en: 'The professionals responsible for each service' },
  cta: { es: 'Conocer al equipo', en: 'Meet the team' },
  portrait: { es: 'Retrato de', en: 'Portrait of' },
} satisfies Record<string, Loc>
</script>

<template>
  <section class="team section field-nube" aria-labelledby="team-title">
    <div class="frame grid-page team__grid">
      <div class="team__words">
        <h2 id="team-title" class="heading">{{ tr(copy.title) }}</h2>
        <UiButton to="/empresa/equipo" variant="outline">{{ tr(copy.cta) }}</UiButton>
      </div>

      <ul class="team__people">
        <li v-for="p in team" :key="p.slug" class="person">
          <NuxtLinkLocale :to="`/empresa/equipo#${p.slug}`" class="person__link">
            <BrandRing :src="p.photo" :alt="`${tr(copy.portrait)} ${p.name}`" focus="50% 50%" sizes="xs:40vw sm:40vw md:200px" :gap="22" :dot="false" />
            <span class="person__name">{{ p.name }}</span>
            <span class="person__role">{{ tr(p.role) }}</span>
          </NuxtLinkLocale>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.team__grid {
  row-gap: 3.5rem;
}

.team__words,
.team__people {
  grid-column: 1 / -1;
}

.team__words .heading {
  margin-bottom: 2rem;
}

.team__people {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 1.25rem;
}

.person__link {
  display: grid;
  gap: 0.25rem;
  color: inherit;
  text-decoration: none;
}

.person__link :deep(.orbit) {
  margin-bottom: 0.75rem;
  transition: transform var(--duration-base) var(--ease-out);
}

.person__link:hover :deep(.orbit) {
  transform: rotate(-8deg);
}

.person__link:hover :deep(.ring__img) {
  transform: rotate(8deg);
}

.person__name {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.25;
}

.person__link:hover .person__name {
  color: var(--color-azul);
}

.person__role {
  font-size: var(--text-sm);
  color: var(--color-pizarra);
}

@media (width >= 48rem) {
  .team__people {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (width >= 64rem) {
  .team__words {
    grid-column: 1 / span 5;
  }

  .team__people {
    grid-column: 7 / -1;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 1.5rem;
    align-self: center;
  }
}
</style>
