import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { OrderedList } from '../orderedList'

describe('OrderedList', () => {
  it('renders OrderedList correctly', () => {
    const content = `
    <ol>
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </ol>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[OrderedList]} />)

    expect(container).toMatchSnapshot()
  })
})
