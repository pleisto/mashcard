import { DocMeta } from '@/docs_legacy/store/DocMeta'
import { ConversationCommentAppendMutation, ConversationCommentCreateMutation } from '@/MashcardGraphQL'
import { BaseOptions, CommentData, ConversationData } from '@mashcard/editor'
import { useMemo } from 'react'
import { useCreateComment } from './useCreateComment'
import { useCreateConversation } from './useCreateConversation'
import { useDeleteConversation } from './useDeleteConversation'
import { useGetConversations } from './useGetConversations'
import { useOpenConversation } from './useOpenConversation'
import { useResolveConversation } from './useResolveConversation'

export function commentToData(
  comment?: NonNullable<ConversationCommentAppendMutation['conversationCommentAppend']>['comment']
): CommentData | null {
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

export function conversationToData(
  conversation?: NonNullable<ConversationCommentCreateMutation['conversationCommentCreate']>['conversation']
): ConversationData | null {
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
  const openConversation = useOpenConversation()
  const deleteConversation = useDeleteConversation()

  return useMemo(
    () => ({
      getConversations,
      createConversation,
      createComment,
      resolveConversation,
      openConversation,
      deleteConversation
    }),
    [createComment, createConversation, deleteConversation, getConversations, openConversation, resolveConversation]
  )
}
