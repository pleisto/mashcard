import { useImperativeQuery } from '@/common/hooks'
import {
  QueryUnsplashImageDocument,
  QueryUnsplashImageQuery as Query,
  QueryUnsplashImageQueryVariables as Variables
} from '@/MashcardGraphQL'
import { DashboardPluginOptions, UnsplashImage } from '@mashcard/uploader'
import React from 'react'

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
