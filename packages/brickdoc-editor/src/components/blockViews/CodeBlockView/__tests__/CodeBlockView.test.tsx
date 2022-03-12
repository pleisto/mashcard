import { render } from '@testing-library/react'
import { CodeBlockView } from '../CodeBlockView'

describe('CodeBlockView', () => {
  const uuid = 'uuid'
  const props: any = {
    editor: {},
    node: {
      attrs: {
        uuid,
        language: 'javascript'
      }
    },
    extension: {
      options: {
        refractor: {
          listLanguages() {
            return ['typescript']
          }
        }
      }
    },
    updateAttributes: () => {}
  }
  it(`matches snapshot correctly`, () => {
    const { container } = render(<CodeBlockView {...(props as any)} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
