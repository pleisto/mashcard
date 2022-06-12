import { render } from '@testing-library/react'
import { ParagraphAttributes, ParagraphOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../../../test'
import { ParagraphView } from '../ParagraphView'

describe('ParagraphView', () => {
  it(`matches snapshot correctly`, () => {
    const props = mockBlockViewProps<ParagraphOptions, ParagraphAttributes>({
      editor: {
        state: {
          selection: {
            anchor: 1,
            $from: {
              depth: 0
            }
          }
        }
      },
      getPos: () => 0
    })
    const { container } = render(<ParagraphView {...props} />)

    expect(container).toMatchSnapshot()
  })
})
