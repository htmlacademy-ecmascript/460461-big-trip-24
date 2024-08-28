const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    devtool: 'source-map',
    plugins: [
        new copyWebpackPlugin({
          patterns: [
            { from: 'public', to: "." },
          ],
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        clean: true,
    },
};