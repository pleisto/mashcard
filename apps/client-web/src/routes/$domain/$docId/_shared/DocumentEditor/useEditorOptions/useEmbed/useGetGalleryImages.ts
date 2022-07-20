import { useImperativeQuery } from '@/common/hooks'
import {
  QueryUnsplashImageDocument,
  QueryUnsplashImageQuery as Query,
  QueryUnsplashImageQueryVariables as Variables
} from '@/MashcardGraphQL'
import { EmbedOptions, GalleryImage } from '@mashcard/legacy-editor'
import { useCallback } from 'react'

export function useGetGalleryImages(): EmbedOptions['getGalleryImages'] {
  const queryUnsplashImages = useImperativeQuery<Query, Variables>(QueryUnsplashImageDocument)

  return useCallback<NonNullable<EmbedOptions['getGalleryImages']>>(
    async ({ query, page, perPage }) => {
      const { data, error } = await queryUnsplashImages({ query, page, perPage })

      return {
        success: !error,
        data: data.unsplashImage as GalleryImage[]
      }
    },
    [queryUnsplashImages]
  )
}
