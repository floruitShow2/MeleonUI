const fs = require('fs')
const path = require('path')
const { copyPackage } = require('./copyPackage')
const {
    rootPath,
    componentPath,
    packagePath
} = require('./dirname')
const { exec } = require('child_process')

copyPackage()

const readmePath = path.join(rootPath, 'README.md')
const isReadmeExist = fs.existsSync(readmePath)
if (isReadmeExist) {
    fs.copyFileSync(
        path.join(rootPath, 'README.md'),
        path.join(packagePath, 'README.md')
    )
}

function removeDirectories(dir, index = 0) {
    // 读取目录下的所有文件和子目录
    const files = fs.readdirSync(dir)
  
    for (const file of files) {
      const filePath = path.join(dir, file)
      // 如果是目录,则递归删除
      if (fs.lstatSync(filePath).isDirectory()) {
        removeDirectories(filePath, index + 1)
        fs.rmdirSync(filePath)
      } else {
        if (index !== 0) fs.unlinkSync(filePath)
      }
    }
}
const isPackagePathExist = fs.existsSync(packagePath)
if (isPackagePathExist) {
    removeDirectories(packagePath)
}

function startPublish(resourcePath) {
    exec(`cd ${resourcePath} && npm run build`, (err, stdout, stderr) => {
        if (err) {
            console.log('执行错误：', err)
            return
        }
        console.log('执行结果：', stdout || '无')
        console.log('错误信息：', stderr || '无')
    })
}

function copyDirectory(originPath, targetPath) {
    const isDirectory = fs.statSync(originPath).isDirectory()
    if (isDirectory) {
        fs.mkdirSync(targetPath)
        const files = fs.readdirSync(originPath)
        files.forEach(file => {
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

const components = fs.readdirSync(componentPath)
components.reduce((acc, cur) => {
    const componentItemPath = path.join(componentPath, cur)
    copyDirectory(componentItemPath, path.join(packagePath, cur))
    return acc
}, Promise.resolve([])).then(() => {
    console.log('所有组件已同步成功')
    startPublish('src/packages')

})