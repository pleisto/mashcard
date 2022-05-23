import { renderHook } from '@testing-library/react-hooks'
import * as editorContextHook from '../../../../hooks/useEditorContext'
import * as editorPropsHook from '../../../../hooks/useEditorPropsContext'
import * as selectionHelpers from '../../../../helpers/selection'
import { useNodeGroup } from '../useBubbleMenuItems/useNodeGroup'
import { mockEditor } from '../../../../test/editor'
import { ToolbarGroupOption, ToolbarItemGroupOption, ToolbarItemOption, ToolbarSubMenuOption } from '../../../ui'
import { useTextStyleGroup } from '../useBubbleMenuItems/useTextStyleGroup'
import { useLinkGroup } from '../useBubbleMenuItems/useLinkGroup'
import { useFontColorGroup } from '../useBubbleMenuItems/useFontColorGroup'
import { useFormulaItem } from '../useBubbleMenuItems/useFormulaItem'
import { useExtraItemsGroup } from '../useBubbleMenuItems/useExtraItemsGroup'
import { useBubbleMenuItems } from '../useBubbleMenuItems'
import { EditorPropsContext } from '../../../../context'

describe('useBubbleMenuItems', () => {
  it('gets menu items correctly', () => {
    const editor = mockEditor({
      state: {
        selection: {
          from: 1,
          to: 10
        }
      },
      isActive: () => false
    })
    jest.spyOn(selectionHelpers, 'findFirstSelectedNodes').mockImplementation(() => ({
      node: undefined,
      nodeKey: ''
    }))
    jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
      editor,
      documentEditable: true
    }))
    const { result } = renderHook(() => useBubbleMenuItems())
    const items = result.current[0]

    expect(items.length).toBeGreaterThan(0)
  })

  describe('Node Group', () => {
    it('triggers item action correctly', () => {
      const mockSetTextSelection = jest.fn()
      const editor = mockEditor({
        commands: {
          setTextSelection: mockSetTextSelection
        },
        state: {
          selection: {
            to: 10
          }
        }
      })
      jest.spyOn(selectionHelpers, 'findFirstSelectedNodes').mockImplementation(() => ({
        node: undefined,
        nodeKey: ''
      }))
      jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      const { result } = renderHook(() => useNodeGroup())
      const item = (
        ((result.current[0] as ToolbarGroupOption).items[0] as ToolbarSubMenuOption).items as ToolbarItemGroupOption[]
      )[0].items[0]

      item.onAction?.('')

      expect(mockSetTextSelection).toBeCalledWith(editor.state.selection.to)
    })
  })

  describe('Font Color Group', () => {
    it('triggers item action correctly', () => {
      const mockSetFontColor = jest.fn()

      const editor = mockEditor({
        commands: {
          setFontColor: mockSetFontColor
        },
        state: {
          selection: {
            from: 1,
            to: 10
          }
        }
      })
      jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      const { result } = renderHook(() => useFontColorGroup())
      const items = ((result.current[0] as ToolbarGroupOption).items[0] as ToolbarSubMenuOption)
        .items as ToolbarItemOption[]

      items[0].onAction?.('')

      expect(mockSetFontColor).toBeCalled()
    })
  })

  describe('Formula Item', () => {
    it('triggers item action correctly', () => {
      const mockToggleFormula = jest.fn()

      const editor = mockEditor({
        commands: {
          toggleFormula: mockToggleFormula
        },
        state: {
          selection: {
            from: 1,
            to: 10
          }
        }
      })
      jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      const { result } = renderHook(() => useFormulaItem())
      const item = result.current[0] as ToolbarItemOption

      item.onAction?.('')

      expect(mockToggleFormula).toBeCalled()
    })
  })

  describe('Text Style Group', () => {
    it('triggers item action correctly', () => {
      const mockToggleBold = jest.fn()
      const mockToggleItalic = jest.fn()
      const mockToggleUnderline = jest.fn()
      const mockToggleStrike = jest.fn()

      const editor = mockEditor({
        commands: {
          toggleBold: mockToggleBold,
          toggleItalic: mockToggleItalic,
          toggleUnderline: mockToggleUnderline,
          toggleStrike: mockToggleStrike
        },
        state: {
          selection: {
            from: 1,
            to: 10
          }
        }
      })
      jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      const { result } = renderHook(() => useTextStyleGroup())
      const items = (result.current[0] as ToolbarGroupOption).items

      items.forEach(item => item.onAction?.(''))

      expect(mockToggleBold).toBeCalled()
      expect(mockToggleItalic).toBeCalled()
      expect(mockToggleStrike).toBeCalled()
      expect(mockToggleUnderline).toBeCalled()
    })
  })

  describe('Link Group', () => {
    it('adds link correctly', () => {
      const mockSetLink = jest.fn()
      const link = 'https://brickdoc.com'

      const editor = mockEditor({
        commands: {
          setLink: mockSetLink
        },
        getAttributes: () => ({
          href: link
        }),
        state: {
          selection: {
            from: 1,
            to: 10
          }
        }
      })
      jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      const { result } = renderHook(() => useLinkGroup())
      const items = ((result.current[0] as ToolbarGroupOption).items[0] as ToolbarSubMenuOption)
        .items as ToolbarItemOption[]

      // confirm
      items[1].onAction?.('')

      expect(mockSetLink).toBeCalledWith({ href: link })
    })

    it('copies link normally', () => {
      const link = 'https://brickdoc.com'
      const mockCopy = jest.fn()
      jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(content => mockCopy(content))

      const editor = mockEditor({
        getAttributes: () => ({
          href: link
        }),
        state: {
          selection: {
            from: 1,
            to: 10
          }
        }
      })
      jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      const { result } = renderHook(() => useLinkGroup())
      const items = ((result.current[0] as ToolbarGroupOption).items[0] as ToolbarSubMenuOption)
        .items as ToolbarItemOption[]

      // copy
      items[2].onAction?.('')

      expect(mockCopy).toBeCalledWith(link)
    })

    it('removes link normally', () => {
      const mockUnsetLink = jest.fn()
      const link = 'https://brickdoc.com'

      const editor = mockEditor({
        commands: {
          unsetLink: mockUnsetLink
        },
        getAttributes: () => ({
          href: link
        }),
        state: {
          selection: {
            from: 1,
            to: 10
          }
        }
      })
      jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      const { result } = renderHook(() => useLinkGroup())
      const items = ((result.current[0] as ToolbarGroupOption).items[0] as ToolbarSubMenuOption)
        .items as ToolbarItemOption[]

      // delete
      items[3].onAction?.('')

      expect(mockUnsetLink).toBeCalled()
    })
  })

  describe('Extra Items Group', () => {
    it('adds discussion correctly', () => {
      const mockSetDiscussion = jest.fn()
      const editor = mockEditor({
        commands: {
          setDiscussion: mockSetDiscussion
        },
        state: {
          selection: {
            from: 1,
            to: 10
          }
        }
      })
      jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      const editorProps = { ...EditorPropsContext }
      editorProps.featureFlags = {
        experiment_discussion: true
      }
      jest.spyOn(editorPropsHook, 'useEditorPropsContext').mockImplementation(() => editorProps)
      const { result } = renderHook(() => useExtraItemsGroup())
      const items = (result.current[0] as ToolbarGroupOption).items

      items[0].onAction?.('')

      expect(mockSetDiscussion).toBeCalled()
    })

    it('adds anchor correctly', () => {
      const mockSetAnchor = jest.fn()
      const editor = mockEditor({
        commands: {
          setAnchor: mockSetAnchor
        },
        isActive: () => false,
        state: {
          selection: {
            from: 1,
            to: 10
          }
        }
      })
      jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      const editorProps = { ...EditorPropsContext }
      editorProps.featureFlags = {
        experiment_discussion: true
      }
      jest.spyOn(editorPropsHook, 'useEditorPropsContext').mockImplementation(() => editorProps)
      const { result } = renderHook(() => useExtraItemsGroup())
      const items = ((result.current[0] as ToolbarGroupOption).items[1] as ToolbarSubMenuOption)
        .items as ToolbarItemOption[]

      items[0].onAction?.('')

      expect(mockSetAnchor).toBeCalled()
    })

    it('removes anchor correctly', () => {
      const mockUnsetAnchor = jest.fn()
      const editor = mockEditor({
        commands: {
          unsetAnchor: mockUnsetAnchor
        },
        isActive: (type: string) => type === 'anchor',
        state: {
          selection: {
            from: 1,
            to: 10
          }
        }
      })
      jest.spyOn(editorContextHook, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      const editorProps = { ...EditorPropsContext }
      editorProps.featureFlags = {
        experiment_discussion: true
      }
      jest.spyOn(editorPropsHook, 'useEditorPropsContext').mockImplementation(() => editorProps)
      const { result } = renderHook(() => useExtraItemsGroup())
      const items = ((result.current[0] as ToolbarGroupOption).items[1] as ToolbarSubMenuOption)
        .items as ToolbarItemOption[]

      items[0].onAction?.('')

      expect(mockUnsetAnchor).toBeCalled()
    })
  })
})
