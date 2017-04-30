import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { HotModuleReplacementPlugin } from 'webpack'

const defaultEnv = {
  dev: true,
  production: false
}

export default (env = defaultEnv) => ({
  entry: [
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
      template: path.join(__dirname, 'src/template/index.html')
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
