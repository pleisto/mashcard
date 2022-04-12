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

export interface SpreadsheetReloadViaIdPayload {
  spreadsheetId: string
  namespaceId: string
  scope?: any
  key?: string
}

export const SpreadsheetReloadViaId = event<SpreadsheetReloadViaIdPayload>()(
  'SpreadsheetReloadViaId',
  ({ spreadsheetId, namespaceId, key }) => {
    return { id: `${namespaceId},${spreadsheetId}` }
  }
)

export interface SpreadsheetUpdateNameViaIdPayload {
  scopes?: any[]
  spreadsheetId: string
  namespaceId: string
  name: string
  scope?: any
  key: string
}

export const SpreadsheetUpdateNameViaId = event<SpreadsheetUpdateNameViaIdPayload>()(
  'SpreadsheetUpdateNameViaId',
  ({ spreadsheetId, namespaceId, name, key }) => {
    return { id: `${namespaceId},${spreadsheetId}` }
  }
)

export const SpreadsheetUpdateRowsViaId = event<{
  spreadsheetId: string
  namespaceId: string
  rows: any
  key: string
}>()('SpreadsheetUpdateRowsViaId', ({ spreadsheetId, namespaceId, rows, key }) => {
  return { id: `${namespaceId},${spreadsheetId}` }
})

export const SpreadsheetUpdateColumnsViaId = event<{
  spreadsheetId: string
  namespaceId: string
  columns: any
  key: string
}>()('SpreadsheetUpdateColumnsViaId', ({ spreadsheetId, namespaceId, columns, key }) => {
  return { id: `${namespaceId},${spreadsheetId}` }
})
