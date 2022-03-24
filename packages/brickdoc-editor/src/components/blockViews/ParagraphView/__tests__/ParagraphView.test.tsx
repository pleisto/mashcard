import { render } from '@testing-library/react'
import { ParagraphAttributes, ParagraphOptions } from '../../../../extensions'
import { mockBlockViewProps } from '../../common/tests'
import { ParagraphView } from '../ParagraphView'

describe('ParagraphView', () => {
  it(`matches snapshot correctly`, () => {
    const props = mockBlockViewProps<ParagraphOptions, ParagraphAttributes>({
      editor: {
        state: {
          selection: {
            anchor: 1
          }
        }
      },
      getPos: () => 0
    })
    const { container } = render(<ParagraphView {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it(`shows placeholder normally`, () => {
    const props = mockBlockViewProps<ParagraphOptions, ParagraphAttributes>({
      editor: {
        state: {
          selection: {
            anchor: 1
          }
        }
      },
      getPos: () => 0
    })
    const { container } = render(<ParagraphView {...props} />)

    // expect data-placeholder="placeholder" exist
    expect(container.firstChild).toMatchSnapshot()
  })
})
