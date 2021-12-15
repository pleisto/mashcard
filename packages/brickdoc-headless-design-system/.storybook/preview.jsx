import { globalStyle } from '../src/themes'
import { addDecorator } from '@storybook/react'
import { withPerformance } from 'storybook-addon-performance'

addDecorator(withPerformance)

export const parameters = {
  viewMode: 'docs',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    storySort: {
      order: ['Docs', ['Introduction', 'Design Token'], 'Components', ['*', 'Utils'], 'Brickdoc Components']
    }
  },
  backgrounds: {
    values: [
      {
        name: 'Ceramic Primary',
        value: 'var(--brd-colors-ceramicPrimary)'
      },
      {
        name: 'Ceramic Secondary',
        value: 'var(--brd-colors-ceramicSecondary)'
      },
      {
        name: 'Ceramic Thirdary',
        value: 'var(--brd-colors-ceramicThirdary)'
      },
      {
        name: 'Ceramic Quaternary',
        value: 'var(--brd-colors-ceramicQuaternary)'
      }
    ]
  }
}
export const decorators = [
  Story => {
    globalStyle()
    return <Story />
  }
]
