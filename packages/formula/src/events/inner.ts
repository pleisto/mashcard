import { event } from '@mashcard/schema'
import { ContextState } from '../context'
import { FormulaEventPayload, VariableTask } from '../type'

export const FormulaBlockNameDeletedTrigger = event<FormulaEventPayload<string>, Promise<void>>()(
  'FormulaBlockNameDeletedTrigger',
  ({ id, username }) => {
    return { id: `${username}#${id}` }
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

export const FormulaContextTickTrigger = event<{ username: string; state: ContextState }, Promise<void>>()(
  'FormulaContextTickTrigger',
  ({ username, state }) => {
    return { id: `FormulaContext#${username}` }
  }
)

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

export const FormulaTaskCompleted = event<
  { task: VariableTask; namespaceId: string; variableId: string; username: string },
  Promise<void>
>()('FormulaTaskCompleted', v => {
  return { id: `${v.username}#${v.namespaceId},${v.variableId}` }
})
