<script setup lang="ts">
// Before first paint: apply the visitor's accessibility preferences (see
// useA11y.ts; same storage key and classes), then mark the document for motion
// unless the system or the visitor asked for none. CSS holds animated elements
// in their start state only under html.motion, so nothing is hidden for no-JS,
// reduced-motion or "pause motion" visitors.
useHead({
  script: [{
    key: 'prefs-flag',
    tagPosition: 'head',
    innerHTML: `(function(){var d=document.documentElement,p={};try{p=JSON.parse(localStorage.getItem('${A11Y_KEY}'))||{}}catch(e){}var s=[100,115,130,150];if(p.text)d.style.fontSize=s[p.text]+'%';if(p.contrast)d.classList.add('a11y-contrast');if(p.underline)d.classList.add('a11y-underline');if(p.spacing)d.classList.add('a11y-spacing');if(p.still)d.classList.add('a11y-still');if(!p.still&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion')})()`,
  }],
})

// Language attribute, alternate-language links and og:locale for every page.
const i18nHead = useLocaleHead()
useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: i18nHead.value.link,
  meta: i18nHead.value.meta,
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
