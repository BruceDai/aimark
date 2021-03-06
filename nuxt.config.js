module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Web AI Benchmark',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Web AI Benchmark' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    script: [
      // { src: 'https://bulma.io/lib/navbar.js' }
      // { src: 'https://use.fontawesome.com/releases/v5.1.0/js/all.js' , defer: false },
    ],
  },
  /*
  css: [
    // 加载一个 node.js 模块
    'hover.css/css/hover-min.css',
    // 同样加载一个 node.js 模块，不过我们定义所需的预处理器
    { src: 'bulma', lang: 'sass' },
    // 项目中的 CSS 文件
    '~assets/css/main.css',
    // 项目中的 Sass 文件
    { src: '~assets/css/main.scss', lang: 'scss' } // 指定 scss 而非 sass
  ],
  */
  css: [
    '~/assets/css/main.css'
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      },
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    }
  },
  modules: [
    // Or you can customize
    ['nuxt-buefy', { css: false, materialDesignIcons: true }],
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: 'rgba(222, 12, 101, 1.0)', height: '1px' },
  // loading: '~/components/loading.vue',
  /*
  ** Build configuration
  */

  plugins: [
    { src: '~/plugins/buefy.js', ssr: true },
    { src: '~/plugins/vue-chartjs.js', ssr: false },
    { src: '~/plugins/elm-chart.js', ssr: false },
  ],
  // babel: {
  //   "plugins": [["import", {
  //     "libraryName": "iview",
  //     "libraryDirectory": "src/components"
  //   }]]
  // },
  // vendor: ['axios', 'lodash', 'iview'],
  build: {
    /*
    ** Run ESLint on save
    */
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    filenames: {
      vendor: 'v.[hash].js',
      app: 'a.[chunkhash].js'
    },
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

