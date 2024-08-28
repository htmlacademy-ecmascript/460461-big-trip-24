const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },

    plugins: [
        new copyWebpackPlugin({
          patterns: [
            {
              from: 'public',
              to: '.',
              globOptions: {
              ignore: ['**/index.html']
            }
            },
          ],
        }),
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: 'index.html',
          inject: 'body'
        }),
    ],

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.[contenthash].js',
        clean: true,
    },
};