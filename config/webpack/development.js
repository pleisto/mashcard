process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { merge } = require('@rails/webpacker')


const webpackConfig = require('./base')

module.exports = merge(webpackConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})
