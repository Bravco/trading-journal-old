// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@nuxt/ui",
    "@invictus.codes/nuxt-vuetify",
  ],
  css: [
    "~/assets/main.css",
  ],
})
