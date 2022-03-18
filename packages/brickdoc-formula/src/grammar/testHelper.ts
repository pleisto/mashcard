import { FunctionContext } from '../types'
import { interpret, parse } from './core'

export const quickInsert = async ({ ctx }: { ctx: FunctionContext }): Promise<void> => {
  const parseResult = parse({ ctx })
  if (!parseResult.success) {
    throw new Error(parseResult.errorMessages[0]!.message)
  }

  const variable = await interpret({ parseResult, ctx })
  await variable.t.task.variableValue
  variable.save()
}
