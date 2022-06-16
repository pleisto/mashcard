import { MashcardEventBus, event } from '@mashcard/schema'
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

export const FormulaTaskCompleted = event<
  { task: VariableTask; namespaceId: string; variableId: string; username: string },
  Promise<void>
>()('FormulaTaskCompleted', v => {
  return { id: `${v.username}#${v.namespaceId},${v.variableId}` }
})

/**
 * Dispatch Block Delete Event.
 */
export const dispatchFormulaBlockSoftDelete = async ({
  id,
  username
}: {
  id: string
  username: string
}): Promise<void> => {
  const result = MashcardEventBus.dispatch(FormulaDocSoftDeleted({ id, username }))
  await Promise.all(result)
}

export const FormulaDocSoftDeleted = event<{ id: string; username: string }, Promise<void>>()(
  'FormulaDocSoftDeleted',
  ({ id, username }) => {
    return { id: `${username}#${id}` }
  }
)

export const FormulaBlockNameChangedTrigger = event<FormulaEventPayload<string>, Promise<void>>()(
  'FormulaBlockNameChangedTrigger',
  ({ id, username }) => {
    return { id: `${username}#${id}` }
  }
)

export const FormulaBlockNameDeletedTrigger = event<FormulaEventPayload<string>, Promise<void>>()(
  'FormulaBlockNameDeletedTrigger',
  ({ id, username }) => {
    return { id: `${username}#${id}` }
  }
)

export const FormulaBlockNameModifiedWithUsername = event<FormulaEventPayload<string>, Promise<void>>()(
  'FormulaBlockNameModifiedWithUsername',
  ({ id, username }) => {
    return { id: username }
  }
)

/**
 * Dispatch Block Rename Event.
 */
export const dispatchFormulaBlockNameChange = async ({
  id,
  name,
  username
}: {
  id: string
  name: string
  username: string
}): Promise<void> => {
  const result1 = MashcardEventBus.dispatch(
    FormulaBlockNameModifiedWithUsername({
      id,
      namespaceId: id,
      key: id,
      scope: null,
      username,
      meta: name
    })
  )
  await Promise.all(result1)

  const result2 = MashcardEventBus.dispatch(
    FormulaBlockNameChangedTrigger({ id, namespaceId: id, key: id, scope: null, username, meta: name })
  )
  await Promise.all(result2)
}

export type SpreadsheetUpdateNamePayload = FormulaEventPayload<null>

export const SpreadsheetReloadViaId = event<SpreadsheetUpdateNamePayload, Promise<void>>()(
  'SpreadsheetReloadViaId',
  ({ id, namespaceId }) => {
    return { id: `${namespaceId},${id}` }
  }
)

export const dispatchFormulaSpreadsheetNameChange = async ({
  namespaceId,
  username,
  title,
  spreadsheetId
}: {
  namespaceId: string
  username: string | undefined
  title: string
  spreadsheetId: string
}): Promise<void> => {
  if (!username) return
  const result = MashcardEventBus.dispatch(
    SpreadsheetUpdateNameViaId({
      username,
      id: spreadsheetId,
      meta: title,
      scope: null,
      key: spreadsheetId,
      namespaceId
    })
  )
  await Promise.all(result)
}

export const dispatchFormulaSpreadsheetRemove = async ({
  id,
  username
}: {
  id: string
  username: string | undefined
}): Promise<void> => {
  if (!username) return
  const result = MashcardEventBus.dispatch(FormulaSpreadsheetDeleted({ id, username }))
  await Promise.all(result)
}

export const dispatchFormulaSpreadsheetRowChange = async ({
  spreadsheetId,
  username,
  namespaceId,
  rows
}: {
  spreadsheetId: string
  username: string | undefined
  namespaceId: string
  rows: Row[]
}): Promise<void> => {
  if (!username) return
  const result = MashcardEventBus.dispatch(
    SpreadsheetUpdateRowsViaId({
      spreadsheetId,
      rows,
      username,
      key: spreadsheetId,
      namespaceId
    })
  )
  await Promise.all(result)
}

export const dispatchFormulaSpreadsheetColumnChange = async ({
  spreadsheetId,
  username,
  namespaceId,
  columns
}: {
  spreadsheetId: string
  username: string | undefined
  namespaceId: string
  columns: Column[]
}): Promise<void> => {
  if (!username) return
  const result = MashcardEventBus.dispatch(
    SpreadsheetUpdateColumnsViaId({
      spreadsheetId,
      columns,
      username,
      key: spreadsheetId,
      namespaceId
    })
  )
  await Promise.all(result)
}

export const FormulaSpreadsheetDeleted = event<{ id: string; username: string }, Promise<void>>()(
  'FormulaSpreadsheetDeleted',
  ({ id, username }) => {
    return { id: `${username}#${id}` }
  }
)

export const SpreadsheetUpdateNameViaId = event<FormulaEventPayload<string>, Promise<void>>()(
  'SpreadsheetUpdateNameViaId',
  ({ username, id, namespaceId }) => {
    return { id: `${username}#${namespaceId},${id}` }
  }
)

export const FormulaContextNameChanged = event<FormulaEventPayload<{ name: string; kind: string }>, Promise<void>>()(
  'FormulaContextNameChanged',
  ({ username, namespaceId, meta: { name } }) => {
    return { id: `${username}#${namespaceId}#${name}` }
  }
)

export const FormulaContextNameRemove = event<FormulaEventPayload<{ name: string; kind: string }>, Promise<void>>()(
  'FormulaContextNameRemove',
  ({ username, namespaceId, meta: { name } }) => {
    return { id: `${username}#${namespaceId}#${name}` }
  }
)

export const SpreadsheetUpdateRowsViaId = event<
  {
    spreadsheetId: string
    namespaceId: string
    rows: Row[]
    username: string
    key: string
  },
  Promise<void>
>()('SpreadsheetUpdateRowsViaId', ({ username, spreadsheetId, namespaceId }) => {
  return { id: `${username}#${namespaceId},${spreadsheetId}` }
})

export const SpreadsheetUpdateColumnsViaId = event<
  {
    spreadsheetId: string
    namespaceId: string
    columns: Column[]
    username: string
    key: string
  },
  Promise<void>
>()('SpreadsheetUpdateColumnsViaId', ({ username, spreadsheetId, namespaceId }) => {
  return { id: `${username}#${namespaceId},${spreadsheetId}` }
})

export const FormulaContextTickTrigger = event<{ domain: string; state: ContextState }, Promise<void>>()(
  'FormulaContextTickTrigger',
  ({ domain, state }) => {
    return { id: `FormulaContext#${domain}` }
  }
)
