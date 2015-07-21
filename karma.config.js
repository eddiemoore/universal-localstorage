var assign = require('lodash.assign')
var pkg = require('./package.json')
var webpackConfig = require('./webpack.config')
webpackConfig.devtool = 'inline-source-map'

var customLaunchers = {
  sl_ie: {
    base: 'SauceLabs',
    browserName: 'internet explorer'
  },
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox'
  }
}

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
    'karma-sauce-launcher',
    'karma-chai',
    'karma-mocha',
    'karma-sourcemap-loader',
    'karma-spec-reporter',
    'karma-webpack'
  ],

  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome', 'Firefox']
}

if (process.env.CI_NAME === 'codeship') {
  assign(options, {
    sauceLabs: {
      testName: pkg.name
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['dots', 'saucelabs']
  })
}

module.exports = function (config) {
  config.set(options)
}
