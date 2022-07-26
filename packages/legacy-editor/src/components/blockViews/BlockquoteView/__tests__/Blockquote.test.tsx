import { render } from '@testing-library/react'
import { BlockquoteOptions } from '@tiptap/extension-blockquote'
import { BlockquoteAttributes } from '../../../../extensions'
import { mockBlockViewProps } from '../../../../test'
import { BlockquoteView } from '../BlockquoteView'

describe('BlockquoteView', () => {
  it(`renders blockquote correctly`, () => {
    const props = mockBlockViewProps<BlockquoteOptions, BlockquoteAttributes>({
      node: {
        textContent: 'text content'
      }
    })
    const { container } = render(<BlockquoteView {...props} />)

    expect(container).toMatchSnapshot()
  })
})
