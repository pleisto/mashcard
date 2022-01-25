import { VariableData, FunctionContext } from '../types'
import { VariableClass } from '../context/variable'
import { interpret, parse } from './core'

export const quickInsert = async ({ ctx }: { ctx: FunctionContext }): Promise<void> => {
  const {
    formulaContext,
    meta: { namespaceId, variableId, name, input, type }
  } = ctx
  const {
    success,
    cst,
    codeFragments,
    kind,
    level,
    version,
    errorMessages,
    variableDependencies,
    functionDependencies,
    blockDependencies,
    flattenVariableDependencies
  } = parse({ ctx })

  if (!success) {
    throw new Error(errorMessages[0]!.message)
  }

  const { variableValue, lazy } = await interpret({ parseResult: { cst, kind }, ctx })

  const variable: VariableData = {
    namespaceId,
    variableId,
    name,
    dirty: true,
    valid: true,
    definition: input,
    cst,
    type,
    version: lazy ? -1 : version,
    kind: kind ?? 'constant',
    codeFragments,
    variableValue,
    level,
    blockDependencies,
    variableDependencies,
    functionDependencies,
    flattenVariableDependencies
  }

  await new VariableClass({ t: variable, formulaContext }).save()
}