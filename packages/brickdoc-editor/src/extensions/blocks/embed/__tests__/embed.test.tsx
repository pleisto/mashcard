import { escape } from '@brickdoc/active-support'
import { EmbedType } from '@brickdoc/schema'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { Embed } from '../embed'

describe('Embed', () => {
  it('renders Embed correctly', () => {
    const content = `
    <embed-block
      data-embed-meta="${escape(JSON.stringify({ type: 'EmbedMeta' }))}"
      data-link="${escape(JSON.stringify({ type: 'LINK' }))}"
      data-image="${escape(JSON.stringify({ type: 'IMAGE' }))}"
      data-attachment="${escape(JSON.stringify({ type: 'ATTACHMENT' }))}"
    ></embed-block>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[Embed]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setEmbedBlock correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Embed]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.setEmbedBlock(EmbedType.Upload, undefined, position)

    expect(editor?.state.doc.nodeAt(position)?.type.name).toBe(Embed.name)
  })
})
