process.env.NODE_ENV = process.env.NODE_ENV || 'production'
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const webpackConfig = require('./base')

// gzip compression already enabled on CDN
webpackConfig.plugins = webpackConfig.plugins.filter(x => x.constructor.name !== 'CompressionPlugin')
delete webpackConfig.devtool
if (process.env.BUNDLE_ANALYZER) webpackConfig.plugins.push(new BundleAnalyzerPlugin())

module.exports = webpackConfig
