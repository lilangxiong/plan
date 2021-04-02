/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-31 12:40:58
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-31 18:22:37
 * @FilePath: /nuxt/vue-ssr/build/webpack.client.config.js
 */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: {
    app: './src/entry-client.js'
  },
  module: {
    rules: [
      // ES6 转ES5
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  // 重要信息:这将 webpack 运行时分离到一个引导 chunk 中， 
  // 以便可以在之后正确注入异步 chunk。
  optimization: {
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity
    }
  },
  plugins: [
    // 此插件在输出目录中生成 `vue-ssr-client-manifest.json`。 
    new VueSSRClientPlugin()
  ]
})