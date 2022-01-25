import { render } from '@testing-library/react'
import { ParagraphBlock } from '../ParagraphBlock'

describe('ParagraphBlock', () => {
  const uuid = 'uuid'
  const props: any = {
    editor: {
      on() {}
    },
    node: {
      attrs: {
        uuid
      }
    },
    updateAttributes: () => {}
  }
  it(`matches snapshot correctly`, () => {
    const { container } = render(<ParagraphBlock {...(props as any)} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
