import { render } from '@testing-library/react'
import { DividerBlock } from '../DividerBlock'

describe('DividerBlock', () => {
  const uuid = 'uuid'
  const props: any = {
    editor: {},
    node: {
      attrs: {
        uuid
      }
    },
    extension: {},
    updateAttributes: () => {}
  }
  it(`matches snapshot correctly`, () => {
    const { container } = render(<DividerBlock {...(props as any)} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
