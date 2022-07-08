import { event } from '@mashcard/schema'
import { FormulaEventPayload, VariableDependency, VariableInterface } from '../type'

export const FormulaUpdatedViaId = event<FormulaEventPayload<VariableInterface>, Promise<void>>()(
  'FormulaUpdatedViaId',
  v => {
    return { id: `${v.namespaceId},${v.id}` }
  }
)

export const FormulaVariableDependencyUpdated = event<FormulaEventPayload<VariableDependency[]>, Promise<void>>()(
  'FormulaVariableDependencyUpdated',
  ({ id, namespaceId, username }) => {
    return { id: `${username}#${namespaceId},${id}` }
  }
)
