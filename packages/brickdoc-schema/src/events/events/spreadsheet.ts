import { Block } from '../../BrickdocModels'
import { event } from '../event'

export const loadSpreadsheetBlocks = event<string>()('loadSpreadsheetBlocks', (parentId: string) => {
  return { id: parentId }
})

export const SpreadsheetLoaded = event<{ parentId: string; blocks: Block[] }>()(
  'SpreadsheetLoaded',
  ({ parentId, blocks }) => {
    return { id: parentId }
  }
)

export const SpreadsheetUpdateCellValue = event<{ parentId: string; cellId: string; value: string }>()(
  'SpreadsheetUpdateCellValue',
  ({ parentId, cellId, value }) => {
    return { id: `${parentId},${cellId}` }
  }
)
