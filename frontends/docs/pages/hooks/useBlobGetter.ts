import React from 'react'
import { Node } from 'prosemirror-model'
import { Filesourcetype, GetChildrenBlocksQuery } from '@/BrickdocGraphQL'

export const useBlobGetter = (
  field: string,
  blocks: GetChildrenBlocksQuery['childrenBlocks']
): ((node: Node) => string | undefined) => {
  return React.useCallback(
    node => {
      if (node.attrs[field]?.source === Filesourcetype.External) {
        return node.attrs[field].key
      }

      if (node.attrs[field]?.source === Filesourcetype.Origin) {
        const block = blocks?.find(block => block.id === node.attrs.uuid)
        const blob = block?.blobs?.find(blob => blob.blobKey === node.attrs[field].key)
        return blob?.url
      }
    },
    [blocks, field]
  )
}
