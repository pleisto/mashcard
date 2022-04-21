import { event } from '../event'
import { BlockMeta } from '../../BrickdocModels'

export const DocMetaLoaded = event<{ id: string; meta: BlockMeta }>()('DocMetaLoaded', ({ id }) => {
  return { id }
})

export const UpdateDocMeta = event<{ id: string; meta: BlockMeta }>()('UpdateDocMeta', ({ id }) => {
  return { id }
})
