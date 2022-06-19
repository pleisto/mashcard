import { useCallback } from 'react'
import { useConversationResolveMutation } from '@/BrickdocGraphQL'
import { DiscussionOptions } from '@brickdoc/editor'

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