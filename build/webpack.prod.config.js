const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config')



const prodConfig =  merge(baseConfig, {
  mode: 'production', 
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: JSON.stringify('http://www.base.url')
    }),    
    // 压缩css代码
    new CssMinimizerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: "首页",
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: "About",
      filename: "about.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
})

module.exports = prodConfig
