const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //disableHostCheck: true,
    /*allowedHosts: [
      'localhost'
    ]*/
    //public: 'localhost:8080',
    allowedHosts: 'all',
  }
})
