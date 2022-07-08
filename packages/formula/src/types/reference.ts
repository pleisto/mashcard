import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Reference' as const

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

export type FormulaReferenceType = BaseResult<typeof TypeName, Reference>

export const FormulaReferenceAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => ({ ...rest, result: 'Not supported' }),
  cast: rest => ({ ...rest, result: 'Not supported', meta: 'runtime', type: 'Error' }),
  display: rest => ({ ...rest, result: '#<Reference>' })
}
