import { renderHook } from '@testing-library/react'
import { useTestEditor } from '../../../../test/testEditor'
import { Embed } from '../embed'
import { pasteImageHandler } from '../pasteImageHandler'

describe('pasteImageHandler', () => {
  it('creates image blocks when paste images', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Embed]
      })
    )

    const editor = result.current

    expect(editor?.state.doc.content.childCount).toEqual(1)
    pasteImageHandler(editor!, {
      clipboardData: {
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

    pasteImageHandler(editor!, {
      clipboardData: {
        files: []
      }
    } as any)

    expect(editor?.state.doc.content.childCount).toEqual(1)
  })
})
