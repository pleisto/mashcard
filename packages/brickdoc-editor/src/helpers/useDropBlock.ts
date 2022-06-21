import { useEffect } from 'react'
import { BrickdocEventBus, BlockDropAdd } from '@brickdoc/schema'
import { BlockCommandItem } from '../helpers/block'
import * as BLOCK from '../helpers/block'
import { Editor as TiptapEditor } from '@tiptap/react'

export const useDropBlock = (editor: TiptapEditor | null): void => {
  useEffect(
    () =>
      BrickdocEventBus.subscribe(BlockDropAdd, event => {
        const { key, pos } = event.payload
        if (editor) {
          const chain = editor.chain()
          ;(BLOCK[key as keyof typeof BLOCK] as BlockCommandItem)?.insertBlockAt(chain, pos)
          chain.run()
        }
      }).unsubscribe,
    [editor]
  )
}
