const { resolve } = require('path')
const { PROJECT_PATH } = require('../constant')

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/index.js')
  },
  output: {
    filename: 'js/[name].[hash:8].js', //打包的东西放进dist的JS文件夹里
    path: resolve(PROJECT_PATH, './dist')
  }
}
