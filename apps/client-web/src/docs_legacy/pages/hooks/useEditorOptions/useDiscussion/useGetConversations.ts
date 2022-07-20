import { useCallback } from 'react'
import {
  GetConversationCommentsQuery as Query,
  GetConversationCommentsQueryVariables as Variables,
  GetConversationCommentsDocument
} from '@/MashcardGraphQL'
import { useImperativeQuery } from '@/common/hooks'
import { DiscussionOptions } from '@mashcard/legacy-editor'
import { DocMeta } from '@/docs_legacy/store/DocMeta'
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
