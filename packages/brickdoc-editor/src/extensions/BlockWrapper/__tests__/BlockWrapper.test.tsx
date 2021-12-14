import { render } from '@testing-library/react'
import { BlockWrapper } from '../'

describe('BlockWrapper', () => {
  it(`freezes block when editor isn't editable`, () => {
    const editor: any = { isEditable: false }
    const { container } = render(<BlockWrapper editor={editor} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
