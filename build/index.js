const fs = require('fs')
const path = require('path')
const { minify } = require('terser')

const { copyPackage } = require('./copyPackage')
const { rootPath, componentPath, packagePath } = require('./dirname')
const { exec } = require('child_process')

copyPackage()

// 拷贝 README 文件
const readmePath = path.join(rootPath, 'README.md')
const isReadmeExist = fs.existsSync(readmePath)
if (isReadmeExist) {
  fs.copyFileSync(
    path.join(rootPath, 'README.md'),
    path.join(packagePath, 'README.md')
  )
}

// 移除上次打包时的文件
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

// 优化
// 移除编译后，多余的 ts 文件
function removeTypescriptFiles(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const fullPath = path.join(directory, file)

    if (fs.lstatSync(fullPath).isDirectory()) {
      removeTypescriptFiles(fullPath)
    } else if (path.extname(file) === '.ts' && !file.endsWith('.d.ts')) {
      // 移除 ts 文件
      fs.unlinkSync(fullPath)
      console.log(`Deleted: ${fullPath}`)
    } else if (file.endsWith('.spec.ts') || file.endsWith('.spec.d.ts')) {
      // 移除 测试文件
      fs.unlinkSync(fullPath)
      console.log(`Deleted spec file: ${fullPath}`)
    }
  })
}
// 压缩 js 文件的体积
async function minifyJsFiles(directory) {
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const fullPath = path.join(directory, file)

    if (file === 'node_modules') {
      console.log(`Skipping node_modules: ${fullPath}`);
      continue;
    }

    if (fs.lstatSync(fullPath).isDirectory()) {
      await minifyJsFiles(fullPath)
    } else if (path.extname(file) === '.js') {
      const content = fs.readFileSync(fullPath, 'utf8')
      const result = await minify(content, {
        compress: true,
        mangle: true
      })
      fs.writeFileSync(fullPath, result.code)
      console.log(`Minified: ${fullPath}`)
    }
  }
}

const isPackagePathExist = fs.existsSync(packagePath)
if (isPackagePathExist) {
  removeDirectories(packagePath)
}

function startPublish(resourcePath) {
  exec(
    `cd ${resourcePath} && npm install && npm run build && npm publish --access public`,
    async (err, stdout, stderr) => {
      if (err) {
        console.log('执行错误：', err)
        return
      }
      console.log('执行结果：', stdout || '无')
      console.log('错误信息：', stderr || '无')

      removeTypescriptFiles(resourcePath)
      // await mergeDtsFiles(resourcePath, path.join(resourcePath, 'index.d.ts'))
      await minifyJsFiles(resourcePath)
    }
  )
}

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

const components = fs.readdirSync(componentPath)
components
  .reduce((acc, cur) => {
    const componentItemPath = path.join(componentPath, cur)
    copyDirectory(componentItemPath, path.join(packagePath, cur))
    return acc
  }, Promise.resolve([]))
  .then(() => {
    console.log('所有组件已同步成功')
    startPublish('src/packages')
  })
