import React from 'react'
import {
  QueryUnsplashImageQuery as Query,
  QueryUnsplashImageQueryVariables as Variables,
  QueryUnsplashImageDocument
} from '@/MashcardGraphQL'
import { useImperativeQuery } from '@/common/hooks'
import { UnsplashImage, DashboardPluginOptions } from '@mashcard/uploader'

export function useFetchUnsplashImages(): Exclude<DashboardPluginOptions['fetchUnsplashImages'], undefined> {
  const queryUnsplashImages = useImperativeQuery<Query, Variables>(QueryUnsplashImageDocument)

  return React.useCallback(
    async (query: string, page: number, perPage: number) => {
      const { data, error } = await queryUnsplashImages({ query, page, perPage })

      return {
        success: !error,
        data: data.unsplashImage as UnsplashImage[]
      }
    },
    [queryUnsplashImages]
  )
}
