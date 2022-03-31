import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { Toc } from '../toc'

describe('Toc', () => {
  it('renders Toc correctly', () => {
    const content = `
    <toc></toc>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[Toc]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setTocBlock correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Toc]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.setTocBlock(position)

    expect(editor?.state.doc.nodeAt(position)?.type.name).toBe(Toc.name)
  })
})
