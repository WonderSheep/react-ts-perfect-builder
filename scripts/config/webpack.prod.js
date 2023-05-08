const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: false, //生产环境中不需要sourcemap功能
  plugins: [
    new CleanWebpackPlugin() //自动清理dist的文件
  ]
})
