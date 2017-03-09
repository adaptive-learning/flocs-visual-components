var webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    'flocs-visual-components': __dirname + '/src/index.js',
    'flocs-node': __dirname + '/src/node-index.js',
  },
  devtool: "source-map",
  output: {
    path: __dirname + '/lib',
    filename: '[name].js',
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
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
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
