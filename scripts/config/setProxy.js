//开发模式下使用的代理

const proxySettings = {
  // 接口代理1
  '/api/': {
    target: 'http://198.168.111.111:3001', //要访问的目标服务器地址
    changeOrigin: true //代理服务器和目标服务器将会同IP同端口
  },
  // 接口代理2
  '/api-2/': {
    target: 'http://198.168.111.111:3002',
    changeOrigin: true,
    pathRewrite: {
      //当匹配到api-2开头的url时将url重写为api-2
      '^/api-2': ''
    }
  }
}

module.exports = proxySettings
