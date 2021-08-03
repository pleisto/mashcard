process.env.NODE_ENV = process.env.NODE_ENV || 'production'
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpackConfig = require('./base')

if (process.env.BUNDLE_ANALYZER) webpackConfig.plugins.push(new BundleAnalyzerPlugin())

module.exports = webpackConfig
