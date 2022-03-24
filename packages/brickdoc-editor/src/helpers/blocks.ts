import { Block } from '@brickdoc/schema'

const findParent = (blocks: Block[], parentId: string, callback: (block: Block) => boolean): Block | null => {
  const parent = blocks.find(block => block.id === parentId)

  if (!parent) return null
  if (callback(parent)) return parent
  if (!parent.parentId) return null
  return findParent(blocks, parent.parentId, callback)
}

export const findAncestor = (blocks: Block[], blockId: string, callback: (block: Block) => boolean): Block | null => {
  const currentBlock = blocks.find(block => block.id === blockId)
  if (!currentBlock?.parentId) return null
  return findParent(blocks, currentBlock.parentId, callback)
}
