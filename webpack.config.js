const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path =require('path')

module.exports = {
  mode: 'development', 
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: "usage",  // 按需加载
              corejs: 3,
              targets: {
                "browsers":[">1%","last 2 versions"]
              }
            }]
          ]
        }
      },
      // {
      //   test: /\.(htm|html)$/i,
      //   use: {
      //     loader: "html-loader",
      //     options: {
      //       // webpack5 需要 html-loader  也配置。 
      //       esModule: false
      //     }
      //   }
      // },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        // use: {
        //   loader: 'file-loader',
        //   options: {
        //     name: 'fonts/[name].[ext]'
        //   }
        // }

        // 使用资源模块处理字体文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        // use: {
        //   // loader: 'file-loader'
        //   loader: "url-loader",
        //   options: {
        //     limit: 8 * 1024,  // 8kb
        //     name: 'image/[name].[ext]',
        //     esModule: false
        //   }
        // }
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          filename: 'image/[name][ext]'
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../'
            }
          }, 
          'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/i,
        use: [           
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '../'
            }
          },  'css-loader', 'postcss-loader', 'less-loader' ]
      }
    ]
  },
  plugins: [
    // 单独提取css到一个文件
    new MiniCssExtractPlugin({
      filename: 'style/[name].css'
    }),
    // 规范css
    new StylelintWebpackPlugin({
      files: ['src/**/*.{css,less,scss,sass,styl}']
    }),
    // 压缩css代码
    new CssMinimizerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: "首页",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: "About",
      filename: "about.html",
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   keepClosingSlash: true,
      //   removeRedundantAttributes: true,
      //   removeScriptTypeAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   useShortDoctype: true
      // }
    }),
    new EslintWebpackPlugin({
      fix: true
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'src/public',
        to: 'public'
      }]
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
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
  },
  target: 'web'
}