import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { CodeBlock } from '../codeBlock'

describe('CodeBlock', () => {
  it('renders CodeBlock correctly', () => {
    const content = `
    <pre>
      <code class="language-typescript">
        code content
      </code>
    </pre>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[CodeBlock]} />)

    expect(container).toMatchSnapshot()
  })
})
