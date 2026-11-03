<script setup lang="ts">
import { company } from '~/data/company'

/**
 * The company's LinkedIn and Facebook pages, as icon links. Each has a spoken
 * name and says it opens in a new tab. Brand glyphs from Simple Icons (CC0).
 */
const { tr } = useLang()
const newTab = { es: 'se abre en una pestaña nueva', en: 'opens in a new tab' }
const label = (name: string) => tr({
  es: `${name} de Training Corporation (${newTab.es})`,
  en: `Training Corporation on ${name} (${newTab.en})`,
})

const networks = [
  {
    name: 'LinkedIn',
    href: company.social.linkedin,
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    name: 'Facebook',
    href: company.social.facebook,
    path: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  },
]
</script>

<template>
  <ul class="social">
    <li v-for="n in networks" :key="n.name">
      <a :href="n.href" class="social__link" target="_blank" rel="noopener" :aria-label="label(n.name)" :title="n.name">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path :d="n.path" /></svg>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.social {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.social__link {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-control);
  color: var(--color-azul);
  transition: background-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
}

.social__link:hover {
  background: var(--color-blanco);
  color: var(--color-azul-hondo);
}

.social svg {
  width: 1.125rem;
  height: 1.125rem;
  fill: currentColor;
}
</style>
