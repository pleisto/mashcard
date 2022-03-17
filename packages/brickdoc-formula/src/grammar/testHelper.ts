import { VariableData, FunctionContext } from '../types'
import { VariableClass } from '../context/variable'
import { innerInterpret, parse } from './core'
import { createVariableTask } from '../context'

export const quickInsert = async ({ ctx }: { ctx: FunctionContext }): Promise<void> => {
  const {
    formulaContext,
    meta: { namespaceId, variableId, name, input, type }
  } = ctx
  const parseResult = parse({ ctx })
  const {
    success,
    cst,
    codeFragments,
    kind,
    async,
    pure,
    effect,
    version,
    errorMessages,
    variableDependencies,
    variableNameDependencies,
    functionDependencies,
    blockDependencies,
    flattenVariableDependencies
  } = parseResult

  if (!success) {
    throw new Error(errorMessages[0]!.message)
  }
  const variableValue = await innerInterpret({ parseResult, ctx })
  const task = createVariableTask({ namespaceId, variableId, async: false, variableValue })

  const variable: VariableData = {
    namespaceId,
    variableId,
    task,
    name,
    valid: true,
    definition: input,
    cst,
    type,
    version,
    isAsync: async,
    isEffect: effect,
    isPure: pure,
    kind: kind ?? 'constant',
    codeFragments,
    blockDependencies,
    variableDependencies,
    variableNameDependencies,
    functionDependencies,
    flattenVariableDependencies
  }

  new VariableClass({ t: variable, formulaContext }).save()
}
