export default {
    mode: 'universal',

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