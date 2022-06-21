import { JSONContent } from '@tiptap/core'
import { ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'discussion',
  extensionType: 'mark'
}

export interface CommentData {
  id: string
  content: JSONContent
  createdAt: Date
  creator: {
    name: string
    id: string
    avatarUrl?: string
  }
}

export interface ConversationData {
  id: string
  markId: string
  latestReplyAt?: Date | null
  createdAt: Date | null
  status: 'deleted' | 'opened' | 'resolved'
  comments: CommentData[]
}

export interface DiscussionOptions {
  getConversations?: () => Promise<{
    success: boolean
    data: ConversationData[]
  }>
  createConversation?: (
    markId: string,
    content: JSONContent
  ) => Promise<{
    success: boolean
    data: {
      conversation: ConversationData | null
    }
  }>
  createComment?: (
    conversationId: string,
    content: JSONContent
  ) => Promise<{
    success: boolean
    data: {
      comment: CommentData | null
    }
  }>
  resolveConversation?: (conversationId: string) => Promise<{ success: boolean }>
  openConversation?: (conversationId: string) => Promise<{ success: boolean }>
  deleteConversation?: (conversationId: string) => Promise<{ success: boolean }>
}
export interface DiscussionAttributes {
  markId: string
}
