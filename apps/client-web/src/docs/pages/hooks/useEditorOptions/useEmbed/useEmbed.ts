import { DocMeta } from '@/docs/store/DocMeta'
import { Block } from '@brickdoc/schema'
import { BaseOptions } from '@brickdoc/editor'
import { useGetGalleryImages } from './useGetGalleryImages'
import { useGetUrlData } from './useGetUrlData'
import { useGetFileUrl } from './useGetFileUrl'
import { usePrepareFileUpload } from './usePrepareFileUpload'
import { useMemo } from 'react'

export function useEmbed(blocks: Block[], docMeta: DocMeta): BaseOptions['embed'] {
  const getFileUrl = useGetFileUrl(blocks, docMeta)
  const getGalleryImages = useGetGalleryImages()
  const getUrlData = useGetUrlData()
  const prepareFileUpload = usePrepareFileUpload(docMeta)

  return useMemo(
    () => ({
      getFileUrl,
      getGalleryImages,
      getUrlData,
      prepareFileUpload
    }),
    [getFileUrl, getGalleryImages, getUrlData, prepareFileUpload]
  )
}
