const path = require('path')
const env = require('process')
/**
 * Append swc-loader
 */
const babelLoaderPattern = /babel-loader/
const createSwcLoader = () => {
  return {
    loader: require.resolve('swc-loader'),
    options: {
      parseMap: !(env.NODE_ENV === 'production'),
      isModule: 'unknown',
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true
        },
        transform: {
          react: {
            runtime: 'automatic'
          }
        },
        externalHelpers: false
      }
    }
  }
}

const replaceRuleSetRule = rule1 => {
  if (!('test' in rule1 && rule1.test instanceof RegExp)) return rule1
  if (!rule1.test.test('dummy.js') && !rule1.test.test('dummy.ts')) return rule1
  if (rule1.oneOf) {
    return {
      ...rule1,
      oneOf: rule1.oneOf.map(rule => replaceRuleSetRule(rule, options))
    }
  }
  if (rule1.loader) {
    if (!babelLoaderPattern.test(rule1.loader)) return rule1
    return {
      ...rule1,
      loader: undefined,
      use: [createSwcLoader()]
    }
  }
  if (typeof rule1.use === 'string') {
    if (!babelLoaderPattern.test(rule1.use)) return rule1
    return {
      ...rule1,
      use: [createSwcLoader()]
    }
  }
  if (Array.isArray(rule1.use)) {
    return {
      ...rule1,
      use: rule1.use.map(item => {
        if (typeof item === 'string' && item.includes('babel-loader')) {
          return createSwcLoader()
        }
        if (typeof item.loader === 'string' && babelLoaderPattern.test(item.loader)) {
          return createSwcLoader()
        }
        return item
      })
    }
  }
  return rule1
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-addon-designs', '@storybook/addon-a11y'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async config => {
    config.module = {
      ...config.module,
      rules: config.module?.rules?.map(rule => replaceRuleSetRule(rule))
    }
    return config
  }
}
