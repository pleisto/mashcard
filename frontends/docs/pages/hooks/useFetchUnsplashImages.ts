import {
  QueryUnsplashImageQuery as Query,
  QueryUnsplashImageQueryVariables as Variables,
  QueryUnsplashImageDocument
} from '@/BrickdocGraphQL'
import { useImperativeQuery } from '@/common/hooks'
import { EditorOptions } from '@brickdoc/editor'
import { UnsplashImage } from '@brickdoc/uploader'

export function useFetchUnsplashImages(): EditorOptions['fetchUnsplashImages'] {
  const queryUnsplashImages = useImperativeQuery<Query, Variables>(QueryUnsplashImageDocument)

  return async (query: string, page: number, perPage: number) => {
    const { data, error } = await queryUnsplashImages({ query, page, perPage })

    return {
      success: !error,
      data: data.unsplashImage as UnsplashImage[]
    }
  }
}
