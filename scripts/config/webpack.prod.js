const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BannerPlugin } = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  devtool: false, //生产环境中不需要sourcemap功能
  plugins: [
    new CleanWebpackPlugin(), //自动清理dist的文件
    new BannerPlugin({
      raw: true,
      banner:
        '/** @preserve Powered by react-ts-perfect-builder (https://github.com/WonderSheep/react-ts-perfect-builder) */'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        //压缩Js代码
        extractComments: false, //去除所有注释
        terserOptions: {
          compress: {
            //设置想要去除的函数，这里清楚了console.log
            pure_funcs: ['console.log']
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0
    }
  }
})
