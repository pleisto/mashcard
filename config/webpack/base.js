const path = require('path')
const { ProgressPlugin } = require('webpack')
const { webpackConfig, merge } = require('@rails/webpacker')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const DistAssetResolvePlugin = require('./DistAssetResolvePlugin')

console.log(
  `Webpack entrypoints:\n${Object.values(webpackConfig.entry)
    .map(file => `  ${path.relative(path.resolve(__dirname, '../..'), file)}`)
    .join('\n')}`
)

// Less Options
webpackConfig.module.rules.find(x => x.test.toString().includes('less')).use[3].options.lessOptions = { javascriptEnabled: true }

// Use ts-loader for TypeScript files
webpackConfig.module.rules
  .find(x => x.test.toString().includes('jsx'))
  .use.push({ loader: 'ts-loader', options: { transpileOnly: true, projectReferences: true, configFile: 'tsconfig.build.json' } })

// Use ts-loader for TypeScript files
webpackConfig.module.rules
  .find(x => x.test.toString().includes('jsx'))
  .use.push({ loader: 'ts-loader', options: { transpileOnly: true, projectReferences: true, configFile: 'tsconfig.build.json' } })

module.exports = merge(webpackConfig, {
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../../tsconfig.build.json') }), new DistAssetResolvePlugin()]
  },
  plugins: [new ProgressPlugin()]
})
