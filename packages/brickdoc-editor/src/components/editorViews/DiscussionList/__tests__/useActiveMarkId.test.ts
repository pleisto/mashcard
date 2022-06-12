import { renderHook } from '@testing-library/react-hooks'
import { BrickdocEventBus, DiscussionMarkActive, DiscussionMarkInactive } from '@brickdoc/schema'
import { useActiveMarkId } from '../useActiveMarkId'
import { CommentedNode } from '../useCommentedNodes'
import { act } from 'react-dom/test-utils'

describe('useActiveMarkId', () => {
  it('handles active mark event correctly', () => {
    const activeMarkId = 'active mark id'
    const commentedNodes: CommentedNode[] = [
      {
        markId: activeMarkId,
        position: 1,
        node: {} as any,
        domNode: document.createElement('div')
      }
    ]
    const { result } = renderHook(() => useActiveMarkId(commentedNodes))

    act(() => {
      BrickdocEventBus.dispatch(DiscussionMarkActive({ markId: activeMarkId }))
    })

    expect(result.current[0]).toEqual(activeMarkId)
  })

  it('handles inactive mark event correctly', () => {
    const activeMarkId = 'active mark id'
    const commentedNodes: CommentedNode[] = [
      {
        markId: activeMarkId,
        position: 1,
        node: {} as any,
        domNode: document.createElement('div')
      }
    ]
    const { result } = renderHook(() => useActiveMarkId(commentedNodes))

    act(() => {
      BrickdocEventBus.dispatch(DiscussionMarkActive({ markId: activeMarkId }))
    })

    expect(result.current[0]).toEqual(activeMarkId)

    act(() => {
      BrickdocEventBus.dispatch(DiscussionMarkInactive({ markId: activeMarkId }))
    })

    expect(result.current[0]).toBeNull()
  })

  it('removes active mark id if it has been removed in document', () => {
    const activeMarkId = 'active mark id'
    const commentedNodes: CommentedNode[] = [
      {
        markId: activeMarkId,
        position: 1,
        node: {} as any,
        domNode: document.createElement('div')
      }
    ]
    const { result, rerender } = renderHook(() => useActiveMarkId(commentedNodes))

    act(() => {
      BrickdocEventBus.dispatch(DiscussionMarkActive({ markId: activeMarkId }))

      commentedNodes.pop()

      rerender()
    })

    expect(result.current[0]).toBeNull()
  })
})
