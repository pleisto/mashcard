import { EmbedOptions } from '@mashcard/editor'
import { Blob } from '@mashcard/schema'
import { useCallback } from 'react'

export function useGetFileUrl(docBlobs: Blob[]): EmbedOptions['getFileUrl'] {
  const getFileUrl = useCallback<NonNullable<EmbedOptions['getFileUrl']>>(
    (key, source): string | undefined => {
      if (source === 'EXTERNAL') return key

      const blobs =
        docBlobs.map(blob => ({
          key: blob.blobKey,
          url: blob.url
        })) ?? []

      if (source === 'ORIGIN') return blobs.find(blob => blob.key === key)?.url
      return undefined
    },
    [docBlobs]
  )

  return getFileUrl
}
