import { MashcardEventBus, event } from '@mashcard/schema'
import { Row } from '../controls'

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
