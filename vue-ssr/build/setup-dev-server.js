/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-31 21:49:22
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-04-01 10:58:27
 * @FilePath: /nuxt/vue-ssr/build/setup-dev-server.js
 */
const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const resolve = (file) => path.resolve(__dirname, file)

module.exports = (server, callback) => {
  let ready
  const onReady = new Promise(r => ready = r)

  // 监视构建 --> 更新 Renderer
  let template
  let serverBundle
  let clientManifest

  const update = () => {
    if (template && serverBundle && clientManifest) {
      ready()
      callback(serverBundle, template, clientManifest)
    }
  }

  // 监视template --> 调用update --> 更新renderer
  const templatePath = path.resolve(__dirname, '../index.template.html')
  template = fs.readFileSync(templatePath, 'utf-8')
  update()
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
  })

  // 监视serverBundle --> 调用update --> 更新renderer
  const serverConfig = require('./webpack.server.config')
  const serverCompiler = webpack(serverConfig)
  // 实现开发环境下编译的文件存储到内存中，提高效率
  devMiddleware(serverCompiler)
  serverCompiler.hooks.done.tap('server', () => {
    serverBundle = JSON.parse(
      // 从内存中读取文件
      serverCompiler.outputFileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
    )
    update()
  })
  // watch会监听文件变化，并主动在文件变化后重新构建，打包会打到磁盘中
  // serverCompiler.watch({}, (err, stats) => {
  //   if (err) throw err
  //   if (stats.hasErrors()) return
  //   serverBundle = JSON.parse(
  //     fs.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
  //   )
  //   console.log(serverBundle)
  //   update()
  // })

  // 监视clientManifest --> 调用update --> 更新renderer
  const clientConfig = require('./webpack.client.config')
  // 增加热更新
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  clientConfig.entry.app = [
    'webpack-hot-middleware/client?reload=true&noInfo=true', // 和服务器端交互处理热更新的一个客户端脚本
    clientConfig.entry.app
  ]
  clientConfig.output.filename = '[name].js' // 热更新模式下需要确保hash一致

  const clientCompiler = webpack(clientConfig)
  // 实现开发环境下编译的文件存储到内存中，提高效率
  const clientDevMiddleware = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath
  })
  clientCompiler.hooks.done.tap('client', () => {
    clientManifest = JSON.parse(
      // 从内存中读取文件
      clientCompiler.outputFileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'), 'utf-8')
    )
    update()
  })

  // 增加热更新
  server.use(hotMiddleware(clientCompiler, {
    log: false // 关闭其本身的日志输出
  }))

  // 将clientDevMiddleware挂载到express服务中，提供对其内部内存数据的访问
  server.use(clientDevMiddleware)

  return onReady
}