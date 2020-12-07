const siteData = require('./content/sitedata.json')
const host = "0.0.0.0" // or "localhost"
const port = 3000
const url = process.env.NODE_ENV != "production" ? `http://localhost:${port}` : (process.env.URL || `http://localhost:${port}`)
const title = siteData.name || process.env.npm_package_name.replace(/-/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, l => l.toUpperCase())
const description = siteData.description || process.env.npm_package_description
const twitterHandle = '@' + siteData.networks.filter(network => network.name == "Twitter")[0].handle || ''
const defaultShareImage = url + "/background.jpg"

import colors from 'vuetify/es5/util/colors'
export default {
  target: 'static',
  ssr: true,
  server: {
    host,
    port
  },
  generate: {
    fallback: true
  },
  head: {
    titleTemplate: `${title} | %s`,
    title,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: description
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: url
      }
    ]
  },
  css: [],
  plugins: [{
    src: '~/plugins/vue-masonry',
    ssr: false
  }],
  components: true,
  buildModules: [
    '@nuxtjs/vuetify',
    'nuxt-purgecss',
    // '@nuxtjs/ngrok',
    // 'nuxt-twa-module',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
  ],
  pwa: {
    meta: {
      /* meta options */
      // mobileAppIOS: true,
      // appleStatusBarStyle: "black",
      name: title,
      description,
      lang: siteData.lang || "en-US",
      theme_color: "black",
      ogHost: url,
      ogImage: {
        path: defaultShareImage
      },
      twitterCard: 'summary_large_image',
      twitterSite: twitterHandle,
      twitterCreator: twitterHandle,
      twitterImage: defaultShareImage
      // twitter:title
      // twitter:description
      // twitter:image:alt
    },
    workbox: {
      cleanupOutdatedCaches: true,
      runtimeCaching: [{
        urlPattern: 'https://fonts.googleapis.com/.*',
        // handler: 'cacheFirst',
        cacheableResponse: {
          statuses: [0, 200]
        }
      }, {
        urlPattern: 'https://cdn.jsdelivr.net/.*',
        // handler: 'cacheFirst',
        cacheableResponse: {
          statuses: [0, 200]
        }
      }]
    },
    manifest: {
      name: title,
      lang: siteData.lang || "en-US",
      display: "standalone",
      start_url: "/"
    },
  },
  twa: {
    //   // https://github.com/voorhoede/nuxt-twa-module#readme
    //   defaultUrl: 'url',
    //   hostName: 'nuxt-app-test.netlify.app',
    //   sha256Fingerprints: ['/* your SHA-256 keys */'],
    //   applicationId: 'com.example.example',
    //   launcherName: 'Your app name',
    //   versionCode: 1,
    //   versionName: '1.0',
    //   statusBarColor: 'grey',
    //   iconPath: '/static/icon.png',
    //   // distFolder: '.nuxt/dist/client',
  },
  ngrok: {
    addr: 8080
  },
  axios: {},
  content: {}, // dir: 'content' // default
  vuetify: {
    defaultAssets: {
      font: {
        family: 'Roboto'
      },
      icons: false
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
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
  publicRuntimeConfig: {
    baseUrl: url,
    siteData: {
      ...siteData,
      // url,
      name: title,
      description
    }
  },
  purgeCSS: {
    mode: 'postcss',
    whitelist: [
      'container',
      'row',
      'spacer',
      'aos-animate',
      'col',
      '[type=button]',
      'v-application p'
    ],
    whitelistPatterns: [
      /^v-.*/,
      /^col-.*/,
      /^theme-.*/,
      /^rounded-.*/,
      /^data-aos-.*/,
      /^(red|grey)--text$/,
      /^text--darken-[1-4]$/,
      /^text--lighten-[1-4]$/
    ],
    whitelistPatternsChildren: [
      /^post-content/,
      /^v-input/,
      /^swiper-.*/,
      /^pswp.*/,
      /^v-text-field.*/,
      /^v-progress-linear/
    ]
  },
  build: {
    extend(config, ctx) {}
  }
}
