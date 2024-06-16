const path = require('path')

const rootPath = path.join(__dirname, '../')
// 组件文件夹
const componentPath = path.join(rootPath, 'src/ml-ui')
// 打包文件夹
const packagePath = path.join(rootPath, 'src/packages')

module.exports = {
  // 项目根目录
  rootPath,
  // 组件库目录
  componentPath,
  // 打包目录
  packagePath
}