import { JSONContent } from '@tiptap/core'
import { createContext, useCallback, useMemo, useState } from 'react'

export interface CommentData {
  id: number
  content: JSONContent
}

export interface ConversationData {
  id: number
  markId: string
  quotedContent: string
  state: 'RESOLVED' | 'OPENED'
  comments: CommentData[]
}

interface DiscussionData {
  conversations: ConversationData[]
}

const createComment = (data: Omit<CommentData, 'id'>): CommentData => {
  return {
    content: data.content,
    id: Number(new Date())
  }
}

const createConversation = (data: Omit<ConversationData, 'id'>): ConversationData => {
  return {
    ...data,
    id: Number(new Date())
  }
}

const resolve = (conversation: ConversationData): ConversationData => {
  return {
    ...conversation,
    state: 'RESOLVED'
  }
}

const open = (conversation: ConversationData): ConversationData => {
  return {
    ...conversation,
    state: 'OPENED'
  }
}

export interface PageDiscussionContextValue {
  discussion: DiscussionData
  addConversation?: (conversation: Omit<ConversationData, 'id'>, comment: Omit<CommentData, 'id'>) => Promise<void>
  removeConversation?: (conversationId: number) => Promise<void>
  resolveConversation?: (conversationId: number) => Promise<void>
  openConversation?: (conversationId: number) => Promise<void>
  addComment?: (conversationId: number, comment: Omit<CommentData, 'id'>) => Promise<void>
}

export function usePageDiscussionContextValue(): PageDiscussionContextValue {
  const [discussion, setDiscussion] = useState<DiscussionData>({ conversations: [] })

  const addComment = useCallback<NonNullable<PageDiscussionContextValue['addComment']>>(
    async (conversationId, comment) => {
      setDiscussion(prevDiscussion => ({
        ...prevDiscussion,
        conversations: prevDiscussion?.conversations.map(conversation => {
          if (conversation.id !== conversationId) return conversation
          return {
            ...conversation,
            comments: [...conversation.comments, createComment(comment)]
          }
        })
      }))
    },
    []
  )

  const addConversation = useCallback<NonNullable<PageDiscussionContextValue['addConversation']>>(
    async (conversation, comment) => {
      setDiscussion(prevDiscussion => ({
        ...prevDiscussion,
        conversations: [
          ...prevDiscussion?.conversations,
          createConversation({
            ...conversation,
            comments: [createComment(comment)]
          })
        ]
      }))
    },
    []
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
