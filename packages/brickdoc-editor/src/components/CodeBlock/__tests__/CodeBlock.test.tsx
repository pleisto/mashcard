import { render } from '@testing-library/react'
import { CodeBlock } from '../CodeBlock'

describe('CodeBlock', () => {
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
        lowlight: {
          listLanguages() {
            return ['typescript']
          }
        }
      }
    },
    updateAttributes: () => {}
  }
  it(`matches snapshot correctly`, () => {
    const { container } = render(<CodeBlock {...(props as any)} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
