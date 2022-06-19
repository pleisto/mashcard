import { useCallback } from 'react'
import {
  QueryUnsplashImageQuery as Query,
  QueryUnsplashImageQueryVariables as Variables,
  QueryUnsplashImageDocument
} from '@/BrickdocGraphQL'
import { useImperativeQuery } from '@/common/hooks'
import { EmbedOptions, GalleryImage } from '@brickdoc/editor'

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
