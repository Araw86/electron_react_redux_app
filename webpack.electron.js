const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const { IgnorePlugin } = require('webpack');

/* ignore fsevents module which caused error in electron  */
const optionalPlugins = [];
if (process.platform !== "darwin") {
  optionalPlugins.push(new IgnorePlugin({ resourceRegExp: /^fsevents$/ }));
}

module.exports = {
  mode: 'development',
  entry: './src/main/main.js',
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, 'build', 'main'),
  },
  plugins: [
    ...optionalPlugins,
  ]
};