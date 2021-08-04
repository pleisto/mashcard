/**
 * @type {babel.ConfigFunction}
 */
module.exports = api => {
  return {
    presets: [require.resolve('@brickdoc/webpacker/package/babel/preset')],
    plugins: api.env('test') && api.caller(caller => caller?.name === 'babel-loader') ? ['babel-plugin-istanbul'] : []
  }
}
