import { renderHook } from '@testing-library/react-hooks'
import { useBlockContextDataProvider } from '../useBlockContextDataProvider'

Object.assign(navigator, {
  clipboard: {
    writeText: () => {}
  }
})

describe('useBlockContextDataProvider', () => {
  it('gets data correctly', () => {
    const mockUpdateDragging = jest.fn()
    const { result } = renderHook(() =>
      useBlockContextDataProvider({
        insideList: true,
        dragging: true,
        getPos: () => 1,
        updateDragging: mockUpdateDragging,
        node: {} as any
      })
    )

    const data = result.current[0]

    expect(data.dragging).toBeTruthy()
    expect(data.insideList).toBeTruthy()

    data.updateDraggingStatus(true)
    expect(mockUpdateDragging).toBeCalledWith(true)
  })

  it('moves node normally', () => {
    const { result } = renderHook(() =>
      useBlockContextDataProvider({
        insideList: true,
        dragging: true,
        getPos: () => 1,
        updateDragging: () => {},
        node: {} as any
      })
    )

    const data = result.current[0]
    expect(() => data.moveBlock()).not.toThrow()
  })

  it('duplicates node normally', () => {
    const { result } = renderHook(() =>
      useBlockContextDataProvider({
        insideList: true,
        dragging: true,
        getPos: () => 1,
        updateDragging: () => {},
        node: {} as any
      })
    )

    const data = result.current[0]
    expect(() => data.duplicateBlock()).not.toThrow()
  })

  it('gets node position normally', () => {
    const position = 1
    const { result } = renderHook(() =>
      useBlockContextDataProvider({
        insideList: true,
        dragging: true,
        getPos: () => position,
        updateDragging: () => {},
        node: {} as any
      })
    )

    const data = result.current[0]
    expect(data.getPosition()).toBe(position)
  })

  it('deletes node normally', () => {
    const mockDelete = jest.fn()
    const { result } = renderHook(() =>
      useBlockContextDataProvider({
        insideList: true,
        dragging: true,
        deleteNode: mockDelete,
        getPos: () => 1,
        updateDragging: () => {},
        node: {} as any
      })
    )

    const data = result.current[0]
    data.deleteBlock()

    expect(mockDelete).toBeCalled()
  })

  it('copies content normally', () => {
    const content = 'content'
    const mockCopy = jest.fn()
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(content => mockCopy(content))
    const { result } = renderHook(() =>
      useBlockContextDataProvider({
        insideList: true,
        dragging: true,
        contentForCopy: content,
        getPos: () => 1,
        updateDragging: () => {},
        node: {} as any
      })
    )

    const data = result.current[0]
    data.copyContent()

    expect(mockCopy).toBeCalledWith(content)
  })
})
