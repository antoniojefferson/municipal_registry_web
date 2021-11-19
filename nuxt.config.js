export default {
    mode: 'universal',
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
    },
    css: [
        '~/assets/stylesheet/scss/main.scss'
    ],
    styleResources: {
        scss: [
            '~/assets/stylesheet/scss/mixins.scss',
            '~/assets/stylesheet/scss/variables.scss'
        ]
    },
    plugins: [],
    buildModules: [],
    modules: [
        'bootstrap-vue/nuxt',
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
    ]
}