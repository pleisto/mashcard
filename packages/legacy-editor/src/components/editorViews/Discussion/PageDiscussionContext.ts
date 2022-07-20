import { toast } from '@mashcard/design-system'
import { Editor, JSONContent } from '@tiptap/core'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Discussion } from '../../../extensions'
import { CommentData, ConversationData } from '../../../extensions/marks/discussion/meta'
import { useEditorContext, useEditorI18n } from '../../../hooks'
import { CommentedNode } from './useCommentedNodes'

export interface PageCommentData extends CommentData {
  content: JSONContent
}

export interface PageConversationData extends ConversationData {
  quotedContent: string
  comments: PageCommentData[]
}

interface DiscussionData {
  conversations: PageConversationData[]
}

export interface PageDiscussionContextValue {
  discussion: DiscussionData
  addConversation?: (conversation: Omit<PageConversationData, 'id'>, content: JSONContent) => Promise<void>
  removeConversation?: (conversationId: string) => Promise<void>
  resolveConversation?: (conversationId: string) => Promise<void>
  openConversation?: (conversationId: string) => Promise<void>
  addComment?: (conversationId: string, content: JSONContent) => Promise<void>
}

function getDiscussionExtension(editor: Editor | null | undefined): typeof Discussion | undefined {
  if (!editor) return undefined

  return editor.extensionManager.extensions.find(extension => extension.name === Discussion.name) as typeof Discussion
}

export function usePageDiscussionContextValue(commentedNodes: CommentedNode[]): PageDiscussionContextValue {
  const [t] = useEditorI18n()
  const { editor } = useEditorContext()
  const extension = getDiscussionExtension(editor)

  const [discussion, setDiscussion] = useState<DiscussionData>({ conversations: [] })
  useEffect(() => {
    void extension?.options.getConversations?.().then(response => {
      if (!response.success) {
        toast.error(t('discussion.conversation.fetch.failed'))
        return
      }

      setDiscussion({
        conversations: response.data.map(item => ({
          ...item,
          // eslint-disable-next-line max-nested-callbacks
          quotedContent: commentedNodes.find(node => node.markId === item.markId)?.node.textContent ?? ''
        }))
      })
    })
  }, [commentedNodes, extension?.options, t])

  const addComment = useCallback<NonNullable<PageDiscussionContextValue['addComment']>>(
    async (conversationId, content) => {
      const response = await extension?.options.createComment?.(conversationId, content)
      const commentData = response?.data.comment

      if (!response?.success || !commentData) {
        toast.error(t('discussion.comment.create.failed'))
        return
      }

      setDiscussion(prevDiscussion => ({
        ...prevDiscussion,
        conversations: prevDiscussion?.conversations.map(conversation => {
          if (conversation.id !== conversationId) return conversation
          return {
            ...conversation,
            comments: [...conversation.comments, commentData]
          }
        })
      }))
    },
    [extension?.options, t]
  )

  const addConversation = useCallback<NonNullable<PageDiscussionContextValue['addConversation']>>(
    async (conversation, content) => {
      const response = await extension?.options.createConversation?.(conversation.markId, content)
      const conversationData = response?.data.conversation

      if (!response?.success || !conversationData) {
        toast.error(t('discussion.conversation.create.failed'))
        return
      }

      setDiscussion(prevDiscussion => ({
        ...prevDiscussion,
        conversations: [
          ...prevDiscussion?.conversations,
          {
            ...conversationData,
            quotedContent: conversation.quotedContent
          }
        ]
      }))
    },
    [extension?.options, t]
  )

  const resolveConversation = useCallback<NonNullable<PageDiscussionContextValue['resolveConversation']>>(
    async conversationId => {
      const response = await extension?.options.resolveConversation?.(conversationId)

      if (!response?.success) {
        toast.error(t('discussion.conversation.resolve.failed'))
        return
      }

      setDiscussion(prevDiscussion => ({
        ...prevDiscussion,
        conversations: prevDiscussion?.conversations.map(conversation => {
          if (conversation.id !== conversationId) return conversation
          return {
            ...conversation,
            status: 'resolved'
          }
        })
      }))
    },
    [extension?.options, t]
  )

  const removeConversation = useCallback<NonNullable<PageDiscussionContextValue['removeConversation']>>(
    async conversationId => {
      const response = await extension?.options.deleteConversation?.(conversationId)

      if (!response?.success) {
        toast.error(t('discussion.conversation.delete.failed'))
        return
      }

      setDiscussion(prevDiscussion => ({
        ...prevDiscussion,
        conversations: prevDiscussion?.conversations.filter(conversation => conversation.id !== conversationId)
      }))
    },
    [extension?.options, t]
  )

  const openConversation = useCallback<NonNullable<PageDiscussionContextValue['openConversation']>>(
    async conversationId => {
      const response = await extension?.options.openConversation?.(conversationId)

      if (!response?.success) {
        toast.error(t('discussion.conversation.open.failed'))
        return
      }

      setDiscussion(prevDiscussion => ({
        ...prevDiscussion,
        conversations: prevDiscussion?.conversations.map(conversation => {
          if (conversation.id !== conversationId) return conversation
          return {
            ...conversation,
            status: 'opened'
          }
        })
      }))
    },
    [extension?.options, t]
  )

  const contextValue = useMemo<PageDiscussionContextValue>(
    () => ({
      discussion,
      addComment,
      addConversation,
      resolveConversation,
      removeConversation,
      openConversation
    }),
    [discussion, addComment, addConversation, resolveConversation, removeConversation, openConversation]
  )

  return contextValue
}

export const PageDiscussionContext = createContext<PageDiscussionContextValue>({
  discussion: { conversations: [] }
})

export const usePageDiscussionContext = (): PageDiscussionContextValue => useContext(PageDiscussionContext)
