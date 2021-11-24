import { FunctionClause } from '../..'
import { OBJECT_CLAUSES } from './object'
import { STRING_CLAUSES } from './string'
import { API_CLAUSES } from './api'

export const CORE_CLAUSES: FunctionClause[] = [...OBJECT_CLAUSES, ...STRING_CLAUSES, ...API_CLAUSES]
