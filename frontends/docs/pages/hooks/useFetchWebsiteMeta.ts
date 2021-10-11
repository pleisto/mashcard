import { QueryPreviewBoxQuery as Query, QueryPreviewBoxQueryVariables as Variables, QueryPreviewBoxDocument } from '@/BrickdocGraphQL'
import { useImperativeQuery } from '@/common/hooks'
import { EditorOptions } from '@brickdoc/editor'

export function useFetchWebsiteMeta(): EditorOptions['fetchWebsiteMeta'] {
  const queryPreviewBox = useImperativeQuery<Query, Variables>(QueryPreviewBoxDocument)

  return async (url: string) => {
    const { data, error } = await queryPreviewBox({ url })

    return {
      success: !error,
      data: data.previewBox
    }
  }
}
