import { FunctionClause } from '../..'
import { DATE_CLAUSES } from './date'
import { LOGIC_CLAUSES } from './logic'
import { MATH_CLAUSES } from './math'
import { STATISTICAL_CLAUSES } from './statistical'
import { TEXT_CLAUSES } from './text'

export const EXCEL_CLAUSES: FunctionClause[] = [...MATH_CLAUSES, ...LOGIC_CLAUSES, ...TEXT_CLAUSES, ...STATISTICAL_CLAUSES, ...DATE_CLAUSES]
