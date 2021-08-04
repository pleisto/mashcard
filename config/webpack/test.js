process.env.NODE_ENV = process.env.NODE_ENV || 'test'

const { merge } = require('@brickdoc/webpacker')

const webpackConfig = require('./base')

const mergedConfig = merge(webpackConfig, {
  devtool: 'source-map'
})

module.exports = mergedConfig
