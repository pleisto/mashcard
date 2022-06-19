import { useCallback } from 'react'
import { useConversationOpenMutation } from '@/BrickdocGraphQL'
import { DiscussionOptions } from '@brickdoc/editor'

export function useOpenConversation(): DiscussionOptions['openConversation'] {
  const [openConversation] = useConversationOpenMutation()

  return useCallback<NonNullable<DiscussionOptions['openConversation']>>(
    async conversationId => {
      const { data } = await openConversation({
        variables: {
          input: {
            conversationId
          }
        }
      })

      return {
        success: (data?.conversationOpen?.errors.length ?? 0) === 0
      }
    },
    [openConversation]
  )
}
