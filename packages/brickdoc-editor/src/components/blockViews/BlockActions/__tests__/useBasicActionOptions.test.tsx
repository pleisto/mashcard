import { renderHook } from '@testing-library/react-hooks'
import { mockEditor } from '../../../../test'
import { ToolbarItemOption, ToolbarSubMenuOption } from '../../../ui'
import { UseActionOptionsProps, useBasicActionOptions } from '../useBasicActionOptions'

jest.mock('../../../../hooks/useDocumentEditable.ts', () => ({
  useDocumentEditable: () => [true]
}))

jest.mock('../../../../hooks/useEditorContext.ts', () => ({
  useEditorContext: () => ({
    t: (k: string) => k,
    editor: mockEditor()
  })
}))

jest.mock('../../../../hooks/useBlockContext.ts', () => ({
  useBlockContext: () => ({
    deleteBlock() {},
    duplicateBlock() {},
    moveBlock() {},
    copyContent() {},
    getPosition() {
      return 1
    },
    updateDraggingStatus() {},
    dragging: false,
    node: {
      textContent: 'text'
    }
  })
}))

describe('useBasicActionOptions', () => {
  it('returns null when no types specified', () => {
    const { result } = renderHook(() => useBasicActionOptions({ types: [] }))
    expect(result.current).toBeNull()
  })

  it('returns options according to types', () => {
    const types: UseActionOptionsProps['types'] = ['copy', 'delete', 'duplicate', 'move', 'transform']
    const { result } = renderHook(() => useBasicActionOptions({ types }))

    expect(result.current?.items.length).toBe(types.length)
  })

  it('clicks transform option will trigger action correctly', () => {
    const types: UseActionOptionsProps['types'] = ['transform']
    const { result } = renderHook(() => useBasicActionOptions({ types }))

    expect(() =>
      ((result.current?.items[0] as ToolbarSubMenuOption).items as ToolbarItemOption[])[0].onAction!('')
    ).not.toThrow()
  })
})
