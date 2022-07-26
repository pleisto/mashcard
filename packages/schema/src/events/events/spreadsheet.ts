import { Block } from '../../MashcardModels'
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

export const SpreadsheetUpdateCellValueByIdx = event<{
  parentId: string
  rowIdx: number
  columnIdx: number
  value: string
}>({ sticky: true })('SpreadsheetUpdateCellValue', ({ parentId, rowIdx, columnIdx, value }) => {
  return { id: `${parentId},${rowIdx},${columnIdx}` }
})

export const SpreadsheetAddRow = event<{ parentId: string; idx?: number }>()('SpreadsheetAddRow', ({ parentId }) => {
  return { id: parentId }
})

export const SpreadsheetAddColumn = event<{ parentId: string; idx?: number }>()(
  'SpreadsheetAddColumn',
  ({ parentId }) => {
    return { id: parentId }
  }
)
