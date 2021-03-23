module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['serialport'],
      nodeModulesPath: ['../../node_modules', './node_modules'],
      builderOptions: {
        nsis: {},
        publish: ['github']
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 20000 }))
  },
  lintOnSave: true
}
