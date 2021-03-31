module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['serialport'],
      nodeModulesPath: ['../../node_modules', './node_modules'],
      builderOptions: {
        nsis: {},
        // asar: false, //测试 打包后video 显示
        extraResources: [
          {
            from: './static',
            to: 'static'
          }
        ],
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
