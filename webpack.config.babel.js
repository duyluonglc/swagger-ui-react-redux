import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { HotModuleReplacementPlugin } from 'webpack'

const defaultEnv = {
  development: true,
  production: false
}

export default (env = defaultEnv) => ({
  entry: [
    'babel-polyfill',
    ...env.dev ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080'
    ] : [],
    path.join(__dirname, 'src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    ...env.dev ? [
      // Webpack Development Plugins
      new HotModuleReplacementPlugin()
    ] : [],
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/Template/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'react'
              ],
              plugins: ['react-hot-loader/babel']
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader?modules', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true
                },
                gifsicle: {
                  interlaced: false
                },
                optipng: {
                  optimizationLevel: 7
                },
                pngquant: {
                  quality: '75-90',
                  speed: 4
                }
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    hot: env.dev
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
})
