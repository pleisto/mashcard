import { renderHook } from '@testing-library/react'
import { mockEditor } from '../../../../test'
import { ToolbarGroupOption } from '../../../ui'
import { BlockActionsMenuProps } from '../BlockActionsMenu'
import { useOptions } from '../BlockActionsMenu/useOptions'

jest.mock('../../../../hooks/useDocumentEditable.ts', () => ({
  useDocumentEditable: () => [true]
}))

jest.mock('../../../../hooks/useEditorContext.ts', () => ({
  useEditorContext: () => ({
    editor: mockEditor({
      state: {
        doc: {
          nodeAt() {
            return this
          }
        }
      }
    })
  })
}))

jest.mock('../../../../hooks/useBlockContext.ts', () => ({
  useBlockContext: () => ({
    deleteBlock() {},
    duplicateBlock() {},
    moveBlock() {},
    getPosition() {
      return 1
    },
    updateDraggingStatus() {},
    dragging: false
  })
}))

describe('useBlockActionsMenuOptions', () => {
  it('returns options correctly', () => {
    const extraOptions: BlockActionsMenuProps['extraOptions'] = [
      {
        type: 'item',
        name: 'item',
        label: 'item'
      }
    ]

    const basicOptions: BlockActionsMenuProps['basicOptions'] = {
      type: 'group',
      items: [
        {
          type: 'item',
          name: 'delete',
          label: 'delete'
        }
      ]
    }
    const { result } = renderHook(() => useOptions(extraOptions, basicOptions))
    const [options, blockOptions] = result.current

    expect(options.length).toBe(2)
    expect(blockOptions.length).toBe(1)
  })

  it('clicks block options normally', () => {
    const extraOptions: BlockActionsMenuProps['extraOptions'] = []

    const basicOptions: BlockActionsMenuProps['basicOptions'] = {
      type: 'group',
      items: []
    }
    const { result } = renderHook(() => useOptions(extraOptions, basicOptions))
    const [, blockOptions] = result.current

    expect(() => {
      ;(blockOptions[0] as ToolbarGroupOption).items[0].onAction!('')
    }).not.toThrow()
  })
})
