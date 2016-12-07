var webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: __dirname + '/src/index.js',
  devtool: "source-map",
  output: {
    path: __dirname + '/lib',
    filename: 'flocs-visual-components.js',
    library: 'flocsVisualComponents',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: [nodeExternals()],  // don't bundle modules in node_modules directory
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
