module.exports = {
  extends: ['standard-with-typescript', 'plugin:import/typescript', 'plugin:jest/recommended', 'plugin:cypress/recommended', 'prettier'],
  plugins: ['jest', 'import'],
  env: {
    'jest/globals': true,
    'cypress/globals': true,
    browser: true
  },
  rules: {
    'for-direction': 'error',
    'func-name-matching': ['error', 'always'],
    'getter-return': 'error',
    'grouped-accessor-pairs': 'error',
    'max-depth': ['warn', 5],
    'max-nested-callbacks': ['warn', 3],
    'max-params': ['warn', 4],
    'no-inner-declarations': ['error', 'both'],
    'no-dupe-else-if': 'error',
    'no-duplicate-imports': 'error',
    'no-implicit-coercion': [
      'error',
      {
        allow: ['!!']
      }
    ],
    'no-alert': 'error',
    'no-bitwise': 'error',
    'no-var': 'error',
    'no-continue': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    complexity: [
      'warn',
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
    ],
    'import/no-default-export': 'warn'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
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
        ]
      }
    }
  ]
}
