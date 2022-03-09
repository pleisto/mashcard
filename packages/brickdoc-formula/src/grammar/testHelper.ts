import { VariableData, FunctionContext } from '../types'
import { VariableClass } from '../context/variable'
import { innerInterpret, parse } from './core'

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
  const execStartTime = new Date()
  const variableValue = await innerInterpret({ parseResult, ctx })

  const variable: VariableData = {
    namespaceId,
    variableId,
    name,
    execStartTime,
    execEndTime: new Date(),
    dirty: true,
    valid: true,
    definition: input,
    cst,
    type,
    version,
    async: false,
    kind: kind ?? 'constant',
    codeFragments,
    variableValue,
    blockDependencies,
    variableDependencies,
    variableNameDependencies,
    functionDependencies,
    flattenVariableDependencies
  }

  await new VariableClass({ t: variable, formulaContext }).save()
}
