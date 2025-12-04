export default defineNuxtConfig({
  devtools: { enabled: true },

  compatibilityDate: '2025-09-04',
  typescript: {
    strict: true,
    typeCheck: true
  },

  css: [
    '~/assets/css/style.scss',
    'flag-icons/css/flag-icons.min.css'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        }
      }
    },
    optimizeDeps: {
      include: ['howler']
    }
  },

  modules: [
    //'@nuxthub/core',
    '@nuxt/icon'
  ],

  future: {
    compatibilityVersion: 4
  },
/*
  experimental: {
    typedPages: true
  },
*/

  app: {
    head: {
      title: 'Racing Manager',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no" },      
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" }
      ],
      script: [
        {
          src: 'https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js'
        }
      ]
    }
  },

  build: {
    transpile: []
  },

  nitro: {
    preset: 'node-server',
    experimental: {
      wasm: true,
      database: true
    },
    database: {
      myDB: {
        connector: 'sqlite',
        options: {
          name: 'mydbfile'
        }
      }
    } 
  },
/*
  router: {
    options: {
      strict: true
    }
  }
  */

})