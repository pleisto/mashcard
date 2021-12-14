import React from 'react'
import { Node } from 'prosemirror-model'
import { Filesourcetype, GetChildrenBlocksQuery } from '@/BrickdocGraphQL'

export const useBlobGetter = (
  field: string,
  inputBlocks: GetChildrenBlocksQuery['childrenBlocks']
): ((node: Node) => string | undefined) => {
  const blocks = React.useRef(inputBlocks)

  React.useEffect(() => {
    blocks.current = inputBlocks
  }, [inputBlocks])

  return React.useCallback(
    node => {
      if (node.attrs[field]?.source === Filesourcetype.External) {
        return node.attrs[field].key
      }

      if (node.attrs[field]?.source === Filesourcetype.Origin) {
        const block = blocks.current?.find(block => block.id === node.attrs.uuid)
        const blob = block?.blobs?.find(blob => blob.blobKey === node.attrs[field].key)
        return blob?.url
      }
    },
    [field]
  )
}
