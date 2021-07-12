process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { merge } = require('@rails/webpacker')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const webpackConfig = require('./base')

webpackConfig.module.rules.find(x => x.test.toString().includes('jsx')).use[0].options.plugins = [require.resolve('react-refresh/babel')]

module.exports = merge(webpackConfig, {
  cache: {
    type: 'filesystem'
  },
  plugins: [new BundleAnalyzerPlugin(), new ReactRefreshWebpackPlugin()]
})
