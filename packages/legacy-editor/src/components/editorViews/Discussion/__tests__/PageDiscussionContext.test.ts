import { renderHook, act, waitFor } from '@testing-library/react'
import { usePageDiscussionContextValue } from '../PageDiscussionContext'
import { CommentedNode } from '../useCommentedNodes'
import * as editorHooks from '../../../../hooks/useEditorContext'
import { mockEditor } from '../../../../test'
import { CommentData, ConversationData, Discussion } from '../../../../extensions'
import { JSONContent, Editor } from '@tiptap/core'

jest.mock('../../../../hooks/useEditorContext', () => {
  const { useEditorContext } = jest.requireActual('../../../../hooks/useEditorContext')
  return { useEditorContext: jest.fn().mockImplementation(useEditorContext) }
})

describe('PageDiscussionContext', () => {
  const mockEditorForDiscussion = (): Editor => {
    return mockEditor({
      extensionManager: {
        extensions: [
          {
            name: Discussion.name,
            options: {
              createConversation: async (
                markId: string,
                content: JSONContent
              ): Promise<{ success: boolean; data: { conversation: ConversationData } }> => ({
                success: true,

                data: {
                  conversation: {
                    markId,
                    id: '1',
                    createdAt: new Date('20220-06-17 16:50:50'),
                    status: 'opened',
                    comments: [
                      {
                        id: '1',
                        content,
                        createdAt: new Date('20220-06-17 16:50:50'),
                        creator: {
                          id: 'id',
                          name: 'name'
                        }
                      }
                    ]
                  }
                }
              }),
              createComment: async (
                conversationId: string,
                content: JSONContent
              ): Promise<{ success: boolean; data: { comment: CommentData } }> => ({
                success: true,

                data: {
                  comment: {
                    id: '1',
                    content,
                    createdAt: new Date('20220-06-17 16:50:50'),
                    creator: {
                      id: 'id',
                      name: 'name'
                    }
                  }
                }
              }),
              resolveConversation: async (conversationId: string): Promise<{ success: boolean }> => ({
                success: true
              }),
              openConversation: async (conversationId: string): Promise<{ success: boolean }> => ({
                success: true
              }),
              deleteConversation: async (conversationId: string): Promise<{ success: boolean }> => ({
                success: true
              })
            }
          }
        ]
      }
    })
  }

  describe('usePageDiscussionContextValue', () => {
    it('fetches conversations normally', async () => {
      const editor = mockEditor({
        extensionManager: {
          extensions: [
            {
              name: Discussion.name,
              options: {
                getConversations: async (): Promise<{
                  success: boolean
                  data: ConversationData[]
                }> => ({
                  success: true,

                  data: [
                    {
                      markId: 'markId',
                      id: '1',
                      createdAt: new Date('20220-06-17 16:50:50'),
                      status: 'opened',
                      comments: [
                        {
                          id: '1',
                          content: [],
                          createdAt: new Date('20220-06-17 16:50:50'),
                          creator: {
                            id: 'id',
                            name: 'name'
                          }
                        }
                      ]
                    }
                  ]
                })
              }
            }
          ]
        }
      })

      jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))

      const commentedNodes: CommentedNode[] = [{} as any]

      const { result } = renderHook(() => usePageDiscussionContextValue(commentedNodes))

      await waitFor(() => {
        expect(result.current.discussion.conversations).toHaveLength(1)
      })
    })

    it('does nothing if fetch conversations failed', async () => {
      const editor = mockEditor({
        extensionManager: {
          extensions: [
            {
              name: Discussion.name,
              options: {
                getConversations: async (): Promise<{
                  success: boolean
                  data: ConversationData[]
                }> => ({
                  success: false,
                  data: []
                })
              }
            }
          ]
        }
      })

      jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))

      const commentedNodes: CommentedNode[] = []

      const { result } = renderHook(() => usePageDiscussionContextValue(commentedNodes))

      await waitFor(() => {
        expect(result.current.discussion.conversations).toHaveLength(0)
      })
    })

    it('triggers addConversation normally', async () => {
      const editor = mockEditorForDiscussion()

      jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))

      const markId = 'markId'
      const commentedNodes: CommentedNode[] = []

      const { result } = renderHook(() => usePageDiscussionContextValue(commentedNodes))
      const { addConversation } = result.current

      expect(result.current.discussion.conversations).toHaveLength(0)

      await act(
        async () =>
          await addConversation?.(
            {
              markId,
              quotedContent: 'content',
              status: 'opened',
              comments: [],
              createdAt: new Date('20220-06-17 16:50:50')
            },
            {
              content: []
            }
          )
      )

      expect(result.current.discussion.conversations).toHaveLength(1)
      expect(result.current.discussion.conversations[0].markId).toEqual(markId)
      expect(result.current.discussion.conversations[0].comments).toHaveLength(1)
    })

    it('triggers addComment normally', async () => {
      const editor = mockEditorForDiscussion()
      jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))

      const markId = 'markId'
      const commentedNodes: CommentedNode[] = []
      const { result } = renderHook(() => usePageDiscussionContextValue(commentedNodes))
      const { addConversation, addComment } = result.current

      await act(
        async () =>
          await addConversation?.(
            {
              markId,
              quotedContent: 'content',
              status: 'opened',
              comments: [],
              createdAt: new Date('20220-06-17 16:50:50')
            },
            {
              content: []
            }
          )
      )

      expect(result.current.discussion.conversations[0].comments).toHaveLength(1)

      await act(
        async () =>
          await addComment?.(result.current.discussion.conversations[0].id, {
            content: []
          })
      )

      expect(result.current.discussion.conversations[0].comments).toHaveLength(2)
    })

    it('triggers removeConversation normally', async () => {
      const editor = mockEditorForDiscussion()
      jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))

      const markId = 'markId'
      const commentedNodes: CommentedNode[] = []
      const { result } = renderHook(() => usePageDiscussionContextValue(commentedNodes))
      const { addConversation, removeConversation } = result.current

      await act(
        async () =>
          await addConversation?.(
            {
              markId,
              quotedContent: 'content',
              status: 'opened',
              createdAt: new Date('20220-06-17 16:50:50'),
              comments: []
            },
            {
              content: []
            }
          )
      )

      expect(result.current.discussion.conversations).toHaveLength(1)

      await act(async () => await removeConversation?.(result.current.discussion.conversations[0].id))

      expect(result.current.discussion.conversations).toHaveLength(0)
    })

    it('triggers resolveConversation normally', async () => {
      const editor = mockEditorForDiscussion()
      jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))

      const markId = 'markId'
      const commentedNodes: CommentedNode[] = []
      const { result } = renderHook(() => usePageDiscussionContextValue(commentedNodes))
      const { addConversation, resolveConversation } = result.current

      await act(
        async () =>
          await addConversation?.(
            {
              markId,
              quotedContent: 'content',
              status: 'opened',
              createdAt: new Date('20220-06-17 16:50:50'),
              comments: []
            },
            {
              content: []
            }
          )
      )
      await act(async () => await resolveConversation?.(result.current.discussion.conversations[0].id))

      expect(result.current.discussion.conversations[0].status).toBe('resolved')
    })

    it('triggers openConversation normally', async () => {
      const editor = mockEditorForDiscussion()
      jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({
        editor,
        documentEditable: true
      }))

      const markId = 'markId'
      const commentedNodes: CommentedNode[] = []
      const { result } = renderHook(() => usePageDiscussionContextValue(commentedNodes))
      const { addConversation, resolveConversation, openConversation } = result.current

      await act(
        async () =>
          await addConversation?.(
            {
              markId,
              quotedContent: 'content',
              status: 'opened',
              createdAt: new Date('20220-06-17 16:50:50'),
              comments: []
            },
            {
              content: []
            }
          )
      )

      await act(async () => await resolveConversation?.(result.current.discussion.conversations[0].id))

      await act(async () => await openConversation?.(result.current.discussion.conversations[0].id))

      expect(result.current.discussion.conversations[0].status).toBe('opened')
    })
  })
})
