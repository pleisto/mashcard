import { render } from '@testing-library/react'
import { BlockContainer } from '../'

describe('BlockContainer', () => {
  it(`freezes block when editor isn't editable`, () => {
    const editor: any = { isEditable: false }
    const { container } = render(<BlockContainer editor={editor} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
