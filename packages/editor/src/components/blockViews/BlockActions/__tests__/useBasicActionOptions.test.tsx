import { renderHook } from '@testing-library/react-hooks'
import { NodeSelection } from 'prosemirror-state'
import * as prosemirrorView from 'prosemirror-view'
import { mockEditor } from '../../../../test'
import { ToolbarItemOption, ToolbarSubMenuOption, ToolbarItemGroupOption } from '../../../ui'
import * as editorHooks from '../../../../hooks/useEditorContext'
import * as blockHooks from '../../../../hooks/useBlockContext'
import { UseActionOptionsProps, useBasicActionOptions } from '../useBasicActionOptions'

jest.mock('../../../../hooks/useDocumentEditable.ts', () => ({
  useDocumentEditable: () => [true]
}))

describe('useBasicActionOptions', () => {
  it('returns null when no types specified', () => {
    const { result } = renderHook(() => useBasicActionOptions({ types: [] }))
    expect(result.current).toBeNull()
  })

  it('returns options according to types', () => {
    jest.spyOn(blockHooks, 'useBlockContext').mockImplementation(() => ({
      deleteBlock() {},
      getPosition() {
        return 1
      },
      updateDraggingStatus() {},
      dragging: false,
      node: {
        textContent: 'text'
      } as any
    }))
    const types: UseActionOptionsProps['types'] = ['copy', 'delete', 'cut', 'transform']
    const { result } = renderHook(() => useBasicActionOptions({ types }))

    expect(result.current?.items.length).toBe(types.length)
  })

  it('triggers cuts normally if editor is empty', async () => {
    jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
      editor: null,
      documentEditable: true
    }))
    const mockDelete = jest.fn()
    jest.spyOn(blockHooks, 'useBlockContext').mockImplementation(() => ({
      deleteBlock: mockDelete,
      getPosition() {
        return 1
      },
      updateDraggingStatus() {},
      dragging: false,
      node: {} as any
    }))

    const types: UseActionOptionsProps['types'] = ['cut']
    const { result } = renderHook(() => useBasicActionOptions({ types }))

    await (result.current?.items[0] as ToolbarItemOption).onAction!('')

    expect(mockDelete).not.toBeCalled()
  })

  it('cuts block to clipboard correctly', async () => {
    Object.assign(window, {
      ClipboardItem: jest.fn()
    })
    Object.assign(navigator.clipboard, {
      write: jest.fn()
    })
    jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
      editor: mockEditor({
        state: {
          selection: {
            content: () => ({})
          }
        },
        view: {
          state: {
            tr: {
              setSelection: () => ({})
            }
          }
        }
      }),
      documentEditable: true
    }))
    jest.spyOn(NodeSelection, 'create').mockImplementation(() => ({} as any))
    const mockDelete = jest.fn()
    jest.spyOn(blockHooks, 'useBlockContext').mockImplementation(() => ({
      deleteBlock: mockDelete,
      getPosition() {
        return 1
      },
      updateDraggingStatus() {},
      dragging: false,
      node: {} as any
    }))

    const text = 'text'
    const dom = document.createElement('div')
    dom.innerHTML = text
    jest.spyOn(prosemirrorView, '__serializeForClipboard').mockImplementation(() => ({
      dom,
      text
    }))

    const types: UseActionOptionsProps['types'] = ['cut']
    const { result } = renderHook(() => useBasicActionOptions({ types }))

    await (result.current?.items[0] as ToolbarItemOption).onAction!('')

    expect(mockDelete).toBeCalled()
  })

  it('clicks transform option will trigger action correctly', () => {
    jest.spyOn(blockHooks, 'useBlockContext').mockImplementation(() => ({
      deleteBlock() {},
      getPosition() {
        return 1
      },
      updateDraggingStatus() {},
      dragging: false,
      node: {
        textContent: 'text'
      } as any
    }))
    jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
      editor: mockEditor({
        state: {
          selection: {
            content: () => ({})
          }
        },
        view: {
          state: {
            tr: {
              setSelection: () => ({})
            }
          }
        }
      }),
      documentEditable: true
    }))
    jest.spyOn(NodeSelection, 'create').mockImplementation(() => ({} as any))
    const types: UseActionOptionsProps['types'] = ['transform']
    const { result } = renderHook(() => useBasicActionOptions({ types }))

    expect(() =>
      ((result.current?.items[0] as ToolbarSubMenuOption).items as ToolbarItemGroupOption[])[0].items[0].onAction!('')
    ).not.toThrow()
  })

  it('triggers transform normally if editor is empty', () => {
    jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
      editor: null,
      documentEditable: true
    }))

    const types: UseActionOptionsProps['types'] = ['transform']
    const { result } = renderHook(() => useBasicActionOptions({ types }))

    expect(() =>
      ((result.current?.items[0] as ToolbarSubMenuOption).items as ToolbarItemGroupOption[])[0].items[0].onAction!('')
    ).not.toThrow()
  })
})
