const path = require('path')
const { webpackConfig, merge } = require('@brickdoc/webpacker')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const DistAssetResolvePlugin = require('./DistAssetResolvePlugin')

console.log(
  `Webpack entrypoints:\n${Object.values(webpackConfig.entry)
    .map(file => `  ${path.relative(path.resolve(__dirname, '../..'), file)}`)
    .join('\n')}\n`
)

// Use ts-loader for TypeScript files
webpackConfig.module.rules
  .find(x => x.test.toString().includes('jsx'))
  .use.push({ loader: 'ts-loader', options: { transpileOnly: true, projectReferences: true, configFile: 'tsconfig.build.json' } })

module.exports = merge(webpackConfig, {
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../../tsconfig.build.json') }), new DistAssetResolvePlugin()]
  }
})
