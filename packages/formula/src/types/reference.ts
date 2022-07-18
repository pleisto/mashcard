import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Reference' as const
const ShortName = 'ref' as const

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

export const FormulaReferenceAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => ({ ...rest, result: 'other.not_supported' }),
  cast: rest => ({ ...rest, result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }),
  display: rest => ({ ...rest, result: '#<Reference>' })
}
