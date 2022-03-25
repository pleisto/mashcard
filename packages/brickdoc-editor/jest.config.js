const baseConfig = require('../../tools/jest').baseConfig(true)

module.exports = {
  ...baseConfig,
  collectCoverageFrom: [...baseConfig.collectCoverageFrom, '!**/src/**/index.(ts|tsx)']
}
