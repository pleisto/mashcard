module.exports = {
  ...require('../../tools/jest').baseConfig(false),
  setupFiles: ['@brickdoc/dotenv/src/config.ts'],
  globalSetup: './jest.global-setup.ts'
}
