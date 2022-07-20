import { useConversationDeleteMutation } from '@/MashcardGraphQL'
import { DiscussionOptions } from '@mashcard/legacy-editor'
import { useCallback } from 'react'

export function useDeleteConversation(): DiscussionOptions['deleteConversation'] {
  const [deleteConversation] = useConversationDeleteMutation()

  return useCallback<NonNullable<DiscussionOptions['deleteConversation']>>(
    async conversationId => {
      const { data } = await deleteConversation({
        variables: {
          input: {
            conversationId
          }
        }
      })

      return {
        success: (data?.conversationDelete?.errors.length ?? 0) === 0
      }
    },
    [deleteConversation]
  )
}
