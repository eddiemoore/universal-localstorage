var webpackConfig = require('./webpack.config')
webpackConfig.devtool = 'inline-source-map'

var options = {
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['mocha'],

  files: [
    './node_modules/babel-core/browser-polyfill.js',
    'test/**/*.js'
  ],

  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'test/**/*.js': ['webpack', 'sourcemap']
  },

  webpack: webpackConfig,

  webpackMiddleware: {
    // webpack-dev-middleware configuration
    noInfo: true
  },

  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['spec'],

  singleRun: true,
  colors: true,

  plugins: [
    'karma-chrome-launcher',
    'karma-firefox-launcher',
    'karma-chai',
    'karma-mocha',
    'karma-sourcemap-loader',
    'karma-spec-reporter',
    'karma-webpack'
  ],

  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome', 'Firefox']
}

module.exports = function (config) {
  config.set(options)
}
