import { DocMeta } from '@/docs/store/DocMeta'
import { EmbedOptions } from '@brickdoc/editor'
import { Block } from '@brickdoc/schema'
import { useMemo, useCallback } from 'react'

export function useGetFileUrl(blocks: Block[], docMeta: DocMeta): EmbedOptions['getFileUrl'] {
  const blobs = useMemo(
    () =>
      blocks?.reduce<{
        [blockKey: string]: Array<{
          key: string
          url: string
        }>
      }>((prev, cur) => {
        return {
          ...prev,
          [cur.rootId ?? cur.id]: [
            ...(prev[cur.rootId ?? cur.id] ?? []),
            ...(cur.blobs?.map(blob => ({
              key: blob.blobKey,
              url: blob.url
            })) ?? [])
          ]
        }
      }, {}) ?? {},
    [blocks]
  )

  const getFileUrl = useCallback<NonNullable<EmbedOptions['getFileUrl']>>(
    (key, source): string | undefined => {
      if (source === 'EXTERNAL') return key
      if (!docMeta.id) return undefined
      if (source === 'ORIGIN') return blobs[docMeta.id]?.find(blob => blob.key === key)?.url
      return undefined
    },
    [blobs, docMeta.id]
  )

  return getFileUrl
}
