import { FunctionContext, VariableTask, VariableValue } from '../types'
import { uuid } from '@mashcard/active-support'
import { MashcardEventBus } from '@mashcard/schema'
import { ParseResult } from '../grammar'
import { FormulaTaskCompleted, FormulaTaskStarted } from '../events'

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

  setTimeout(() => {
    MashcardEventBus.dispatch(FormulaTaskStarted({ task, namespaceId, variableId }))
    void variableValue.then(value => {
      const newTask: VariableTask = { ...task, variableValue: value, execEndTime: new Date(), async: false }
      MashcardEventBus.dispatch(FormulaTaskCompleted({ task: newTask, namespaceId, variableId }))
    })
  })
  return task
}
