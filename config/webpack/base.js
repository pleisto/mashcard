const path = require('path')
const { webpackConfig, merge } = require('@brickdoc/webpacker')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const DistAssetResolvePlugin = require('./DistAssetResolvePlugin')

console.log(
  `Webpack entrypoints:\n${Object.values(webpackConfig.entry)
    .map(file => `  ${path.relative(path.resolve(__dirname, '../..'), file)}`)
    .join('\n')}\n`
)

const jsRule = webpackConfig.module.rules.find(x => x.test.toString().includes('jsx'))
// Use ts-loader for TypeScript files
webpackConfig.module.rules.push({
  test: /\.tsx?$/,
  use: [
    ...jsRule.use,
    { loader: 'ts-loader', options: { transpileOnly: true, projectReferences: true, configFile: 'tsconfig.build.json' } }
  ]
})
jsRule.test = /\.(js|jsx|mjs)?(\.erb)?$/
// Consume source maps produced by ts-loader during sub-package building (.js.map under packages/*/dist)
jsRule.use.push({
  loader: 'source-map-loader'
})

module.exports = merge(webpackConfig, {
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../../tsconfig.build.json') }), new DistAssetResolvePlugin()]
  }
})
