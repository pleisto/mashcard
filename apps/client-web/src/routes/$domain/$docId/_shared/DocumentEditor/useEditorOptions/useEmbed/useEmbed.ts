import { EmbedOptions } from '@mashcard/legacy-editor'
import { Blob } from '@mashcard/schema'
import { useMemo } from 'react'
import { DocMeta } from '../../../../../_shared/DocMeta'
import { useGetFileUrl } from './useGetFileUrl'
import { useGetGalleryImages } from './useGetGalleryImages'
import { useGetUrlData } from './useGetUrlData'
import { usePrepareFileUpload } from './usePrepareFileUpload'

export function useEmbed(docBlobs: Blob[], docMeta: DocMeta): EmbedOptions {
  const getFileUrl = useGetFileUrl(docBlobs)
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
