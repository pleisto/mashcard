import { renderHook } from '@testing-library/react'
import { useTestEditor } from '../../../../test/testEditor'
import { Embed } from '../../../blocks'
import { EventHandler } from '../eventHandler'
import { gapClickHandler } from '../gapClickHandler'

describe('gapClickHandler', () => {
  it('does not insert new line when click position not at end of the document', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [EventHandler]
      })
    )

    const editor = result.current

    expect(editor?.state.doc.content.childCount).toEqual(1)

    gapClickHandler(editor!, editor!.view, 0, {
      target: {
        classList: {
          contains: () => true
        }
      }
    } as any)

    expect(editor?.state.doc.content.childCount).toEqual(1)
  })

  it('inserts new line when click position at end of the document', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: '<embed-block></embed-block><embed-block></embed-block>',
        extensions: [EventHandler, Embed]
      })
    )

    const editor = result.current

    expect(editor?.state.doc.content.childCount).toEqual(2)

    gapClickHandler(editor!, editor!.view, 2, {
      target: {
        classList: {
          contains: () => true
        }
      }
    } as any)

    expect(editor?.state.doc.content.childCount).toEqual(3)
  })
})
