import { EmbedOptions } from '@mashcard/editor'
import { Block } from '@mashcard/schema'
import { useCallback } from 'react'

export function useGetFileUrl(documentBlock: Block): EmbedOptions['getFileUrl'] {

  const getFileUrl = useCallback<NonNullable<EmbedOptions['getFileUrl']>>(
    (key, source): string | undefined => {
      if (source === 'EXTERNAL') return key

      const blobs =
        documentBlock
          ?.blobs?.map(blob => ({
            key: blob.blobKey,
            url: blob.url
          })) ?? []

      if (source === 'ORIGIN') return blobs.find(blob => blob.key === key)?.url
      return undefined
    },
    [documentBlock]
  )

  return getFileUrl
}
