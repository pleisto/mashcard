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
        name: 'Ceramic Quaternary',
        value: 'var(--brd-colors-ceramicQuaternary)'
      },
      {
        name: 'White',
        value: 'var(--brd-colors-white)'
      },
      {
        name: 'Black',
        value: 'var(--brd-colors-black)'
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
