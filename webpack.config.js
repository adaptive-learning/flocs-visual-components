var webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: {
    'bundle': [
      'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
      'webpack/hot/only-dev-server',
      './src/index.js',
    ],
    'space-game-example':  './examples/space-game-example.js',
    'code-editor-example': './examples/code-editor-example.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'flocs-visual-components': __dirname + '/src',
      'images': __dirname + '/assets/images',
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
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=8000',
      }
    ]
  },
};
