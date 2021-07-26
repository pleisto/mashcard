const path = require('path')
const { ProgressPlugin } = require('webpack')
const { webpackConfig, merge } = require('@rails/webpacker')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const DistAssetResolvePlugin = require('./DistAssetResolvePlugin')

Object.keys(webpackConfig.entry).forEach(entry => {
  webpackConfig.entry[entry] = webpackConfig.entry[entry].filter(file => file.endsWith('.js'))
})

// Less Options
webpackConfig.module.rules.find(x => x.test.toString().includes('less')).use[3].options.lessOptions = { javascriptEnabled: true }

// Reconfigure WebpackAssetsManifest to Fix https://github.com/rails/webpacker/issues/2864
webpackConfig.plugins = webpackConfig.plugins.filter(x => x.constructor.name !== 'WebpackAssetsManifest')

module.exports = merge(webpackConfig, {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../dist/frontends')
    },
    plugins: [new DistAssetResolvePlugin()]
  },
  plugins: [
    new ProgressPlugin(),
    new WebpackAssetsManifest({
      enabled: true,
      entrypoints: true,
      writeToDisk: true,
      output: 'manifest.json',
      entrypointsUseAssets: true,
      space: 2,
      publicPath: true
    })
  ]
})
