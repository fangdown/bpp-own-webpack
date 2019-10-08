const fs = require('fs')
const path = require('path')
const babylon = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

let ID = 0

// 从入口开始分析依赖项，生成依赖图，广度遍历
function createGraph(entry){
  const mainAsset = createAsset(entry)
  const queue = [mainAsset]
  for(const asset of queue){
    const dirname = path.dirname(asset.filename)
    asset.mapping = {}
    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath)
      const child = createAsset(absolutePath)
      asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }
  return queue
}
// 读取文件，获取依赖关系
function createAsset(filename){
  const content = fs.readFileSync(filename, 'utf-8')

  const ast = babylon.parse(content, {
    sourceType: 'module'
  })
  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value)
    }
  })
  const id = ID++
  const {code} = babel.transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env']
  })
  return {
    id,
    filename,
    dependencies,
    code
  }
}
// 根据依赖图，生成浏览器可执行文件
function bundle(graph){
  let modules = ''
  graph.forEach(mod => {
    modules += `${mod.id}:[
      function(require, module, exports){
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)}
    ],`
  })
  const result = `
    (function(modules){
      function require(id){
        const [fn, mapping] = modules[id]
        function localRequire(relativePath){
          return require(mapping[relativePath])
        }
        console.log('fn', fn)
        const module = {exports:{}}
        fn(localRequire, module, module.exports)
        return module.exports
      }
      require(0)
    })({${modules}})
  `
  return result
}


const graph = createGraph("./example/entry.js");
const ret = bundle(graph)

fs.writeFileSync('./bundle.js', ret)

// node  bundle.js 
// hello simple, webpack


// 从入口开始分析依赖项，生成依赖图，广度遍历
function createGraph(entry){
  return queue
}
// 读取文件，获取依赖关系
function createAsset(filename){
  return {
    id,
    filename,
    dependencies,
    code
  }
}
// 根据依赖图，生成浏览器可执行文件
function bundle(graph){
  return result
}
const graph = createGraph("./example/entry.js");
const ret = bundle(graph)

fs.writeFileSync('./bundle.js', ret)