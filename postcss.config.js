module.exports = {
  plugins: [
    // stylelint is not compatible with postcss 8
    // require('stylelint')({}),
    require('postcss-preset-env')({
      stage: 1
    })
  ]
}
