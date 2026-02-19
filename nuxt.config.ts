export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  srcDir: 'app',

  modules: [
    '@pinia/nuxt'
  ],

  components: [
    { path: '~/shared/components', pathPrefix: false },
    { path: '~/modules', pathPrefix: false }
  ],

  vite: {
    optimizeDeps: {
      include: ['@kalimahapps/vue-icons']
    }
  }
})
