'use strict';
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    entry: {
      app: [
        './src/index.js'
      ],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/public/'
    },
    module: {
      loaders: [
        {
          // .jsxと.jsを対象にする
          test: /\.jsx?$/,
          // node_modulesを除く
          exclude: /node_modules/,
          loaders: ['babel-loader'],
        }
      ]
    }
  },{
    entry: {
      style: [
        './src/style/index.js'
      ],
    },
    output: {
      path: path.join(__dirname, 'dist/css'),
      filename: '[name].css'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        }, {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
    ]
  }

]
