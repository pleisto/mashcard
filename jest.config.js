/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  timers: 'fake',
  testMatch: ['**/dist/**/__tests__/**/*.js', '**/dist/**/?(*.)+(spec|test).js'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'junit-reports', outputName: 'jest.xml', suiteName: 'jest' }]]
}
