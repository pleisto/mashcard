import { BaseResult } from '../type'

type Reference = VariableReference | SelfReference

interface BaseReference {
  attribute?: string
  kind: 'variable' | 'self'
}

interface VariableReference extends BaseReference {
  kind: 'variable'
  variableId: string
  namespaceId: string
}

interface SelfReference extends BaseReference {
  kind: 'self'
}

export type FormulaReferenceType = BaseResult<'Reference', Reference>
