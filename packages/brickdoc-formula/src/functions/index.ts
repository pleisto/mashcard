import { FunctionClause, FunctionCompletion, FunctionGroup, FunctionKey, FunctionName } from '..'
import { CORE_API_CLAUSES } from './api'
import { CORE_DATABASE_CLAUSES } from './database'
import { CORE_DATE_CLAUSES } from './date'
import { CORE_LOGIC_CLAUSES } from './logic'
import { CORE_MATH_CLAUSES } from './math'
import { CORE_OBJECT_CLAUSES } from './object'
import { CORE_STATISTICAL_CLAUSES } from './statistical'
import { CORE_STRING_CLAUSES } from './string'
import { CORE_TEXT_CLAUSES } from './text'

export const buildFunctionKey = (group: FunctionGroup, name: FunctionName): FunctionKey => {
  if (group === 'core') {
    return name
  }
  return `${group}::${name}`
}

export const BUILTIN_CLAUSES: Array<FunctionClause<any>> = [
  ...CORE_API_CLAUSES,
  ...CORE_TEXT_CLAUSES,
  ...CORE_DATABASE_CLAUSES,
  ...CORE_STRING_CLAUSES,
  ...CORE_LOGIC_CLAUSES,
  ...CORE_MATH_CLAUSES,
  ...CORE_STATISTICAL_CLAUSES,
  ...CORE_DATE_CLAUSES,
  ...CORE_OBJECT_CLAUSES
].map(f => ({
  ...f,
  key: buildFunctionKey(f.group, f.name)
}))

export const function2completion = (functionClause: FunctionClause<any>, weight: number): FunctionCompletion => {
  return {
    kind: 'function',
    weight,
    name: functionClause.name,
    namespace: functionClause.group,
    value: functionClause.key,
    preview: functionClause
  }
}
