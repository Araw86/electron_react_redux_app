const path = require('path');

const { IgnorePlugin } = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

/* ignore fsevents module which caused error in electron  */
const optionalPlugins = [];
if (process.platform !== "darwin") {
  optionalPlugins.push(new IgnorePlugin({ resourceRegExp: /^fsevents$/ }));
}


module.exports = [{
  mode: 'production',
  entry: './src/renderer/index.js',
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.node'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build', 'renderer'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'electron redux app',
      filename: 'index.html',
      template: 'src/renderer/index.html'
    })
  ]
},
{
  mode: 'production',
  entry: './src/main/preload/preload.js',
  target: 'electron-preload',
  output: {
    path: path.join(__dirname, 'build', 'main', 'preload'),
    filename: 'preload.js'
  }
},
{
  mode: 'production',
  entry: './src/main/main.js',
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, 'build', 'main'),
  },
  plugins: [
    ...optionalPlugins,
  ]
}
];