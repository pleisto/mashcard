import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { Paragraph } from '../paragraph'

describe('Paragraph', () => {
  it('renders Paragraph correctly', () => {
    const content = `
    <p>paragraph</p>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[Paragraph]} />)

    expect(container).toMatchSnapshot()
  })
})
