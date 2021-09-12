import colors from 'vuetify/es5/util/colors'
import path from 'path'

function resolve (dir) {
    return path.join(__dirname, dir)
}

const srcDir = 'src/'

export default {
    srcDir: srcDir,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - oauth_templates',
        title: 'oauth_templates',
        htmlAttrs: {
            lang: 'zh-cn'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    alias: {
        '@': resolve(srcDir)
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/i18n'
    ],

    i18n: {
        locales: ['en-us', 'zh-cn'],
        defaultLocale: 'zh-cn',
        vueI18n: {
            fallbackLocale: 'zh-cn',
            messages: {
                'en-us': require(resolve(srcDir) + 'assets/locales/en-us.json'),
                'zh-cn': require(resolve(srcDir) + 'assets/locales/zh-cn.json')
            }
        }
    },
    /*
  ** Axios module configuration
  */
    axios: {
        proxy: true,
        // prefix: '/api/',
        credentials: true
    // See https://github.com/nuxt-community/axios-module#options
    },
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:5000',
            secure: false,
            pathRewrite: {
                '^/api/': '/',
                changeOrigin: true
            }
        },
        '/github_raw': {
            target: 'https://raw.githubusercontent.com',
            secure: true,
            pathRewrite: {
                '^/github_raw/': '/',
                changeOrigin: true
            }
        }
    },
    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },
    router: { // customize nuxt.js router (vue-router).
        base: process.env.NODE_ENV === 'production' ? './' : '/'
    }
}
