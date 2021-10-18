const isCI = require('is-ci')

/**
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 *
 * @type {import('@jest/types').Config.InitialOptions}
 */

const esModules = ['lodash-es'].join('|')

module.exports = {
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  collectCoverage: isCI,
  // Jest will map files in `dist` back into their source via source maps.
  collectCoverageFrom: ['**/dist/**/*.js', '!**/@(node_modules|__tests__)/**', '!**/*.@(spec|test).js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  timers: 'fake',
  testMatch: ['**/dist/**/__tests__/**/*.(js|jsx)', '**/dist/**/*.@(spec|test).(js|jsx)'],
  snapshotResolver: './jest.snapshot-resolver.js',
  reporters: isCI
    ? ['default', ['jest-junit', { outputDirectory: 'junit-reports', outputName: 'jest.xml', suiteName: 'jest' }]]
    : ['default'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
}
