import { renderHook } from '@testing-library/react'
import { useConversationEffects } from '../../Conversation/useConversationEffects'
import { CommentedNode } from '../../useCommentedNodes'
import * as PageDiscussionContext from '../../PageDiscussionContext'
import { mockEditor } from '../../../../../test'

jest.mock('../../PageDiscussionContext')

describe('useConversationEffects', () => {
  it('sends nothing if comment has no content', () => {
    const addComment = jest.fn()
    const addConversation = jest.fn()
    jest.spyOn(PageDiscussionContext, 'usePageDiscussionContext').mockImplementation(() => ({
      discussion: { conversations: [] },
      addComment,
      addConversation
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

    const { result } = renderHook(() => useConversationEffects(conversationItem, commentedNode))

    const editor = mockEditor()
    result.current.onCommentSent(editor, undefined)

    expect(addComment).not.toBeCalled()
    expect(addConversation).not.toBeCalled()
  })

  it('adds conversation if no comment exists', () => {
    const addComment = jest.fn()
    const addConversation = jest.fn()
    jest.spyOn(PageDiscussionContext, 'usePageDiscussionContext').mockImplementation(() => ({
      discussion: { conversations: [] },
      addComment,
      addConversation
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

    const { result } = renderHook(() => useConversationEffects(conversationItem, commentedNode))

    const editor = mockEditor()
    result.current.onCommentSent(editor, [])

    expect(addComment).not.toBeCalled()
    expect(addConversation).toBeCalled()
  })

  it('adds comment if conversation has comments', () => {
    const addComment = jest.fn()
    const addConversation = jest.fn()
    jest.spyOn(PageDiscussionContext, 'usePageDiscussionContext').mockImplementation(() => ({
      discussion: { conversations: [] },
      addComment,
      addConversation
    }))

    const markId = 'markId'
    const conversationItem: PageDiscussionContext.PageConversationData = {
      id: 'id',
      markId,
      quotedContent: 'quotedContent',
      createdAt: new Date('2022-06-17 16:50:50'),
      status: 'resolved',
      comments: [
        {
          id: 'id',
          content: [],
          createdAt: new Date('2022-06-17 16:50:50'),
          creator: {
            id: 'id',
            name: 'name'
          }
        }
      ]
    }
    const commentedNode: CommentedNode = {
      markId,
      node: {} as any,
      domNode: {} as any,
      position: 1
    }

    const { result } = renderHook(() => useConversationEffects(conversationItem, commentedNode))

    const editor = mockEditor()
    result.current.onCommentSent(editor, [])

    expect(addComment).toBeCalled()
    expect(addConversation).not.toBeCalled()
  })
})
