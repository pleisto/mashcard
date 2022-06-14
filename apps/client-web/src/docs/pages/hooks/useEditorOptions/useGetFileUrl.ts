import { DocMeta } from '@/docs/store/DocMeta'
import { EmbedOptions } from '@brickdoc/editor'
import { Block } from '@brickdoc/schema'
import { useCallback, useRef, useEffect } from 'react'

export function useGetFileUrl(blocks: Block[], docMeta: DocMeta): EmbedOptions['getFileUrl'] {
  const currentBlocks = useRef<Block[]>(blocks)

  useEffect(() => {
    currentBlocks.current = blocks
  }, [blocks])

  const getFileUrl = useCallback<NonNullable<EmbedOptions['getFileUrl']>>(
    (key, source): string | undefined => {
      if (source === 'EXTERNAL') return key
      if (!docMeta.id) return undefined

      const blobs =
        currentBlocks.current
          .find(block => block.id === docMeta.id)
          ?.blobs?.map(blob => ({
            key: blob.blobKey,
            url: blob.url
          })) ?? []

      if (source === 'ORIGIN') return blobs.find(blob => blob.key === key)?.url
      return undefined
    },
    [docMeta.id]
  )

  return getFileUrl
}
