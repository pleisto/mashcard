import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { useConversationPositionEffect } from '../../DiscussionPanel/useConversationPositionEffect'
import { CommentedNode } from '../../useCommentedNodes'

jest.mock('react', () => {
  const originReact = jest.requireActual('react')
  const mUseRef = jest.fn()
  return {
    ...originReact,
    useRef: mUseRef
  }
})

describe('useConversationPositionEffect', () => {
  it('does not transform position if no active mark', () => {
    const commentedNodes: CommentedNode[] = [
      {
        markId: 'mark',
        node: {} as any,
        domNode: document.createElement('div'),
        position: 1
      },
      {
        markId: 'another',
        node: {} as any,
        domNode: document.createElement('div'),
        position: 2
      }
    ]

    ;(useRef as jest.Mock)
      .mockReturnValueOnce({
        current: document.createElement('div')
      })
      .mockReturnValueOnce({
        current: {
          [commentedNodes[0].markId]: commentedNodes[0].domNode,
          [commentedNodes[1].markId]: commentedNodes[1].domNode
        }
      })

    const { result } = renderHook(() => useConversationPositionEffect(true, null, commentedNodes))

    expect(result.current[0].current?.style.transition).toBe('')
  })

  it('updates commented nodes position correctly', () => {
    const activeMarkId = 'active-mark-id'

    const commentedNodes: CommentedNode[] = [
      {
        markId: activeMarkId,
        node: {} as any,
        domNode: document.createElement('div'),
        position: 1
      },
      {
        markId: 'another',
        node: {} as any,
        domNode: document.createElement('div'),
        position: 2
      }
    ]

    ;(useRef as jest.Mock)
      .mockReturnValueOnce({
        current: document.createElement('div')
      })
      .mockReturnValueOnce({
        current: {
          [commentedNodes[0].markId]: commentedNodes[0].domNode,
          [commentedNodes[1].markId]: commentedNodes[1].domNode
        }
      })

    const { result } = renderHook(() => useConversationPositionEffect(true, activeMarkId, commentedNodes))

    expect(result.current[0].current?.style.transition).not.toBe('')
  })

  it('updates commented nodes position for text node correctly', () => {
    const activeMarkId = 'active-mark-id'
    const domNode1 = document.createElement('span')
    const domNode2 = document.createElement('div')
    const listDom = document.createElement('div')
    domNode1.appendChild(document.createTextNode('text'))
    document.body.appendChild(domNode1)
    document.body.appendChild(domNode2)
    document.body.appendChild(listDom)

    const commentedNodes: CommentedNode[] = [
      {
        markId: activeMarkId,
        node: {} as any,
        domNode: domNode1.firstChild!,
        position: 1
      },
      {
        markId: 'another',
        node: {} as any,
        domNode: domNode2,
        position: 2
      }
    ]

    ;(useRef as jest.Mock)
      .mockReturnValueOnce({
        current: listDom
      })
      .mockReturnValueOnce({
        current: {
          [commentedNodes[0].markId]: domNode1,
          [commentedNodes[1].markId]: domNode2
        }
      })

    const { result } = renderHook(() => useConversationPositionEffect(true, activeMarkId, commentedNodes))

    expect(result.current[0].current?.style.transition).not.toBe('')
  })
})
