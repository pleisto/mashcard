module.exports = {
  extends: ['standard-with-typescript', 'plugin:jest/recommended', 'prettier'],
  plugins: ['import', 'jest'],
  parserOptions: {
    project: ['./tsconfig.json'] // Specify it only for TypeScript files
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
    }
  },
  env: {
    'jest/globals': true,
    browser: true
  },
  ignorePatterns: ['coverage', 'dist', 'temp', 'node_modules', '**/__snapshots__'],
  rules: {
    semi: ['error', 'never'],
    'for-direction': 'error',
    'func-name-matching': ['error', 'always'],
    'getter-return': 'error',
    'grouped-accessor-pairs': 'error',
    'max-depth': ['error', 5],
    'max-nested-callbacks': ['error', 3],
    'max-params': ['error', 4],
    'no-inner-declarations': ['error', 'both'],
    'no-dupe-else-if': 'error',
    'no-duplicate-imports': 'error',
    'no-implicit-coercion': [
      'error',
      {
        allow: ['!!']
      }
    ],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'static-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-field',
          'protected-field',
          'private-field',
          'instance-field',
          'field',
          'constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-method',
          'protected-method',
          'private-method',
          'instance-method',
          'method'
        ]
      }
    ],
    'no-alert': 'error',
    'no-bitwise': 'error',
    'no-var': 'error',
    'no-continue': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    complexity: [
      'error',
      {
        max: 20
      }
    ],
    'max-classes-per-file': ['error', 1],
    'no-nested-ternary': 'error',
    'no-param-reassign': 'error',
    'func-names': ['error', 'as-needed'],
    radix: ['error', 'always'],
    'no-plusplus': 'error',
    'operator-assignment': 'error',
    'prefer-object-spread': 'error',
    'prefer-arrow-callback': 'error',
    'require-yield': 'error',
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: true,
        skipTemplates: true
      }
    ],
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'prefer-destructuring': ['error', { array: false }],
    'max-len': [
      'error',
      {
        code: 140,
        tabWidth: 2,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        ignoreTrailingComments: true,
        ignoreStrings: true
      }
    ],
    'no-restricted-globals': [
      'error',
      ...['blur', 'close', 'focus', 'length', 'name', 'parent', 'self', 'stop'].map(name => ({
        name,
        message: `"${name}" refers to a DOM global. Did you mean to reference a local value instead?`
      }))
    ]
  }
}
