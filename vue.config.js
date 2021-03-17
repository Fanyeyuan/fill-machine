module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['serialport'],
      nodeModulesPath: ['../../node_modules', './node_modules'],
      builderOptions: {
        publish: ['github']
      }
    }
  },
  lintOnSave: true
}
