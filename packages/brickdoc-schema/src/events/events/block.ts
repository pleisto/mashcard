import { event } from '../event'
import { Block } from '../../BrickdocModels'

export const BlockUpdated = event<Block>()('BlockUpdated', (block: Block) => {
  return { id: block.id }
})
export const BlockDeleted = event<Block>()('BlockDeleted', (block: Block) => {
  return { id: block.id }
})

export const UpdateBlock = event<{ block: Block; commit?: boolean }>()('UpdateBlock', ({ block, commit }) => {
  return { id: block.id }
})
export const DeleteBlock = event<{ blockId: string; commit?: boolean }>()('DeleteBlock', ({ blockId, commit }) => {
  return { id: blockId }
})
export const CommitBlocks = event<{}>()('CommitBlocks', () => {
  return { id: 'commit' }
})

export const BlockSynced = event<Block>()('BlockSynced', (block: Block) => {
  return { id: block.id }
})

export const BlockJustCreated = event<{ id: string }>({ sticky: true })('BlockJustCreated', ({ id }) => {
  return { id }
})

export const BlockDropAdd = event<{ key: string; pos: number }>()('BlockDropAdd', ({ key, pos }) => {
  return { key, pos }
})
