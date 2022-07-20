import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { HorizontalRule } from '../horizontalRule'

describe('HorizontalRule', () => {
  it('renders HorizontalRule correctly', () => {
    const content = `
    <hr />
    `

    const { container } = render(<TestEditorContent content={content} extensions={[HorizontalRule]} />)
    expect(container).toMatchSnapshot()
  })
})
