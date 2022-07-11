import { MashcardEventBus, event } from '@mashcard/schema'
import { FormulaEventPayload } from '../type'

export type SpreadsheetUpdateNamePayload = FormulaEventPayload<null>

export const SpreadsheetReloadViaId = event<SpreadsheetUpdateNamePayload, Promise<void>>()(
  'SpreadsheetReloadViaId',
  ({ id, namespaceId }) => {
    return { id: `${namespaceId},${id}` }
  }
)

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
      meta: title || 'UntitledSpreadsheet',
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
