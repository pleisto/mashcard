import { MashcardEventBus, event } from '@mashcard/schema'
import { FormulaEventPayload } from '../type'

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

export const FormulaBlockNameModifiedWithUsername = event<FormulaEventPayload<string>, Promise<void>>()(
  'FormulaBlockNameModifiedWithUsername',
  ({ id, username }) => {
    return { id: username }
  }
)

export const FormulaBlockNameChangedTrigger = event<FormulaEventPayload<string>, Promise<void>>()(
  'FormulaBlockNameChangedTrigger',
  ({ id, username }) => {
    return { id: `${username}#${id}` }
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
  const newName = name || 'Untitled'

  const result1 = MashcardEventBus.dispatch(
    FormulaBlockNameModifiedWithUsername({
      id,
      namespaceId: id,
      source: [{ id, type: 'nameChange' }],
      scope: null,
      username,
      meta: newName
    })
  )
  await Promise.all(result1)

  const result2 = MashcardEventBus.dispatch(
    FormulaBlockNameChangedTrigger({
      id,
      namespaceId: id,
      source: [{ id, type: 'nameChange' }],
      scope: null,
      username,
      meta: newName
    })
  )
  await Promise.all(result2)
}
