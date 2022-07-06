import { renderHook } from '@testing-library/react-hooks'
import { mockEditor, useTestEditor } from '../../../../test'
import { nodeSelectionDecoration, textSelectionDecoration } from '../decorations'
import { Selection } from '../selection'

describe('Selection Decorations', () => {
  describe('TextSelection', () => {
    it('creates null if editor is not editable correctly', () => {
      const editor = mockEditor({
        isEditable: false
      })

      const decorationSet = textSelectionDecoration(
        editor,
        {
          textSelection: {},
          nodeSelection: {}
        },
        editor.state
      )

      expect(decorationSet).toBeNull()
    })

    it('creates null if selection is empty correctly', () => {
      const editor = mockEditor({
        isEditable: true,
        state: {
          selection: {
            empty: true
          }
        }
      })

      const decorationSet = textSelectionDecoration(
        editor,
        {
          textSelection: {},
          nodeSelection: {}
        },
        editor.state
      )

      expect(decorationSet).toBeNull()
    })

    it('creates null if selection is not a TextSelection correctly', () => {
      const editor = mockEditor({
        isEditable: true,
        state: {
          selection: {
            from: 1,
            to: 2
          }
        }
      })

      const decorationSet = textSelectionDecoration(
        editor,
        {
          textSelection: {},
          nodeSelection: {}
        },
        editor.state
      )

      expect(decorationSet).toBeNull()
    })

    it('creates text selection decoration correctly', () => {
      const from = 1
      const to = 2

      // eslint-disable-next-line max-nested-callbacks
      const { result } = renderHook(() =>
        useTestEditor({
          content: '<p>12</p>'
        })
      )
      const editor = result.current!

      editor.commands.setTextSelection({ from, to })

      const decorationSet = textSelectionDecoration(
        editor,
        {
          textSelection: {},
          nodeSelection: {}
        },
        editor.state
      )

      expect(decorationSet?.find(from, to)).toHaveLength(1)
    })
  })

  describe('MultipleNodeSelection', () => {
    it('creates null if editor is not editable correctly', () => {
      const editor = mockEditor({
        isEditable: false
      })

      const decorationSet = nodeSelectionDecoration(
        editor,
        {
          textSelection: {},
          nodeSelection: {}
        },
        editor.state
      )

      expect(decorationSet).toBeNull()
    })

    it('creates null if selection is not a MultipleNodeSelection correctly', () => {
      const editor = mockEditor({
        isEditable: true,
        state: {
          selection: {
            from: 1,
            to: 2
          }
        }
      })

      const decorationSet = nodeSelectionDecoration(
        editor,
        {
          textSelection: {},
          nodeSelection: {}
        },
        editor.state
      )

      expect(decorationSet).toBeNull()
    })

    it('creates node selection decoration correctly', () => {
      const from = 1
      const to = 2

      // eslint-disable-next-line max-nested-callbacks
      const { result } = renderHook(() =>
        useTestEditor({
          content: '<p>12</p>',
          extensions: [Selection]
        })
      )
      const editor = result.current!

      editor.commands.setMultipleNodeSelection(from, to)

      const decorationSet = nodeSelectionDecoration(
        editor,
        {
          textSelection: {},
          nodeSelection: {}
        },
        editor.state
      )

      expect(decorationSet?.find(from, to)).toHaveLength(1)
    })
  })
})
