module.exports = {
  plugins: [
    // stylelint is not compatible with postcss 8
    // require('stylelint')({}),
    require('postcss-will-change'),
    require('postcss-preset-env')({ stage: 1 })
  ],
  syntax: require('postcss-less')
}
