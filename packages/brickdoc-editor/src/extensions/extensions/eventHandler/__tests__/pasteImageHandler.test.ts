import { renderHook } from '@testing-library/react-hooks'
import { useTestEditor } from '../../../../test/testEditor'
import { Embed } from '../../../blocks'
import { EventHandler } from '../eventHandler'
import { pasteImageHandler } from '../pasteImageHandler'

describe('pasteImageHandler', () => {
  it('creates image blocks when paste images', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Embed, EventHandler]
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
})
