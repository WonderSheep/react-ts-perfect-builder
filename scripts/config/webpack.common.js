const { resolve } = require('path')
const { isDev, PROJECT_PATH } = require('../constant')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const copyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTscheckWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//抽离重复代码
const getCssloaders = (importLoaders) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: isDev,
      importLoaders
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDev,
      postcssOptions: {
        plugins: [
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true,
                flexbox: 'no-2019'
              },
              stage: 3
            }
          ],
          'postcss-normalize'
        ]
      }
    }
  }
]

module.exports = {
  entry: {
    index: resolve(PROJECT_PATH, './src/index.js')
  },
  output: {
    filename: `js/[name]${isDev ? '' : '[hash:8]'}.js`, //打包的东西放进dist的JS文件夹里
    path: resolve(PROJECT_PATH, './dist')
  },
  cache: {
    //webpack5默认支持缓存，加快编译速度
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      src: resolve(PROJECT_PATH, './src'),
      components: resolve(PROJECT_PATH, './src/components'),
      utils: resolve(PROJECT_PATH, './src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...getCssloaders(1)]
      },
      {
        test: /\.less$/,
        use: [
          ...getCssloaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssloaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader', //若图片小于1024b，则打包成base64的图片直接插入到文件中，减少http请求
            options: {
              limit: 10 * 1024, //若图片大小大于1024B,则不使用url-loader转去使用file-loader打包图片到文件目录下
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images'
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts'
            }
          }
        ]
      },
      {
        test: /\.(tsx?|js)$/, //匹配ts,tsx,js文件
        loader: 'babel-loader',
        options: {
          cacheDirectory: true //将公共文件缓存起来，加快下次编译速度
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename] //webpack默认支持缓存上一次打包的结果，加快编译结果，如此更改后，即当配置文件发生变化时，旧的缓存失效，重新编译
        }
      },
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true
          }
    }),
    new copyPlugin({
      //用来将public下的静态文件复制到生产出来的文件夹中
      patterns: [
        {
          context: resolve(PROJECT_PATH, './public'), //表示需要拷贝的文件或文件夹的根目录所在的绝对路径
          from: '*', //表示需要拷贝的文件或文件夹相对于 context 的路径，* 表示匹配所有文件。
          to: resolve(PROJECT_PATH, './dist'), //表示拷贝后的文件或文件夹所在的绝对路径。
          toType: 'dir', //表示拷贝后的文件或文件夹类型，可以是文件或文件夹。
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new WebpackBar({
      name: isDev ? '正在启动项目' : '正在打包项目',
      color: '#fa8c16'
    }),
    new ForkTscheckWebpackPlugin({
      typescript: {
        configFile: resolve(PROJECT_PATH, './tsconfig.json')
      }
    })
  ].concat(
    // pro环境打包 抽离css
    !isDev
      ? [
          new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css', // 指定提取的 CSS 文件的输出文件名。
            chunkFilename: 'css/[name].[contenthash:8].css', //指定提取的 CSS 文件在按需加载时的输出文件名
            ignoreOrder: false //用于禁止忽略 CSS 文件中的顺序,确保css文件中的顺序按照原样
          })
        ]
      : []
  )
}
