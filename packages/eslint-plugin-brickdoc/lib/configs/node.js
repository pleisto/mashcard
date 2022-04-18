const path = require('path')

module.exports = {
  extends: [path.join(__dirname, 'base')],
  plugins: ['node', 'security-node', 'sql'],
  rules: {
    'no-console': 'off',
    'node/no-deprecated-api': 'error',
    'node/shebang': 'warn',
    'security-node/non-literal-reg-expr': 'warn',
    'security-node/detect-child-process': 'warn',
    'security-node/detect-buffer-unsafe-allocation': 'warn',
    'security-node/detect-eval-with-expr': 'warn',
    'sql/format': 'off',
    'sql/no-unsafe-query': [
      2,
      {
        allowLiteral: false
      }
    ]
  },
  env: {
    browser: false,
    node: true
  }
}
