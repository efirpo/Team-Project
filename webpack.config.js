const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //new line
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');  // new line
const Dotenv = require('dotenv-webpack');
const THREE = require('three');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',  // new line
  devServer: {                 // new line
    contentBase: './dist'      // new line
  },
  plugins: [
    new UglifyJsPlugin({ sourceMap: true }),    // new line
    new CleanWebpackPlugin(),
    new Dotenv(),   // new line
    new HtmlWebpackPlugin({
      title: 'blank',
      template: './src/index.html',
      inject: 'body',
    
    })
    
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ]
  }
};