/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-30 21:10:50
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-04-01 11:00:48
 * @FilePath: /nuxt/vue-ssr/server.js
 */
const fs = require('fs')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('./build/setup-dev-server')
const server = express()


const isProd = process.env.NODE_ENV === 'production'
let renderer
let onReady // promise
if (isProd) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  const template = fs.readFileSync('./index.template.html', 'utf-8')
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
  })
} else {
  // 开发模式
  // 打包构建(客户端 + 服务端) -> 创建渲染器，返回一个promise
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest
    })
  })
}

const render = async (req, res) => {
  try {
    // TODO: renderer.renderToString是如何将参数传递给entry-server.js的context的？
    const context = {
      title: '测试',
      meta: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      url: req.url
    }
    const html = await renderer.renderToString(context)
    res.setHeader('Content-Type', 'text/html; charset=utf8')
    res.end(html)
  } catch (err) {
    console.log(err)
    res.status(500).end('Internal Server Error')
  }
}

// 只处理物理磁盘中的文件，引入webpack-dev-middleware将打包文件放到内存后就会失效
server.use('/dist', express.static('./dist'))

// 服务器路由设置为*，意味着所有路由都会进到这里
server.get('*', isProd
  ? render
  : async (req, res) => {
    await onReady
    render(req, res)
  }
)

server.listen(3000, () => {
  console.log('server running at port 3000')
})