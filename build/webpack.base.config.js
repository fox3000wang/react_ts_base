const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function assetsPath(_path) {
  return path.posix.join('static', _path);
}

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 8888,
    open: true,
    compress: true,
    hot: true,
    contentBase: [path.resolve(__dirname, 'dist')],
    historyApiFallback: {
      //browserHash 刷新重定向到index.html
      index: './index.html',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              camelCase: true,
              localIdentName: '[name]_[local]_[hash:base64:5]',
            },
          },
        ],
        include: [resolve('src')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /node_modules/,
      },
    ],
  },
  plugins: [
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      minify: {
        minifyJS: true,
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
