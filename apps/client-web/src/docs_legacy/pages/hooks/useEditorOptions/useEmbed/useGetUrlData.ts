import { QueryPreviewBoxQuery, QueryPreviewBoxQueryVariables, QueryPreviewBoxDocument } from '@/MashcardGraphQL'
import { useImperativeQuery } from '@/common/hooks'
import { EmbedOptions } from '@mashcard/legacy-editor'
import { useCallback } from 'react'

export function useGetUrlData(): EmbedOptions['getUrlData'] {
  const queryPreviewBox = useImperativeQuery<QueryPreviewBoxQuery, QueryPreviewBoxQueryVariables>(
    QueryPreviewBoxDocument
  )

  return useCallback<NonNullable<EmbedOptions['getUrlData']>>(
    async (url: string) => {
      const { data, error } = await queryPreviewBox({ url })

      return {
        success: !error,
        data: {
          ...data.previewBox,
          size: Number(data.previewBox.size)
        }
      }
    },
    [queryPreviewBox]
  )
}
