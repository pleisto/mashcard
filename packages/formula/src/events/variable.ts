import { event } from '@mashcard/schema'
import { FormulaEventPayload, VariableInterface } from '../types'

export const FormulaUpdatedViaId = event<FormulaEventPayload<VariableInterface>, Promise<void>>()(
  'FormulaUpdatedViaId',
  v => {
    return { id: `${v.namespaceId},${v.id}` }
  }
)
