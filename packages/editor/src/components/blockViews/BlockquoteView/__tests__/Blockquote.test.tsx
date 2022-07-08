import { render } from '@testing-library/react'
import { mockBlockViewProps } from '../../../../test'
import { BlockquoteView } from '../BlockquoteView'

describe('BlockquoteView', () => {
  it(`renders blockquote correctly`, () => {
    const props = mockBlockViewProps<{}, {}>({
      node: {
        textContent: 'text content'
      }
    })
    const { container } = render(<BlockquoteView {...props} />)

    expect(container).toMatchSnapshot()
  })
})
