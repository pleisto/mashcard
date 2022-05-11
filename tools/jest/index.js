const isCI = require('is-ci')
const path = require('path')
const esModules = [
  'lodash-es',
  'refractor',
  'decode-named-character-reference',
  'character-entities',
  'react-dnd',
  'react-dnd-html5-backend',
  '@react-dnd',
  'dnd-core',
  'y-protocols',
  'lib0',
  'uuid',
  '@hookform/resolvers',
  'preact'
].join('|')

const monoRoot = path.join(__dirname, '..', '..')

module.exports = {
  esModules,
  baseConfig: hasDom => ({
    testEnvironmentOptions: {
      url: 'http://localhost'
    },
    testEnvironment: hasDom ? 'jsdom' : 'node',
    transform: {
      '^.+\\.(t|j)sx?$': ['@swc/jest']
    },
    collectCoverage: true,
    collectCoverageFrom: [
      '**/src/**/*.(ts|tsx)',
      '!**/@(node_modules|__tests__)/**',
      '!**/*.@(spec|test).(ts|tsx)',
      '!**/*.d.ts'
    ],
    coverageReporters: ['lcov', 'text-summary'],
    moduleNameMapper: hasDom
      ? {
          '\\.(css|less|scss|sass|mp4)$': 'identity-obj-proxy',
          '\\.(png|webp|gif)$': `${monoRoot}/tools/jest/image-mock.js`
        }
      : {},
    setupFilesAfterEnv: hasDom ? [`${monoRoot}/tools/jest/dom.js`] : [],
    fakeTimers: {
      enableGlobally: hasDom
    },
    testMatch: ['**/**/__tests__/**/*.(ts|tsx)', '**/**/*.@(spec|test).(ts|tsx)', '!**/dist/**'],
    snapshotResolver: hasDom ? `${monoRoot}/tools/jest/snapshot-resolver.js` : undefined,
    reporters: isCI
      ? [
          'default',
          'github-actions',
          ['jest-junit', { outputDirectory: 'junit-reports', outputName: 'jest.xml', suiteName: 'jest' }]
        ]
      : ['default'],
    transformIgnorePatterns: [`${monoRoot}/node_modules/(?!(${esModules})/)`]
  })
}
