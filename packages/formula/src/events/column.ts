import { event, MashcardEventBus } from '@mashcard/schema'
import { Column } from '../controls'

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
