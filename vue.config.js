const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      // '/templates': {
      //   target: 'https://api.spakky.com'
      // },
      '/employees' : {
        target: 'http://localhost:8000'
      },
      '/documents' : {
        target: 'http://localhost:8000'
      },
      '/approval-lines' : {
        target: 'http://localhost:8000'
      },
      '/account' : {
        target: 'http://localhost:8000'
      },
    },
    historyApiFallback: true
  },

  transpileDependencies: [
    'vuetify'
  ],
});
