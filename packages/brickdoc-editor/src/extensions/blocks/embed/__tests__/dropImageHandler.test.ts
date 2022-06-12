import { renderHook } from '@testing-library/react-hooks'
import { useTestEditor } from '../../../../test/testEditor'
import { Embed } from '../embed'
import { dropImageHandler } from '../dropImageHandler'

describe('dropImageHandler', () => {
  it('creates image blocks when drop images', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Embed]
      })
    )

    const editor = result.current

    expect(editor?.state.doc.content.childCount).toEqual(1)

    editor!.view.posAtCoords = () => ({
      pos: 0,
      inside: 0
    })

    dropImageHandler(editor!, {
      dataTransfer: {
        files: [new File([], 'image1', { type: 'image/png' })]
      }
    } as any)

    expect(editor?.state.doc.nodeAt(0)?.type.name).toEqual(Embed.name)
  })

  it('does nothing if no files', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Embed]
      })
    )

    const editor = result.current

    dropImageHandler(editor!, {
      dataTransfer: {
        files: []
      }
    } as any)

    expect(editor?.state.doc.content.childCount).toEqual(1)
  })
})
