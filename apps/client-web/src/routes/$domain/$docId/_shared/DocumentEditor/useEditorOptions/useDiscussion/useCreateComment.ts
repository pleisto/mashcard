import { useConversationCommentAppendMutation } from '@/MashcardGraphQL'
import { DiscussionOptions } from '@mashcard/legacy-editor'
import { useCallback } from 'react'
import { commentToData } from './useDiscussion'

export function useCreateComment(): DiscussionOptions['createComment'] {
  const [appendConversationComment] = useConversationCommentAppendMutation()

  return useCallback<NonNullable<DiscussionOptions['createComment']>>(
    async (conversationId, content) => {
      const { data } = await appendConversationComment({
        variables: {
          input: {
            conversationId,
            content
          }
        }
      })

      return {
        success: (data?.conversationCommentAppend?.errors.length ?? 0) === 0,
        data: {
          comment: commentToData(data?.conversationCommentAppend?.comment)
        }
      }
    },
    [appendConversationComment]
  )
}
