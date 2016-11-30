var webpack = require("webpack");
var libraryName = 'flocs-visual-components';

module.exports = {
  entry: __dirname + '/src/index.js',
  devtool: "source-map",
  output: {
    path: __dirname + '/lib',
    filename: libraryName + '.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    root: __dirname + '/src',
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=8000&name=/static/images/[name].[ext]',
      },
      {
        test: /\.woff$/,
        loader: 'file-loader?name=/static/fonts/[name].[ext]'
      }
    ]
  },
};
