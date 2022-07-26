import { render, renderHook, screen, fireEvent, act } from '@testing-library/react'
import { BlockSelectorItem } from '../../../ui/BlockSelector'
import { BlockActionButton, BlockActionButtonProps, useBlockActionHandlers } from '../BlockActionButton'
import * as editorHooks from '../../../../hooks/useEditorContext'
import * as blockHooks from '../../../../hooks/useBlockContext'

jest.mock('../../../../hooks/useEditorContext', () => {
  const { useEditorContext } = jest.requireActual('../../../../hooks/useEditorContext')
  return { useEditorContext: jest.fn().mockImplementation(useEditorContext) }
})
jest.mock('../../../../hooks/useBlockContext', () => {
  const { useBlockContext } = jest.requireActual('../../../../hooks/useBlockContext')
  return { useBlockContext: jest.fn().mockImplementation(useBlockContext) }
})

describe('BlockActionButton', () => {
  it(`renders BlockActionButton when node is empty correctly`, () => {
    const props: BlockActionButtonProps = {}

    const { container } = render(<BlockActionButton {...props} />)

    expect(container).toMatchSnapshot()
  })

  it(`renders BlockActionButton when node is not empty correctly`, () => {
    jest.spyOn(blockHooks, 'useBlockContext').mockImplementation(
      () =>
        ({
          node: {
            childCount: 1
          }
        } as any)
    )

    const props: BlockActionButtonProps = {}

    const { container } = render(<BlockActionButton {...props} />)

    expect(container).toMatchSnapshot()
  })

  it(`drags button normally`, async () => {
    jest.spyOn(blockHooks, 'useBlockContext').mockImplementation(
      () =>
        ({
          deleteBlock() {},
          getPosition() {
            return 1
          },
          updateDraggingStatus() {},
          node: {
            childCount: 1
          }
        } as any)
    )

    const props: BlockActionButtonProps = {}

    render(<BlockActionButton {...props} />)

    const button = screen.getByRole('button')
    expect(() => {
      act(() => {
        fireEvent.dragStart(button)
        fireEvent.dragEnd(button)
        jest.runAllTimers()
      })
    }).not.toThrow()
  })

  it(`clicks button normally`, async () => {
    jest.spyOn(blockHooks, 'useBlockContext').mockImplementation(
      () =>
        ({
          node: {
            childCount: 1
          }
        } as any)
    )

    const props: BlockActionButtonProps = {}

    render(<BlockActionButton {...props} />)

    expect(() => {
      act(() => {
        fireEvent.click(screen.getByRole('button'))
      })
    }).not.toThrow()
  })

  it(`triggers mouse enter/leave event normally`, async () => {
    jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
      editor: {} as any,
      documentEditable: true
    }))
    jest.spyOn(blockHooks, 'useBlockContext').mockImplementation(
      () =>
        ({
          deleteBlock() {},
          getPosition() {
            return 1
          },
          updateDraggingStatus() {},
          node: {
            childCount: 1
          }
        } as any)
    )

    const props: BlockActionButtonProps = {}

    const { container, rerender } = render(<BlockActionButton {...props} />)

    expect(() => {
      act(() => {
        fireEvent.mouseEnter(screen.getByRole('button'))
      })
    }).not.toThrow()

    rerender(<BlockActionButton {...props} />)

    expect(container).toMatchSnapshot()

    expect(() => {
      act(() => {
        fireEvent.mouseLeave(screen.getByRole('button'))
      })
    }).not.toThrow()

    rerender(<BlockActionButton {...props} />)

    expect(container).toMatchSnapshot()
  })

  describe('useBlockActionHandlers', () => {
    it('handles onMenuVisibleChange correctly', () => {
      const onVisibleChange = jest.fn()
      const visible = true
      const { result } = renderHook(() => useBlockActionHandlers(onVisibleChange))

      act(() => {
        result.current.onMenuVisibleChange(visible)
      })

      expect(result.current.menuVisible).toBe(visible)
      expect(onVisibleChange).toBeCalledWith(visible)
    })

    it('handles onCloseMenu correctly', () => {
      const onVisibleChange = jest.fn()
      const { result } = renderHook(() => useBlockActionHandlers(onVisibleChange))

      act(() => {
        result.current.onCloseMenu()
      })

      expect(result.current.menuVisible).toBe(false)
    })

    it('handles onBlockSelect correctly', () => {
      const editor: any = {}
      const position = 1
      jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))
      jest.spyOn(blockHooks, 'useBlockContext').mockImplementation(
        () =>
          ({
            getPosition() {
              return position
            },
            dragging: false,
            node: {}
          } as any)
      )

      const onVisibleChange = jest.fn()
      const item: BlockSelectorItem = {
        key: 'key',
        icon: <span>icon</span>,
        command: jest.fn()
      }
      const { result } = renderHook(() => useBlockActionHandlers(onVisibleChange))

      act(() => {
        result.current.onBlockSelect(item)
      })

      expect(item.command).toBeCalledWith({ editor, range: position + 1 })
    })
  })
})
