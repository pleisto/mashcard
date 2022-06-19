import { toast } from '@brickdoc/design-system'
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

const resolve = (conversation: PageConversationData): PageConversationData => {
  return {
    ...conversation,
    status: 'resolved'
  }
}

const open = (conversation: PageConversationData): PageConversationData => {
  return {
    ...conversation,
    status: 'opened'
  }
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
  const { editor } = useEditorContext()
  const [t] = useEditorI18n()
  const extension = getDiscussionExtension(editor)
  const getConversations = extension?.options.getConversations
  const createConversation = extension?.options.createConversation
  const createComment = extension?.options.createComment

  const [discussion, setDiscussion] = useState<DiscussionData>({ conversations: [] })
  useEffect(() => {
    void getConversations?.().then(response => {
      if (!response.success) return
      setDiscussion({
        conversations: response.data.map(item => ({
          ...item,
          quotedContent: commentedNodes.find(node => node.markId === item.markId)?.node.textContent ?? ''
        }))
      })
    })
  }, [commentedNodes, getConversations])

  const addComment = useCallback<NonNullable<PageDiscussionContextValue['addComment']>>(
    async (conversationId, content) => {
      if (!createComment) return

      const { success, data } = await createComment(conversationId, content)
      const commentData = data.comment

      if (!success || !commentData) {
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
    [createComment, t]
  )

  const addConversation = useCallback<NonNullable<PageDiscussionContextValue['addConversation']>>(
    async (conversation, content) => {
      if (!createConversation) return

      const { success, data } = await createConversation(conversation.markId, content)
      const conversationData = data.conversation

      if (!success || !conversationData) {
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
    [createConversation, t]
  )

  const resolveConversation = useCallback<NonNullable<PageDiscussionContextValue['resolveConversation']>>(
    async conversationId => {
      setDiscussion(prevDiscussion => ({
        ...prevDiscussion,
        conversations: prevDiscussion?.conversations.map(conversation => {
          if (conversation.id !== conversationId) return conversation
          return resolve(conversation)
        })
      }))
    },
    []
  )

  const removeConversation = useCallback<NonNullable<PageDiscussionContextValue['removeConversation']>>(
    async conversationId => {
      setDiscussion(prevDiscussion => ({
        ...prevDiscussion,
        conversations: prevDiscussion?.conversations.filter(conversation => conversation.id !== conversationId)
      }))
    },
    []
  )

  const openConversation = useCallback<NonNullable<PageDiscussionContextValue['openConversation']>>(
    async conversationId => {
      setDiscussion(prevDiscussion => ({
        ...prevDiscussion,
        conversations: prevDiscussion?.conversations.map(conversation => {
          if (conversation.id !== conversationId) return conversation
          return open(conversation)
        })
      }))
    },
    []
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
