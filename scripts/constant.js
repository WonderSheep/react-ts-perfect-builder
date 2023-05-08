const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '../') //根目录
const PROJECT_NAME = path.parse(PROJECT_PATH).name //解析路径字符串，返回当前路径的文件名
const isDev = process.env.NODE_ENV !== 'production' //判断是否是开发环境
const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 9000

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  isDev,
  SERVER_HOST,
  SERVER_PORT
}
