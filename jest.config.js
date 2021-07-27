/**
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 *
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  collectCoverage: !!process.env.CI,
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@brickdoc/design-system': '<rootDir>/packages/brickdoc-design-system/dist/components/index.js'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  timers: 'fake',
  testMatch: ['**/dist/**/__tests__/**/*.js', '**/dist/**/?(*.)+(spec|test).js'],
  reporters: process.env.CI
    ? ['default', ['jest-junit', { outputDirectory: 'junit-reports', outputName: 'jest.xml', suiteName: 'jest' }]]
    : ['default']
}
