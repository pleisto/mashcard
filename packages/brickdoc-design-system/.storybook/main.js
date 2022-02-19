const path = require('path')
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
    '@storybook/addon-a11y',
    '@pxblue/storybook-rtl-addon/register'
  ],
  framework: '@storybook/react',
  core: {
    builder: 'storybook-builder-vite'
  },
  async viteFinal(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/styled': path.resolve(path.join(__dirname, '../../../node_modules/@emotion/styled')),
      '@emotion/core': path.resolve(path.join(__dirname, '../../../node_modules/@emotion/core'))
    }
    return config
  }
}
