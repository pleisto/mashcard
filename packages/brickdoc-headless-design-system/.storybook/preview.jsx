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
      order: ['Docs', ['Introduction', 'Design Token'], 'Components']
    }
  }
}
export const decorators = [
  Story => {
    globalStyle()
    return <Story />
  }
]
