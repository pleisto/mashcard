import { ColumnType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Predicate' as const
const ShortName = 'predicate' as const

export type PredicateOperator = 'equal' | 'notEqual' | 'greaterThan' | 'greaterThanEqual' | 'lessThan' | 'lessThanEqual'

export type FormulaPredicateType = BaseResult<
  typeof TypeName,
  number | string,
  string,
  { column?: ColumnType; operator: PredicateOperator }
>

export const FormulaPredicateAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => ({ ...rest, result: 'other.not_supported' }),
  cast: rest => ({ ...rest, result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }),
  display: ({ result, meta, ...rest }) => ({ ...rest, result: `[${meta.operator}] ${result}` })
}
