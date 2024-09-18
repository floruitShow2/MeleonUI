const path = require('path')
const fs = require('fs')

const { rootPath, packagePath } = require('./dirname')

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

module.exports = {
  copyPackage
}
