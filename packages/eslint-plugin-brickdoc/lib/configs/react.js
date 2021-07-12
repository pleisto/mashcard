const path = require('path')

module.exports = {
  extends: [path.join(__dirname, 'base'), 'plugin:jsx-a11y/recommended'],
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
    'react/jsx-uses-react': 'error',
    'react/react-in-jsx-scope': 'error',
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
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/media-has-caption': 'off'
  },
  overrides: [
    {
      files: ['*.stories.js', '*.stories.jsx', '*.stories.ts', '*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
        ...Object.fromEntries(Object.keys(require('eslint-plugin-jsx-a11y').rules).map(rule => [`jsx-a11y/${rule}`, 'off']))
      }
    }
  ]
}
