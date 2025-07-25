// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-csurf",
  ],
  devtools: { enabled: true },
  compatibilityDate: "2025-07-15",
  colorMode: {
    dataValue: "theme",
  },
  app: {
    head: {
      title: "MyTravels",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
});