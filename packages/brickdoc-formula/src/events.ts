import { BrickdocEventBus, event } from '@brickdoc/schema'
import { ContextState } from './context'
import { Column, Row } from './controls'
import { FormulaEventPayload, VariableInterface, VariableTask } from './types'

export const FormulaTickViaId = event<
  {
    uuid: string
    variableId: string
    namespaceId: string
  },
  Promise<void>
>()('FormulaTickViaId', ({ variableId, namespaceId }) => {
  return { id: `${namespaceId},${variableId}` }
})

export const FormulaUpdatedViaId = event<FormulaEventPayload<VariableInterface>, Promise<void>>()(
  'FormulaUpdatedViaId',
  v => {
    return { id: `${v.namespaceId},${v.id}` }
  }
)

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

export const dispatchFormulaBlockSoftDelete = async ({
  id,
  username
}: {
  id: string
  username: string
}): Promise<void> => {
  const result = BrickdocEventBus.dispatch(FormulaDocSoftDeleted({ id, username }))
  await Promise.all(result)
}

export const FormulaDocSoftDeleted = event<{ id: string; username: string }, Promise<void>>()(
  'FormulaDocSoftDeleted',
  ({ id, username }) => {
    return { id: `${username}#${id}` }
  }
)

export const FormulaBlockNameChangedTrigger = event<
  FormulaEventPayload<{ name: string; username: string }>,
  Promise<void>
>()('FormulaBlockNameChangedTrigger', ({ id, meta: { username } }) => {
  return { id: `${username}#${id}` }
})

export const FormulaBlockNameDeletedTrigger = event<
  FormulaEventPayload<{ name: string; username: string }>,
  Promise<void>
>()('FormulaBlockNameDeletedTrigger', ({ id, meta: { username } }) => {
  return { id: `${username}#${id}` }
})

export const FormulaBlockNameModifiedWithUsername = event<
  FormulaEventPayload<{ name: string; username: string }>,
  Promise<void>
>()('FormulaBlockNameModifiedWithUsername', ({ id, meta: { username } }) => {
  return { id: username }
})

export const dispatchFormulaBlockNameChange = async ({
  id,
  name,
  username
}: {
  id: string
  name: string
  username: string
}): Promise<void> => {
  const result1 = BrickdocEventBus.dispatch(
    FormulaBlockNameModifiedWithUsername({ id, namespaceId: id, key: id, scope: null, meta: { name, username } })
  )
  await Promise.all(result1)

  const result2 = BrickdocEventBus.dispatch(
    FormulaBlockNameChangedTrigger({ id, namespaceId: id, key: id, scope: null, meta: { name, username } })
  )
  await Promise.all(result2)
}

export type SpreadsheetUpdateNameViaIdPayload = FormulaEventPayload<null>

export const SpreadsheetReloadViaId = event<SpreadsheetUpdateNameViaIdPayload, Promise<void>>()(
  'SpreadsheetReloadViaId',
  ({ id, namespaceId }) => {
    return { id: `${namespaceId},${id}` }
  }
)

export const SpreadsheetUpdateNameViaId = event<FormulaEventPayload<string>, Promise<void>>()(
  'SpreadsheetUpdateNameViaId',
  ({ id, namespaceId }) => {
    return { id: `${namespaceId},${id}` }
  }
)

export const FormulaContextNameChanged = event<FormulaEventPayload<{ name: string; kind: string }>, Promise<void>>()(
  'FormulaContextNameChanged',
  ({ namespaceId, meta: { name } }) => {
    return { id: `${namespaceId}#${name}` }
  }
)

export const FormulaContextNameRemove = event<FormulaEventPayload<{ name: string; kind: string }>, Promise<void>>()(
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

export const FormulaContextTickTrigger = event<{ domain: string; state: ContextState }, Promise<void>>()(
  'FormulaContextTickTrigger',
  ({ domain, state }) => {
    return { id: `FormulaContext#${domain}` }
  }
)
