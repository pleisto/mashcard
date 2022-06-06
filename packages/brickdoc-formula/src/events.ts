import { BrickdocEventBus, event } from '@brickdoc/schema'
import { ContextState } from './context'
import { Column, Row } from './controls'
import { FormulaEventPayload, VariableInterface, VariableTask } from './types'

export const FormulaTickViaId = event<{
  uuid: string
  variableId: string
  namespaceId: string
}>()('FormulaTickViaId', ({ variableId, namespaceId }) => {
  return { id: `${namespaceId},${variableId}` }
})

export const FormulaUpdatedViaId = event<FormulaEventPayload<VariableInterface>>()('FormulaUpdatedViaId', v => {
  return { id: `${v.namespaceId},${v.id}` }
})

export const FormulaInnerRefresh = event<FormulaEventPayload<null>>()('FormulaInnerRefresh', ({ namespaceId, id }) => {
  return { id: `${namespaceId},${id}` }
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

export const FormulaBlockNameChangedOrDeleted = event<FormulaEventPayload<{ name: string; deleted: boolean }>>()(
  'FormulaBlockNameChangedOrDeleted',
  ({ id }) => {
    return { id }
  }
)

export const dispatchFormulaBlockNameChangeOrDelete = ({
  id,
  name,
  deleted
}: {
  id: string
  name: string
  deleted: boolean
}): void => {
  BrickdocEventBus.dispatch(
    FormulaBlockNameChangedOrDeleted({ id, namespaceId: id, key: id, scope: null, meta: { name, deleted } })
  )
}

export type SpreadsheetUpdateNameViaIdPayload = FormulaEventPayload<null>

export const SpreadsheetReloadViaId = event<SpreadsheetUpdateNameViaIdPayload>()(
  'SpreadsheetReloadViaId',
  ({ id, namespaceId }) => {
    return { id: `${namespaceId},${id}` }
  }
)

export const SpreadsheetUpdateNameViaId = event<FormulaEventPayload<string>>()(
  'SpreadsheetUpdateNameViaId',
  ({ id, namespaceId }) => {
    return { id: `${namespaceId},${id}` }
  }
)

export const FormulaContextNameChanged = event<FormulaEventPayload<{ name: string; kind: string }>>()(
  'FormulaContextNameChanged',
  ({ namespaceId, meta: { name } }) => {
    return { id: `${namespaceId}#${name}` }
  }
)

export const FormulaContextNameRemove = event<FormulaEventPayload<{ name: string; kind: string }>>()(
  'FormulaContextNameRemove',
  ({ namespaceId, meta: { name } }) => {
    return { id: `${namespaceId}#${name}` }
  }
)

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
  columns: Column[]
  key: string
}>()('SpreadsheetUpdateColumnsViaId', ({ spreadsheetId, namespaceId }) => {
  return { id: `${namespaceId},${spreadsheetId}` }
})

export const FormulaContextTickTrigger = event<{ domain: string; state: ContextState }>()(
  'FormulaContextTickTrigger',
  ({ domain, state }) => {
    return { id: `FormulaContext#${domain}` }
  }
)
