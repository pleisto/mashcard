import { render } from '@testing-library/react'
import { CodeBlockAttributes, CodeBlockOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../common/tests'
import { CodeBlockView } from '../CodeBlockView'

describe('CodeBlockView', () => {
  const props = mockBlockViewProps<CodeBlockOptions, CodeBlockAttributes>({
    node: {
      attrs: {
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
    }
  })

  it(`matches snapshot correctly`, () => {
    const { container } = render(<CodeBlockView {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
