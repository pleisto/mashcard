import { render, screen } from '@testing-library/react'
import { mockEditor } from '../../../../test/editor'
import { BubbleMenu, shouldShow } from '../BubbleMenu'
import * as helpers from '../../../../helpers/selection'
import { Base } from '../../../../extensions/base'

describe('BubbleMenu', () => {
  const byRoleOptions = { hidden: true }
  it('renders nothing if `editor` is not ready', () => {
    render(<BubbleMenu editor={null} />)

    expect(() => screen.getByRole('menu', byRoleOptions)).toThrow()
  })

  it('renders normally if `editor` is supplied', () => {
    const editor = mockEditor({
      state: {
        selection: {
          from: 0,
          to: 1
        }
      }
    })
    render(<BubbleMenu editor={editor} />)

    expect(screen.getByRole('menu', byRoleOptions)).toBeInTheDocument()
  })

  it('renders nothing if editor selection is empty', () => {
    const editor = mockEditor({
      state: {
        selection: {
          from: 1,
          to: 1
        }
      }
    })

    render(<BubbleMenu editor={editor} />)

    expect(() => screen.getByRole('menu', byRoleOptions)).toThrow()
  })

  describe('BubbleMenu shouldShow', () => {
    it('should not show when editor is not editable', () => {
      const editor = mockEditor({
        isEditable: false,
        isDestroyed: true,
        extensionManager: {
          extensions: [{ name: Base.name, options: { bubbleMenu: true } }]
        }
      })
      const result = shouldShow?.({ editor, from: 1, to: 2, view: editor.view, state: editor.state })

      expect(result).toBeFalsy()
    })

    it('should not show when selection is anchor', () => {
      const editor = mockEditor({
        isEditable: true,
        isDestroyed: false,
        extensionManager: {
          extensions: [{ name: Base.name, options: { bubbleMenu: true } }]
        }
      })
      const result = shouldShow?.({ editor, from: 1, to: 1, view: editor.view, state: editor.state })

      expect(result).toBeFalsy()
    })

    it('should not show when bubbleMenu is not active', () => {
      const editor = mockEditor({
        isEditable: true,
        isDestroyed: false,
        extensionManager: {
          extensions: [{ name: Base.name, options: { bubbleMenu: false } }]
        }
      })
      const result = shouldShow?.({ editor, from: 1, to: 1, view: editor.view, state: editor.state })

      expect(result).toBeFalsy()
    })

    it('should show when selection does not contain forbidden node', () => {
      /* eslint-disable max-nested-callbacks */
      jest.spyOn(helpers, 'findNodesInSelection').mockImplementation(() => [
        {
          node: { type: { name: 'text' }, text: 'text' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'paragraph' }, textContent: 'text' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'bulletList' }, textContent: 'text' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'orderedList' }, textContent: 'text' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'listItem' }, textContent: 'text' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'heading' }, textContent: 'text' } as any,
          from: 1,
          to: 2
        }
      ])
      /* eslint-enable max-nested-callbacks */

      const editor = mockEditor({
        isEditable: true,
        isDestroyed: false,
        extensionManager: {
          extensions: [{ name: Base.name, options: { bubbleMenu: true } }]
        }
      })
      const result = shouldShow?.({ editor, from: 1, to: 2, view: editor.view, state: editor.state })

      expect(result).toBeTruthy()
    })

    it('should not show when selection contains forbidden node', () => {
      /* eslint-disable max-nested-callbacks */
      jest.spyOn(helpers, 'findNodesInSelection').mockImplementation(() => [
        {
          node: { type: { name: 'text' }, text: 'text' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'imageBlock' }, textContent: 'text' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'bulletList' }, textContent: 'text' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'orderedList' }, textContent: 'text' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'listItem' }, textContent: 'text' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'heading' }, textContent: 'text' } as any,
          from: 1,
          to: 2
        }
      ])
      /* eslint-enable max-nested-callbacks */

      const editor = mockEditor({
        isEditable: true,
        isDestroyed: false,
        extensionManager: {
          extensions: [{ name: Base.name, options: { bubbleMenu: true } }]
        }
      })
      const result = shouldShow?.({ editor, from: 1, to: 2, view: editor.view, state: editor.state })

      expect(result).toBeFalsy()
    })

    it('should not show when selection text content is empty', () => {
      /* eslint-disable max-nested-callbacks */
      jest.spyOn(helpers, 'findNodesInSelection').mockImplementation(() => [
        {
          node: { type: { name: 'text' }, text: '' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'bulletList' }, textContent: '' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'orderedList' }, textContent: '' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'listItem' }, textContent: '' } as any,
          from: 1,
          to: 2
        },
        {
          node: { type: { name: 'heading' }, textContent: '' } as any,
          from: 1,
          to: 2
        }
      ])
      /* eslint-enable max-nested-callbacks */

      const editor = mockEditor({
        isEditable: true,
        isDestroyed: false,
        extensionManager: {
          extensions: [{ name: Base.name, options: { bubbleMenu: true } }]
        }
      })
      const result = shouldShow?.({ editor, from: 1, to: 2, view: editor.view, state: editor.state })

      expect(result).toBeFalsy()
    })
  })
})
