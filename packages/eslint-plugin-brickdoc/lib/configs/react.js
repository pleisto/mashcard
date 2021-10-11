const path = require('path')

module.exports = {
  extends: ['plugin:jsx-a11y/recommended', 'plugin:react/jsx-runtime', path.join(__dirname, 'base')],
  plugins: ['jsx-a11y', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
        allowBind: false,
        ignoreRefs: true
      }
    ],
    'react/jsx-key': 'error',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/no-did-update-set-state': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unused-prop-types': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-pascal-case': 'error',
    'react/no-children-prop': 'error',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': 'off',
    'react/jsx-no-duplicate-props': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/jsx-no-script-url': 'error',
    'react/self-closing-comp': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/no-deprecated': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/void-dom-elements-no-children': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/style-prop-object': 'error',
    'react/no-namespace': 'warn',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/media-has-caption': 'off'
  },
  overrides: [
    {
      files: ['*Page.tsx'],
      rules: {
        // React.lazy
        'import/no-default-export': 'off'
      }
    }
  ]
}
