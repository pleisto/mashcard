import { FunctionClause } from '..'
import { CORE_CLAUSES } from './core'
import { DATABASE_CLAUSES } from './database'
import { EXCEL_CLAUSES } from './excel'
import { THIRD_CLAUSES } from './third'

export const BUILTIN_CLAUSES: FunctionClause[] = [...EXCEL_CLAUSES, ...CORE_CLAUSES, ...DATABASE_CLAUSES, ...THIRD_CLAUSES]
