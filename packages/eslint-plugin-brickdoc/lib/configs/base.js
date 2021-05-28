module.exports = {
  extends: [
    'standard-with-typescript',
    'plugin:jest/recommended',
    'prettier'
  ],
  plugins: ['import', 'jest', 'prettier'],
  parserOptions: {
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
  },
  settings: {
    // Some config suggestions copied from https://github.com/alexgorbatchev/eslint-import-resolver-typescript#configuration
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory
        project: process.cwd()
      }
    },
  },
  env: {
    'jest/globals': true,
    browser: true
  },
  ignorePatterns: [
    'coverage',
    'dist',
    'temp',
    'node_modules',
    "**/__snapshots__"
  ],
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    'no-alert': 'error',
    'no-bitwise': 'error',
    'no-var': 'error',
    'no-continue': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'max-classes-per-file': ['error', 1],
    'no-nested-ternary': 'error',
    'no-param-reassign': 'error',
    'func-names': ['error', 'as-needed'],
    radix: ['error', 'always'],
    'no-plusplus': 'error',
    'operator-assignment': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'prefer-destructuring': ['error', { array: false }],
    'max-len': ['error', {
      code: 140,
      tabWidth: 2,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
      ignoreTrailingComments: true,
      ignoreStrings: true
    } ],
    'no-restricted-globals': [
      'error',
      ...['blur', 'close', 'focus', 'length', 'name', 'parent', 'self', 'stop'].map(name => ({
        name,
        message: `"${name}" refers to a DOM global. Did you mean to reference a local value instead?`
      }))
    ]
  }
}
