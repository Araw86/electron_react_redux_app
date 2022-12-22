const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'electron_react_redux_app'),
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'electron-main',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/main', to: 'main' }
      ]
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.node'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
};