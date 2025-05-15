const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  devServer: {
    allowedHosts: 'all',
    client: {
      webSocketURL: {
        hostname: '0.0.0.0',
        pathname: '/ws',
        protocol: 'ws',
      },
    },
    host: '0.0.0.0',
    https: false,
  },

  transpileDependencies: true,

  publicPath: process.env.NODE_ENV === 'production'
  ? '/online_menu/'
  : '/',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  }
})
