import { globalStyle } from '../src/themes'
import { Provider } from '../src/components/Provider'

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
      order: ['Docs', ['Introduction', 'Design Token'], 'Components', ['*', 'Utils'], 'MashCard Components']
    }
  },
  backgrounds: {
    values: [
      {
        name: 'Ceramic Primary',
        value: 'var(--mc-colors-ceramicPrimary)'
      },
      {
        name: 'Ceramic Secondary',
        value: 'var(--mc-colors-ceramicSecondary)'
      },
      {
        name: 'Ceramic Quaternary',
        value: 'var(--mc-colors-ceramicQuaternary)'
      },
      {
        name: 'White',
        value: 'var(--mc-colors-white)'
      },
      {
        name: 'Black',
        value: 'var(--mc-colors-black)'
      },
      {
        name: 'Ceramic Background',
        value:
          'url(https://s3.brickapis.com/design-system/ceramic.jpg?x-oss-process=image/format,webp) no-repeat fixed center center'
      }
    ]
  }
}
export const decorators = [
  Story => {
    globalStyle()
    return (
      <Provider>
        <Story />
      </Provider>
    )
  }
]
