import { EmbedOptions } from '@mashcard/legacy-editor'
import { Blob } from '@mashcard/schema'
import { useCallback } from 'react'

export function useGetFileUrl(docBlobs: Blob[]): EmbedOptions['getFileUrl'] {
  const getFileUrl = useCallback<NonNullable<EmbedOptions['getFileUrl']>>(
    (key, source) => {
      if (source === 'EXTERNAL') return { url: key, downloadUrl: key }

      const blobs =
        docBlobs.map(blob => ({
          key: blob.blobKey,
          downloadUrl: blob.downloadUrl,
          url: blob.url
        })) ?? []

      if (source === 'ORIGIN') {
        const blob = blobs.find(blob => blob.key === key)
        if (blob) {
          return { url: blob.url, downloadUrl: blob.downloadUrl }
        }
      }
      return undefined
    },
    [docBlobs]
  )

  return getFileUrl
}
