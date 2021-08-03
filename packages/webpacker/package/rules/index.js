/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const rules = {
  raw: require('./raw'),
  file: require('./file'),
  css: require('./css'),
  babel: require('./babel'),
  less: require('./less')
}

module.exports = Object.keys(rules)
  .filter(key => !!rules[key])
  .map(key => rules[key])
