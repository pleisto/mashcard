import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { Heading } from '../heading'

describe('Heading', () => {
  it('renders Heading correctly', () => {
    const content = `
    <h1>h1</h1>
    <h2>h2</h2>
    <h3>h3</h3>
    <h4>h4</h4>
    <h5>h5</h5>
    `
    const { container } = render(
      <TestEditorContent
        content={content}
        extensions={[
          Heading.extend({
            // exclude other marks, keep test simple
            marks: ''
          })
        ]}
      />
    )

    expect(container).toMatchSnapshot()
  })
})
