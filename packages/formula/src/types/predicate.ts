import { ColumnType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Predicate' as const

export type PredicateOperator = 'equal' | 'notEqual' | 'greaterThan' | 'greaterThanEqual' | 'lessThan' | 'lessThanEqual'

export type FormulaPredicateType = BaseResult<
  typeof TypeName,
  number | string,
  string,
  { column?: ColumnType; operator: PredicateOperator }
>

export const FormulaPredicateAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => ({ ...rest, result: 'Not supported' }),
  cast: rest => ({ ...rest, result: 'Not supported', meta: 'runtime', type: 'Error' }),
  display: ({ result, meta }) => `[${meta.operator}] ${result}`
}
