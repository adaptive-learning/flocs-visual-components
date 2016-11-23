var webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: {
    'bundle': [
      'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      './src/index.js',
    ],
    'examples': [
      './examples/space-game.js',
    ],
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'flocs-visual-components': __dirname + '/src',
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
          presets: ['es2015', 'react', 'react-hmre']
        }
      }
    ]
  },
};
