const path = require('path')
const { webpackConfig, merge } = require('@rails/webpacker')

const DistAssetResolvePlugin = require('./DistAssetResolvePlugin')

Object.keys(webpackConfig.entry).forEach(entry => {
  webpackConfig.entry[entry] = webpackConfig.entry[entry].filter(file => file.endsWith('.js'))
})

// Less Options
webpackConfig.module.rules.find(x => x.test.toString().includes('less')).use[3].options.lessOptions = { javascriptEnabled: true }

module.exports = merge(webpackConfig, {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../dist/frontends')
    },
    plugins: [new DistAssetResolvePlugin()]
  },
  module: {
    rules: [
      {
        // TODO: exclude default svg loader
        test: /\.svgr$/,
        use: ['@svgr/webpack', 'url-loader']
      }
    ]
  }
})
