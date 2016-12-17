var webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: [
    './examples/index.js',
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://0.0.0.0:8080',
  ],
  output: {
    path: __dirname + '/dist',
  },
  resolve: {
    root: __dirname,
    alias: {
      'flocs-visual-components': __dirname + '/src',
          // to achieve client-like imports from the library in examples
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react', 'react-hmre']
        }
      },
      {
        test: /.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
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
