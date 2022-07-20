import { useConversationResolveMutation } from '@/MashcardGraphQL'
import { DiscussionOptions } from '@mashcard/legacy-editor'
import { useCallback } from 'react'

export function useResolveConversation(): DiscussionOptions['resolveConversation'] {
  const [resolveConversation] = useConversationResolveMutation()

  return useCallback<NonNullable<DiscussionOptions['resolveConversation']>>(
    async conversationId => {
      const { data } = await resolveConversation({
        variables: {
          input: {
            conversationId
          }
        }
      })

      return {
        success: (data?.conversationResolve?.errors.length ?? 0) === 0
      }
    },
    [resolveConversation]
  )
}
