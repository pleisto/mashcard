import { event } from '@brickdoc/schema'
import { ContextState } from './context'
import { ColumnInitializer, Row } from './controls'
import { EventScope, VariableInterface, VariableTask } from './types'

export const FormulaInnerRefresh = event<{ namespaceId: string; variableId: string }>()(
  'FormulaInnerRefresh',
  ({ namespaceId, variableId }) => {
    return { id: `${namespaceId},${variableId}` }
  }
)

export const FormulaTickViaId = event<{
  uuid: string
  variableId: string
  namespaceId: string
}>()('FormulaTickViaId', ({ variableId, namespaceId }) => {
  return { id: `${namespaceId},${variableId}` }
})

export const FormulaUpdatedViaId = event<VariableInterface>()('FormulaUpdatedViaId', v => {
  return { id: `${v.t.namespaceId},${v.t.variableId}` }
})

export const FormulaUpdatedDraftTViaId = event<VariableInterface>()('FormulaUpdatedDraftTViaId', v => {
  return { id: `${v.t.namespaceId},${v.t.variableId}` }
})

export const FormulaTaskStarted = event<{ task: VariableTask; namespaceId: string; variableId: string }>()(
  'FormulaTaskStarted',
  v => {
    return { id: `${v.namespaceId},${v.variableId}` }
  }
)

export const FormulaTaskCompleted = event<{ task: VariableTask; namespaceId: string; variableId: string }>()(
  'FormulaTaskCompleted',
  v => {
    return { id: `${v.namespaceId},${v.variableId}` }
  }
)

export const SpreadsheetReloadViaId = event<{
  spreadsheetId: string
  namespaceId: string
  scope?: EventScope
  key?: string
}>()('SpreadsheetReloadViaId', ({ spreadsheetId, namespaceId }) => {
  return { id: `${namespaceId},${spreadsheetId}` }
})

export const SpreadsheetUpdateNameViaId = event<{
  spreadsheetId: string
  namespaceId: string
  name: string
  key: string
}>()('SpreadsheetUpdateNameViaId', ({ spreadsheetId, namespaceId }) => {
  return { id: `${namespaceId},${spreadsheetId}` }
})

export const SpreadsheetUpdateRowsViaId = event<{
  spreadsheetId: string
  namespaceId: string
  rows: Row[]
  key: string
}>()('SpreadsheetUpdateRowsViaId', ({ spreadsheetId, namespaceId }) => {
  return { id: `${namespaceId},${spreadsheetId}` }
})

export const SpreadsheetUpdateColumnsViaId = event<{
  spreadsheetId: string
  namespaceId: string
  columns: ColumnInitializer[]
  key: string
}>()('SpreadsheetUpdateColumnsViaId', ({ spreadsheetId, namespaceId }) => {
  return { id: `${namespaceId},${spreadsheetId}` }
})

export const FormulaContextNameChanged = event<{
  id: string
  namespaceId: string
  name: string
  kind: string
}>()('FormulaContextNameChanged', ({ namespaceId, name }) => {
  return { id: `${namespaceId}#${name}` }
})

export const FormulaContextNameRemove = event<{
  id: string
  namespaceId: string
  name: string
  kind: string
}>()('FormulaContextNameRemove', ({ id, namespaceId, name }) => {
  return { id: `${namespaceId}#${name}` }
})

export const FormulaContextTickTrigger = event<{ domain: string; state: ContextState }>()(
  'FormulaContextTickTrigger',
  ({ domain, state }) => {
    return { id: `FormulaContext#${domain}` }
  }
)
