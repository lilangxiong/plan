/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-31 12:40:41
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-31 18:21:03
 * @FilePath: /nuxt/vue-ssr/build/webpack.base.config.js
 */
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      // 路径别名，@指向src
      '@': resolve('../src')
    },
    // 可以省略扩展名
    // 当省略扩展名时，按照从前到后的顺序一次解析
    extensions: ['.js', '.vue', '.json']
  },
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  module: {
    rules: [
      // 处理图片资源
      {
        test: /.(png|jpeg|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      // 处理字体资源
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      // 处理.vue文件
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // 处理css资源
      // 它会应用到.css文件
      // 以及.vue文件中的style模块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      // CSS 预处理器，参考:https://vue-loader.vuejs.org/zh/guide/pre- processors.html
      // 例如处理 Less 资源 // {
      // test: /\.less$/,
      // use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     'less-loader'
      //   ]
      // },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
}