import { useImperativeQuery } from '@/common/hooks'
import {
  GetConversationCommentsDocument,
  GetConversationCommentsQuery as Query,
  GetConversationCommentsQueryVariables as Variables
} from '@/MashcardGraphQL'
import { DiscussionOptions } from '@mashcard/legacy-editor'
import { useCallback } from 'react'
import { DocMeta } from '../../../../../_shared/DocMeta'
import { conversationToData } from './useDiscussion'

export function useGetConversations(docMeta: DocMeta): DiscussionOptions['getConversations'] {
  const getConversationComments = useImperativeQuery<Query, Variables>(GetConversationCommentsDocument)

  return useCallback<NonNullable<DiscussionOptions['getConversations']>>(async () => {
    const { data, error } = await getConversationComments({
      pageIds: docMeta.id
    })

    return {
      success: !error,
      data: data.conversationComments?.map(conversation => conversationToData(conversation)!) ?? []
    }
  }, [docMeta.id, getConversationComments])
}
