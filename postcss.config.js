require('ts-node').register({
  transpileOnly: true,
  transpiler: 'ts-node/transpilers/swc-experimental',
  compilerOptions: { module: 'commonjs' }
})

const { colorPalette } = require('@brickdoc/design-colors/src/index')

module.exports = {
  plugins: [
    // stylelint is not compatible with postcss 8
    // require('stylelint')({}),
    require('postcss-will-change'),
    require('postcss-preset-env')({ stage: 0 }),
    require('postcss-functions')({
      functions: { colorPalette }
    })
  ],
  syntax: require('postcss-less')
}
