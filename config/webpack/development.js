process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const { merge } = require('@brickdoc/webpacker')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const PrintChangedFilePlugin = require('./PrintChangedFilePlugin')

const webpackConfig = require('./base')

// Enable React refresh support
if (webpackConfig.devServer) {
  webpackConfig.module.rules.find(x => x.test.toString().includes('jsx')).use[0].options.plugins = [require.resolve('react-refresh/babel')]
}

const mergedConfig = merge(
  webpackConfig,
  webpackConfig.devServer
    ? {
        devServer: {
          watchOptions: {
            ignored: ['**/node_modules', '**/dist']
          }
        },
        plugins: [new ReactRefreshWebpackPlugin(), new PrintChangedFilePlugin()]
      }
    : {}
)

module.exports = mergedConfig
