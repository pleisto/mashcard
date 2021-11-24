import { EXCEL_CLAUSES, CORE_CLAUSES } from '.'
import { FunctionClause } from '..'

export * from './excel'
export * from './core'

export const BUILTIN_CLAUSES: FunctionClause[] = [...EXCEL_CLAUSES, ...CORE_CLAUSES]
