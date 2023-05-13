const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { SERVER_HOST, SERVER_PORT } = require('../constant')
const webpack = require('webpack')
// const proxySetting = require('./setProxy')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', //sourcemap
  devServer: {
    host: SERVER_HOST, //指定host,不设置的话默认时Localhost
    port: SERVER_PORT, //指定端口，默认时8080
    compress: true, //是否使用gzip压缩
    open: true, //打开默认浏览器
    hot: true //热更新
    // proxy:{...proxySetting} //开发模式下跨域
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0
    }
  }
})
