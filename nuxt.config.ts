// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  modules: ['@primevue/nuxt-module', '@nuxtjs/i18n'],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  typescript: {
    typeCheck: false,
    strict: true,
  },
  ssr: false,
  css: ['assets/styles/main.scss'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  i18n: {
    strategy: 'prefix_except_default', // strategies docs: https://v8.i18n.nuxtjs.org/guide/routing-strategies
    locales: ['en', 'es'], // used in URL path prefix
    defaultLocale: 'es', // default locale of your project for Nuxt pages and routings,
    detectBrowserLanguage: false, // avoid adopting browser language
    vueI18n: './i18n.config.ts',
  },
});
