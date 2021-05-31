const { webpackConfig, merge } = require("@rails/webpacker")
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const WebpackAssetsManifest = require('webpack-assets-manifest')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// Less Options
webpackConfig.module.rules.find(x => x.test.toString().includes("less"))
  .use[3].options.lessOptions = { javascriptEnabled: true }

// Reconfigure WebpackAssetsManifest to Fix https://github.com/rails/webpacker/issues/2864
webpackConfig.plugins = webpackConfig.plugins.filter(x=> x.constructor.name !== 'WebpackAssetsManifest' )

module.exports = merge(webpackConfig, {
  plugins: [
    new ForkTSCheckerWebpackPlugin({async: false}),
    new WebpackAssetsManifest({
      enabled: true,
      entrypoints: true,
      writeToDisk: true,
      output: 'manifest.json',
      entrypointsUseAssets: true,
      space: 2,
      publicPath: true
    })
  ],
  resolve: {
    plugins: [    new TsconfigPathsPlugin({})]
  }
})
