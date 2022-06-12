import { useEffect } from 'react'
import { BrickdocEventBus, BlockDropAdd } from '@brickdoc/schema'
import { BLOCK_MAP } from '../helpers/block'
import { Editor as TiptapEditor } from '@tiptap/react'

export const useDropBlock = (editor: TiptapEditor | null): void => {
  useEffect(
    () =>
      BrickdocEventBus.subscribe(BlockDropAdd, event => {
        const { key, pos } = event.payload
        if (editor) {
          const chain = editor.chain()
          BLOCK_MAP[key]?.insertBlockAt(chain, pos)
          chain.run()
        }
      }).unsubscribe,
    [editor]
  )
}
