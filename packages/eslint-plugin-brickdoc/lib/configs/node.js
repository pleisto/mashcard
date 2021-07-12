const path = require('path')

module.exports = {
  extends: [path.join(__dirname, 'base')],
  plugins: ['node', 'security-node'],
  rules: {
    'no-console': 'off',
    'node/no-deprecated-api': 'error',
    'node/shebang': 'warn',
    'security-node/non-literal-reg-expr': 'warn',
    'security-node/detect-child-process': 'warn',
    'security-node/detect-buffer-unsafe-allocation': 'warn',
    'security-node/detect-eval-with-expr': 'warn'
  },
  env: {
    browser: false,
    node: true
  }
}
