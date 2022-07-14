import { renderHook, act } from '@testing-library/react'
import { MashcardEventBus, DiscussionMarkActive, DiscussionMarkInactive } from '@mashcard/schema'
import { useActiveMarkId } from '../../DiscussionList/useActiveMarkId'
import { CommentedNode } from '../../useCommentedNodes'

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
      MashcardEventBus.dispatch(DiscussionMarkActive({ markId: activeMarkId }))
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
      MashcardEventBus.dispatch(DiscussionMarkActive({ markId: activeMarkId }))
    })

    expect(result.current[0]).toEqual(activeMarkId)

    act(() => {
      MashcardEventBus.dispatch(DiscussionMarkInactive({ markId: activeMarkId }))
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
      MashcardEventBus.dispatch(DiscussionMarkActive({ markId: activeMarkId }))

      commentedNodes.pop()

      rerender()
    })

    expect(result.current[0]).toBeNull()
  })
})
