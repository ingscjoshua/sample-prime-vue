// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  modules:['@primevue/nuxt-module'],
  primevue:{
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  typescript: {
    typeCheck: 'build',
    strict: true,
  },
  ssr: false,
  css: [
    'assets/styles/main.scss',
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
