const path = require('path');

const { IgnorePlugin } = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
/* ignore fsevents module which caused error in electron  */
const optionalPlugins = [];
if (process.platform !== "darwin") {
  optionalPlugins.push(new IgnorePlugin({ resourceRegExp: /^fsevents$/ }));
}


module.exports = [{
  mode: 'development',
  entry: './src/renderer/index.js',
  devtool: 'source-map',
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
        test: [/\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      {
        test: [/\.s[ac]ss$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.node', '...'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build', 'renderer'),
    clean: true
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
  mode: 'development',
  entry: './src/main/main.js',
  devtool: 'source-map',
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, 'build', 'main'),
    //clean: true
  },
  plugins: [
    ...optionalPlugins,
  ],
  externals: {
    sqlite3: 'commonjs sqlite3',
  },
},
{
  mode: 'development',
  entry: './src/main/preload/preload.js',
  devtool: 'source-map',
  target: 'electron-preload',
  output: {
    path: path.join(__dirname, 'build', 'main', 'preload'),
    filename: 'preload.js',
    // clean: true
  }
}

];