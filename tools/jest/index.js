const isCI = require('is-ci')
const path = require('path')
const esModules = ['lodash-es', 'refractor', 'decode-named-character-reference', 'character-entities'].join('|')

const monoRoot = path.join(__dirname, '..', '..')

module.exports = {
  esModules,
  baseConfig: hasDom => ({
    testURL: 'http://localhost',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(t|j)sx?$': ['@swc/jest']
    },
    collectCoverage: true,
    collectCoverageFrom: ['**/src/**/*.(ts|tsx)', '!**/@(node_modules|__tests__)/**', '!**/*.@(spec|test).(ts|tsx)'],
    coverageReporters: ['lcov', 'text-summary'],
    moduleNameMapper: hasDom
      ? {
          '\\.(css|less|scss|sass|mp4)$': 'identity-obj-proxy',
          '\\.(png|webp|gif)$': `${monoRoot}/tools/jest/image-mock.js`
        }
      : {},
    setupFilesAfterEnv: hasDom ? [`${monoRoot}/tools/jest/dom.js`] : [],
    timers: 'fake',
    testMatch: ['**/**/__tests__/**/*.(ts|tsx)', '**/**/*.@(spec|test).(ts|tsx)', '!**/dist/**'],
    snapshotResolver: hasDom ? `${monoRoot}/tools/jest/snapshot-resolver.js` : undefined,
    reporters: isCI
      ? ['default', ['jest-junit', { outputDirectory: 'junit-reports', outputName: 'jest.xml', suiteName: 'jest' }]]
      : ['default'],
    transformIgnorePatterns: [`${monoRoot}/node_modules/(?!(${esModules})/)`]
  })
}
