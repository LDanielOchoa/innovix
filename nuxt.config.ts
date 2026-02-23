export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  debug: true,
  ssr: false,
  experimental: {
    payloadExtraction: false
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    cdnURL: 'https://innovix.gfandino.xyz/static/mf/login/',
    buildAssetsDir: '_nuxt/',
    baseURL: '/'
  },

  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Access-Control-Allow-Origin': 'https://innovix.gfandino.xyz',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*'
        }
      }
    }
  },

  srcDir: 'app',

  modules: ['@pinia/nuxt', '@nuxtjs/i18n'],

  runtimeConfig: {
    public: {
      siteUrl: 'https://innovix.gfandino.xyz/'
    }
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'es',
    detectBrowserLanguage: false,
    locales: [
      { code: 'es', file: 'es.json' },
      { code: 'en', file: 'en.json' }
    ],
    langDir: '../app/core/i18n/infrastructure/locales/',
    vueI18n: './i18n.config.ts'
  },

  components: [
    { path: '~/shared/components', pathPrefix: false },
    { path: '~/modules', pathPrefix: false }
  ],

  vite: {
    build: {
      minify: false,
      sourcemap: true
    },
    optimizeDeps: {
      include: ['@kalimahapps/vue-icons']
    }
  }
})