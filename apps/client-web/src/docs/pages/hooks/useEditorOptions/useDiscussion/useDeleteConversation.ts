import { useCallback } from 'react'
import { useConversationDeleteMutation } from '@/BrickdocGraphQL'
import { DiscussionOptions } from '@brickdoc/editor'

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
