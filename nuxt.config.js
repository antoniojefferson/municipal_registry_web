let development = process.env.NODE_ENV != 'production';

export default {
  ssr: false,

  server: {
    port: 8000,
    host: '0.0.0.0',
    timing: false
  },
  head: {
    title: 'Registro de Municípios',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: [
    '~/assets/stylesheet/scss/main.scss',
    'vue-datetime/dist/vue-datetime.css'
  ],
  styleResources: {
    scss: [
      '~/assets/stylesheet/scss/mixins.scss',
      '~/assets/stylesheet/scss/variables.scss'
    ]
  },
  plugins: [
    '~/plugins/birth-date-validation.js',
    '~/plugins/cns-validation.js',
    '~/plugins/cpf-validation.js',
    '~/plugins/email-validation.js',
    '~/plugins/phone-validation.js',
    '~/plugins/v-mask.js',
    '~/plugins/vue-notification.js',
    '~/plugins/vue-fragment.js',
    '~/plugins/date-formatting.js',
    '~/plugins/i18n.js'
  ],
  buildModules: [],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    [
      'nuxt-fontawesome', {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          }
        ]
      }
    ]
  ],
  axios: {
    baseURL: development ? 'http://localhost:3000' : 'https://municipal-registry.herokuapp.com'
  }
}