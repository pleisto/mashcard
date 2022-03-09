const isCI = require('is-ci')

/**
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 *
 * @type {import('@jest/types').Config.InitialOptions}
 */

const esModules = ['lodash-es', 'refractor', 'decode-named-character-reference', 'character-entities'].join('|')

module.exports = {
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  collectCoverage: isCI,
  // Jest will map files in `dist` back into their source via source maps.
  collectCoverageFrom: ['**/src/**/*.(ts|tsx)', '!**/@(node_modules|__tests__)/**', '!**/*.@(spec|test).(ts|tsx)'],
  coverageDirectory: './coverage/jest',
  moduleNameMapper: {
    '\\.(css|less|scss|sass|png|mp4|webp|gif)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  timers: 'fake',
  testMatch: ['**/**/__tests__/**/*.(ts|tsx)', '**/**/*.@(spec|test).(ts|tsx)', '!**/@(dist|e2e-testing)/**'],
  snapshotResolver: './jest.snapshot-resolver.js',
  reporters: isCI
    ? ['default', ['jest-junit', { outputDirectory: 'junit-reports', outputName: 'jest.xml', suiteName: 'jest' }]]
    : ['default'],
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esModules})/)`]
}
