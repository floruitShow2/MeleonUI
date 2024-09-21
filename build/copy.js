const path = require('path')
const fs = require('fs')

const { componentPath, rootPath, packagePath } = require('./dirname')

function copyDirectory(originPath, targetPath) {
  const isDirectory = fs.statSync(originPath).isDirectory()
  if (isDirectory) {
    fs.mkdirSync(targetPath)
    const files = fs.readdirSync(originPath)
    files.forEach((file) => {
      const filePath = path.join(originPath, file)
      const targetFilePath = path.join(targetPath, file)
      copyDirectory(filePath, targetFilePath)
      if (file.indexOf('ml-') !== -1) {
        console.log(file + ' 组件同步成功')
      }
    })
  } else {
    fs.copyFileSync(originPath, targetPath)
  }
}

// 拷贝 package.json 文件里的版本号
function copyPackage() {
  const rootPackageJsonPath = path.join(rootPath, 'package.json')
  let rootJsonData = fs.readFileSync(rootPackageJsonPath, 'utf-8')
  rootJsonData = JSON.parse(rootJsonData)

  const packageJsonPath = path.join(packagePath, 'package.json')
  let jsonData = fs.readFileSync(packageJsonPath, 'utf-8')
  jsonData = JSON.parse(jsonData)

  jsonData.version = rootJsonData.version
  // jsonData.dependencies = rootJsonData.dependencies
  // jsonData.devDependencies = rootJsonData.devDependencies

  fs.writeFileSync(packageJsonPath, JSON.stringify(jsonData, '', 4))
}

// 拷贝 README.md 文件
function copyREADME() {
  const readmePath = path.join(rootPath, 'README.md')
  const isReadmeExist = fs.existsSync(readmePath)
  if (isReadmeExist) {
    fs.copyFileSync(
      path.join(rootPath, 'README.md'),
      path.join(packagePath, 'README.md')
    )
  }
}

// 拷贝组件文件
function copyComponents() {
  return new Promise((resolve, reject) => {
    const components = fs.readdirSync(componentPath)
    components
      .reduce((acc, cur) => {
        const componentItemPath = path.join(componentPath, cur)
        copyDirectory(componentItemPath, path.join(packagePath, cur))
        return acc
      }, Promise.resolve([]))
      .then(() => {
        console.log('所有组件已同步成功')
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

module.exports = {
  copyPackage,
  copyREADME,
  copyComponents
}
