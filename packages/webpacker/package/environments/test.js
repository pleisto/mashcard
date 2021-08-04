const { merge } = require('webpack-merge')

const baseConfig = require('./base')

const testConfig = {
  mode: 'none'
}

module.exports = merge(baseConfig, testConfig)
