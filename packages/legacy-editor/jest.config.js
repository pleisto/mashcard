const baseConfig = require('@mashcard/dev-support/jest').baseConfig(true)

module.exports = {
  ...baseConfig,
  collectCoverageFrom: [...baseConfig.collectCoverageFrom, '!**/src/**/index.(ts|tsx)']
}
