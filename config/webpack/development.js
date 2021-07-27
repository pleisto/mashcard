process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const { merge } = require('@rails/webpacker')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const PrintChangedFilePlugin = require('./PrintChangedFilePlugin')

const webpackConfig = require('./base')

// Enable React refresh support
webpackConfig.module.rules.find(x => x.test.toString().includes('jsx')).use[0].options.plugins = [require.resolve('react-refresh/babel')]

const mergedConfig = merge(webpackConfig, {
  cache: {
    type: 'filesystem'
  },
  snapshot: {
    buildDependencies: { timestamp: true, hash: true }
  },
  devServer: {
    watchOptions: {
      ignored: ['**/node_modules', '**/packages/*/dist']
    }
  },
  plugins: [new ReactRefreshWebpackPlugin(), new PrintChangedFilePlugin()]
})

module.exports = mergedConfig
