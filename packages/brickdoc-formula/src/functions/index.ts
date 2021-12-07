import { FunctionClause, FunctionCompletion, FunctionGroup, FunctionKey, FunctionName } from '..'
import { CORE_CLAUSES } from './core'
import { DATABASE_CLAUSES } from './database'
import { EXCEL_CLAUSES } from './excel'
import { THIRD_CLAUSES } from './third'

export const BUILTIN_CLAUSES: FunctionClause[] = [...EXCEL_CLAUSES, ...CORE_CLAUSES, ...DATABASE_CLAUSES, ...THIRD_CLAUSES]

// TODO remove this
const functionKey = (group: FunctionGroup, name: FunctionName): FunctionKey => `${group}::${name}`

export const function2completion = (functionClause: FunctionClause, weight: number): FunctionCompletion => {
  return {
    kind: 'function',
    weight,
    name: functionClause.name,
    namespace: functionClause.group,
    value: functionKey(functionClause.group, functionClause.name),
    preview: functionClause
  }
}
