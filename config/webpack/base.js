const { webpackConfig, merge } = require("@rails/webpacker")
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const WebpackAssetsManifest = require('webpack-assets-manifest');

// Less Options
webpackConfig.module.rules.find(x => x.test.toString().includes("less"))
  .use[3].options.lessOptions = { javascriptEnabled: true }

// Reconfigure WebpackAssetsManifest to Fix https://github.com/rails/webpacker/issues/2864
webpackConfig.plugins = webpackConfig.plugins.filter(x=> x.constructor.name !== 'WebpackAssetsManifest' )

module.exports = merge(webpackConfig, {
  plugins: [
    new ForkTSCheckerWebpackPlugin(),
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
