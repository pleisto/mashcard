import { render } from '@testing-library/react'
import { CodeBlockAttributes, CodeBlockOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../common/tests'
import { CodeBlockView } from '../CodeBlockView'

const uuid = 'code block'

describe('CodeBlockView', () => {
  const props = mockBlockViewProps<CodeBlockOptions, CodeBlockAttributes>({
    node: {
      uuid,
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

    expect(container).toMatchSnapshot()
  })
})
