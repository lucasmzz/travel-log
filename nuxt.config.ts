// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
  ],
  devtools: { enabled: true },
  compatibilityDate: "2025-07-15",
  app: {
    head: {
      title: "MyTravels",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
});
