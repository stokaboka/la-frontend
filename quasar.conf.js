// Configuration for your app

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'axios',
      'notify-defaults'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QAvatar',
        'QBanner',
        'QBadge',
        'QBtnDropdown',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QCheckbox',
        'QChip',
        'QCircularProgress',
        'QLayout',
        'QHeader',
        'QDrawer',
        'QDialog',
        'QFooter',
        'QPageSticky',
        'QPageScroller',
        'QPageContainer',
        'QPage',
        'QPopupEdit',
        'QTable',
        'QTabPanels',
        'QTabPanel',
        'QTh',
        'QTr',
        'QTd',
        'QToggle',
        'QToolbar',
        'QTooltip',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QRadio',
        'QOptionGroup',
        'QInput',
        'QSelect',
        'QSeparator',
        'QSpace',
        'QSlider',
        'QTabs',
        'QTab',
        'QParallax',
        'QRouteTab',
        'QScrollArea'
      ],

      directives: [
        'Ripple',
        'Scroll',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify'
      ]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      sourceMap: !!ctx.dev,
      minify: !ctx.dev,
      env: ctx.dev
        ? { // so on dev we'll have
          API: JSON.stringify('http://localhost:4444'),
          MODE: JSON.stringify('DEVELOPMENT')
        }
        : { // and on build (production):
          API: JSON.stringify(''),
          MODE: JSON.stringify('PRODUCTION')
        },
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [
      'bounceInLeft',
      'bounceOutRight',
      'bounceInRight',
      'bounceOutLeft',
      'fadeInRight',
      'fadeOutLeft',
      'fadeIn',
      'fadeOut',
      'slideInDown',
      'slideOutDown',
      'slideInLeft',
      'slideOutRight',
      'slideInRight',
      'slideOutLeft'
    ],

    ssr: {
      pwa: false
    },

    pwa: {
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        name: 'Свобода слова - Language Assessment©',
        short_name: 'Language Assessment©',
        description: 'Language Assessment© - система оценки знаний английского языка и отслеживания прогресса студента, изучающего язык.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
