import { renderHook } from '@testing-library/react'
import { useConversationActions } from '../../Conversation/useConversationActions'
import * as PageDiscussionContext from '../../PageDiscussionContext'
import { CommentedNode } from '../../useCommentedNodes'

jest.mock('../../PageDiscussionContext', () => {
  const { usePageDiscussionContext } = jest.requireActual('../../PageDiscussionContext')
  return { usePageDiscussionContext: jest.fn().mockImplementation(usePageDiscussionContext) }
})

describe('useConversationActions', () => {
  it('triggers onCopyUrl correctly', () => {
    const mockCopy = jest.fn()
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(content => mockCopy(content))

    const markId = 'markId'
    const conversationItem: PageDiscussionContext.PageConversationData = {
      id: 'id',
      markId,
      quotedContent: 'quotedContent',
      createdAt: new Date('2022-06-17 16:50:50'),
      status: 'opened',
      comments: []
    }
    const commentedNode: CommentedNode = {
      markId,
      node: {} as any,
      domNode: {} as any,
      position: 1
    }

    const { result } = renderHook(() => useConversationActions(conversationItem, commentedNode))

    result.current.onCopyUrl()

    expect(mockCopy).toBeCalled()
  })

  it('triggers onStatus resolve correctly', () => {
    const resolveConversation = jest.fn()
    jest.spyOn(PageDiscussionContext, 'usePageDiscussionContext').mockImplementation(() => ({
      discussion: { conversations: [] },
      resolveConversation
    }))

    const markId = 'markId'
    const conversationItem: PageDiscussionContext.PageConversationData = {
      id: 'id',
      markId,
      quotedContent: 'quotedContent',
      createdAt: new Date('2022-06-17 16:50:50'),
      status: 'opened',
      comments: []
    }
    const commentedNode: CommentedNode = {
      markId,
      node: {} as any,
      domNode: {} as any,
      position: 1
    }

    const { result } = renderHook(() => useConversationActions(conversationItem, commentedNode))

    result.current.onStatus()

    expect(resolveConversation).toBeCalled()
  })

  it('triggers onStatus open correctly', () => {
    const openConversation = jest.fn()
    jest.spyOn(PageDiscussionContext, 'usePageDiscussionContext').mockImplementation(() => ({
      discussion: { conversations: [] },
      openConversation
    }))

    const markId = 'markId'
    const conversationItem: PageDiscussionContext.PageConversationData = {
      id: 'id',
      markId,
      quotedContent: 'quotedContent',
      createdAt: new Date('2022-06-17 16:50:50'),
      status: 'resolved',
      comments: []
    }
    const commentedNode: CommentedNode = {
      markId,
      node: {} as any,
      domNode: {} as any,
      position: 1
    }

    const { result } = renderHook(() => useConversationActions(conversationItem, commentedNode))

    result.current.onStatus()

    expect(openConversation).toBeCalled()
  })

  describe('Remove Confirm', () => {
    it('shows/cancels remove confirm correctly', () => {
      const markId = 'markId'
      const conversationItem: PageDiscussionContext.PageConversationData = {
        id: 'id',
        markId,
        quotedContent: 'quotedContent',
        createdAt: new Date('2022-06-17 16:50:50'),
        status: 'resolved',
        comments: []
      }
      const commentedNode: CommentedNode = {
        markId,
        node: {} as any,
        domNode: {} as any,
        position: 1
      }

      // eslint-disable-next-line max-nested-callbacks
      const { result, rerender } = renderHook(() => useConversationActions(conversationItem, commentedNode))

      expect(result.current.removeConfirm.visible).toBeFalsy()

      result.current.removeConfirm.onShow()
      rerender()

      expect(result.current.removeConfirm.visible).toBeTruthy()

      result.current.removeConfirm.onCancel()
      rerender()

      expect(result.current.removeConfirm.visible).toBeFalsy()
    })

    it('confirms remove correctly', () => {
      const removeConversation = jest.fn()
      // eslint-disable-next-line max-nested-callbacks
      jest.spyOn(PageDiscussionContext, 'usePageDiscussionContext').mockImplementation(() => ({
        discussion: { conversations: [] },
        removeConversation
      }))

      const markId = 'markId'
      const conversationItem: PageDiscussionContext.PageConversationData = {
        id: 'id',
        markId,
        quotedContent: 'quotedContent',
        createdAt: new Date('2022-06-17 16:50:50'),
        status: 'opened',
        comments: []
      }
      const commentedNode: CommentedNode = {
        markId,
        node: {} as any,
        domNode: {} as any,
        position: 1
      }

      // eslint-disable-next-line max-nested-callbacks
      const { result } = renderHook(() => useConversationActions(conversationItem, commentedNode))

      result.current.removeConfirm.onConfirm()

      expect(removeConversation).toBeCalled()
    })
  })
})
