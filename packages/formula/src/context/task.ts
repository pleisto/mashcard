import { FunctionContext, VariableTask, VariableValue } from '../type'
import { uuid } from '@mashcard/active-support'
import { MashcardEventBus } from '@mashcard/schema'
import { ParseResult } from '../grammar'
import { FormulaTaskCompleted } from '../events'

type TaskInput = (
  | {
      async: false
      variableValue: VariableValue
    }
  | {
      async: true
      variableValue: Promise<VariableValue>
    }
) & {
  parseResult: ParseResult
  ctx: FunctionContext
}

export const createVariableTask = ({
  async,
  variableValue,
  ctx: {
    formulaContext,
    meta: { namespaceId, variableId }
  }
}: TaskInput): VariableTask => {
  const now = new Date()
  if (!async) {
    return {
      async,
      variableValue,
      uuid: uuid(),
      execStartTime: now,
      execEndTime: now
    }
  }

  const task: VariableTask = {
    async,
    variableValue,
    uuid: uuid(),
    execStartTime: now,
    execEndTime: undefined
  }

  void variableValue.then(async value => {
    const newTask: VariableTask = { ...task, variableValue: value, execEndTime: new Date(), async: false }
    const result = MashcardEventBus.dispatch(
      FormulaTaskCompleted({ task: newTask, namespaceId, variableId, username: formulaContext.domain })
    )
    await Promise.all(result)
  })

  return task
}
