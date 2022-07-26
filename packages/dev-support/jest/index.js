const { resolve } = require('node:path')
const os = require('node:os')
const fs = require('node:fs')
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

const monoRoot = resolve(__dirname, '../../..')
const swcConfig = JSON.parse(fs.readFileSync(`${monoRoot}/.swcrc`, 'utf-8'))

module.exports = {
  esModules,
  baseConfig: hasDom => ({
    passWithNoTests: true,
    // More than 24 workers on HEDT CPUs will slow down the tests
    maxWorkers: Math.min(os.cpus().length - 1, 24),
    testEnvironmentOptions: {
      url: 'http://localhost'
    },
    testEnvironment: hasDom ? 'jsdom' : 'node',
    transform: {
      '^.+\\.(t|j)sx?$': ['@swc/jest', swcConfig]
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
          '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
          '\\.(mp4|png|webp|gif|svg)$': resolve(__dirname, 'image-mock.js')
        }
      : {},
    setupFilesAfterEnv: hasDom ? [resolve(__dirname, 'dom.js')] : [],
    fakeTimers: {
      enableGlobally: true
    },
    testMatch: ['**/**/__tests__/**/*.(ts|tsx)', '**/**/*.@(spec|test).(ts|tsx)', '!**/dist/**'],
    snapshotResolver: resolve(__dirname, 'snapshot-resolver.js'),
    reporters: ['default', 'github-actions'],
    transformIgnorePatterns: [`${monoRoot}/node_modules/(?!(${esModules})/)`]
  })
}
