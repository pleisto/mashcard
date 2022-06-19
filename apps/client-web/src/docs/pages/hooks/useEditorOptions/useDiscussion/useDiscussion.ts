import { DocMeta } from '@/docs/store/DocMeta'
import { BaseOptions, CommentData, ConversationData } from '@brickdoc/editor'
import { Conversation, Comment } from '@brickdoc/schema'
import { useMemo } from 'react'
import { useCreateComment } from './useCreateComment'
import { useCreateConversation } from './useCreateConversation'
import { useGetConversations } from './useGetConversations'
import { useResolveConversation } from './useResolveConversation'

export function commentToData(comment?: Comment): CommentData | null {
  if (!comment) return null

  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    creator: {
      name: comment.creator.name,
      id: comment.creator.domain,
      avatarUrl: comment.creator.avatarData?.url
    }
  }
}

export function conversationToData(conversation?: Conversation): ConversationData | null {
  if (!conversation) return null

  return {
    id: conversation.id,
    markId: conversation.markIds[0],
    latestReplyAt: conversation.latestReplyAt,
    createdAt: conversation.createdAt,
    status: conversation.status,
    comments: conversation.comments.map(comment => commentToData(comment)!)
  }
}

export function useDiscussion(docMeta: DocMeta): BaseOptions['discussion'] {
  const getConversations = useGetConversations(docMeta)
  const createConversation = useCreateConversation(docMeta)
  const createComment = useCreateComment()
  const resolveConversation = useResolveConversation()

  return useMemo(
    () => ({
      getConversations,
      createConversation,
      createComment,
      resolveConversation
    }),
    [createComment, createConversation, getConversations, resolveConversation]
  )
}
