import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { SubPageMenu } from '../subPageMenu'

describe('SubPageMenu', () => {
  it('renders SubPageMenu correctly', () => {
    const content = `
    <sub-page-menu-block></sub-page-menu-block>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[SubPageMenu]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setSubPageMenuBlock correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [SubPageMenu]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.setSubPageMenuBlock(position)

    expect(editor?.state.doc.nodeAt(position)?.type.name).toBe(SubPageMenu.name)
  })
})
