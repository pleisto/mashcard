import { escape } from '@brickdoc/active-support'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { Image } from '../image'

describe('Image', () => {
  it('renders Image correctly', () => {
    const content = `
    <image-block
      data-image="${escape(JSON.stringify({ type: 'IMAGE' }))}"
    ></image-block>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[Image]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setImageBlock correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Image]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.setImageBlock(position)

    expect(editor?.state.doc.nodeAt(position)?.type.name).toBe(Image.name)
  })
})
