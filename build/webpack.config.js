const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path =require('path')

const styleLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  }, 
  'css-loader', 'postcss-loader'
]

module.exports = {
  target: 'web',
  // entry: './src/index.js',
  entry: {
    'index': "./src/index.js",
    'about': "./src/about.js"
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash:8].js'
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    alias: {
      "@": path.resolve('src')
    },
    extensions: ['.js', '.ts', '.json', '.css', '.less']
  },
  // 排除打包项
  externales: {

  },
  module: {
    rules: [
      {
        test: /\.md$/i,
        // use: './loader/markdown-loader'
        use: [
          'html-loader',
          {
            loader: "./loader/markdown-loader",
            options: {
              size: 20
            }
          }
        ]
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
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
        use: [...styleLoader]
      },
      {
        test: /\.less$/i,
        use: [ ...styleLoader , 'less-loader' ]
      }
    ]
  },
  plugins: [
    // 单独提取css到一个文件
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:8].css'
    }),
    // 规范css
    new StylelintWebpackPlugin({
      files: ['src/**/*.{css,less,scss,sass,styl}']
    }),
    // new EslintWebpackPlugin({
    //   fix: true
    // }),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'src/public',
        to: 'public'
      }]
    }),
    new CleanWebpackPlugin()
  ],

}