import { ColumnType } from '../controls'
import { BaseResult } from '../type'

export type PredicateOperator = 'equal' | 'notEqual' | 'greaterThan' | 'greaterThanEqual' | 'lessThan' | 'lessThanEqual'

export type FormulaPredicateType = BaseResult<
  'Predicate',
  number | string,
  { column?: ColumnType; operator: PredicateOperator }
>
