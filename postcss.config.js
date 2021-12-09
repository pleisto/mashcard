module.exports = {
  plugins: [require('postcss-will-change'), require('postcss-preset-env')({ stage: 1 })],
  syntax: require('postcss-less')
}
