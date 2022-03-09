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
  collectCoverage: true,
  collectCoverageFrom: ['**/*.(ts|tsx)', '!**/@(node_modules|__tests__|dist)/**', '!**/*.@(spec|test|d).(ts|tsx)'],
  coverageDirectory: './coverage/jest',
  coverageReporters: ['lcov', 'text-summary'],
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
