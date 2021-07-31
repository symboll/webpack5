const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config')
const path =require('path')

// test
const TestPlugin = require('../plugin/TestPlugin')

const devConfig = merge(baseConfig, {
  mode: 'development', 
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: "首页",
      filename: "index.html",
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: "关于",
      filename: "about.html",
      chunks: ['about']
    }),
    new TestPlugin({
      target: '.css'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    // 启用 gzip 压缩
    compress: true,
    port: 9200,
    // 启动自动更新 (禁用 hot)
    liveReload: true,
    open: true,
    proxy: {
      // http://localhost:9200/api
      '/api': {
        // http://localhost:9200/api/users   ==> https://api.github.com/api/users
        target: 'https://api.github.com',
        // http://localhost:9200/api/users   ==> https://api.github.com/users
        pathRewrite: {
          '^/api': ''
        },
        // 不能使用localhost:9200 作为 github 的主机名
        changeOrigin: true,
      }
    }
  }
})

module.exports = devConfig
