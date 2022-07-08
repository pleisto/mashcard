import { DocMeta } from '@/docs_legacy/store/DocMeta'
import { Block } from '@mashcard/schema'
import { EmbedOptions } from '@mashcard/editor'
import { useGetGalleryImages } from './useGetGalleryImages'
import { useGetUrlData } from './useGetUrlData'
import { useGetFileUrl } from './useGetFileUrl'
import { usePrepareFileUpload } from './usePrepareFileUpload'
import { useMemo } from 'react'

export function useEmbed(documentBlock: Block, docMeta: DocMeta): EmbedOptions {
  const getFileUrl = useGetFileUrl(documentBlock)
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
