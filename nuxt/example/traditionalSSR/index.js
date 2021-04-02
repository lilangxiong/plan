/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-28 21:01:37
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-28 21:24:36
 * @FilePath: /plan/nuxt/example/server/index.js
 */
const express = require('express')
const fs = require('fs')
const template = require('art-template')

const app = express()

app.get('/', (req, res) => {
  // 1、获取页面模板
  const templateStr = fs.readFileSync('./index.html', 'utf-8')

  // 2、获取数据
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))

  // 3、渲染：数据 + 模板 = 最终结果
  const html = template.render(templateStr, data)

  // 4、把渲染结果发送给前端
  res.send(html)
})

app.listen(3000, () => {
  console.log('running')
})