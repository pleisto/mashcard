import { renderHook } from '@testing-library/react-hooks'
import Paragraph from '@tiptap/extension-paragraph'
import { useTestEditor } from '../../test/testEditor'
import { findFirstSelectedNodes, findNodesInSelection } from '../selection'

describe('selection', () => {
  it('findNodesInSelection', () => {
    const { result } = renderHook(() => useTestEditor({}))

    const editor = result.current

    const range = findNodesInSelection(editor!, 0, 1)

    expect(range[0].node.type.name).toBe(Paragraph.name)
  })

  it('findFirstSelectedNodes', () => {
    const { result } = renderHook(() => useTestEditor({}))

    const editor = result.current

    const { nodeKey } = findFirstSelectedNodes(editor!)

    expect(nodeKey).toEqual(Paragraph.name)
  })
})
