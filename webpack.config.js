var webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    noParse: [
      /\/sinon.js/
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=0'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^sinon$/, __dirname + '/node_modules/sinon/pkg/sinon.js')
  ],
  stats: {
    colors: true,
    reasons: true
  },
  progress: true
}
