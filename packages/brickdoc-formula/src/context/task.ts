import { FunctionContext, VariableTask, VariableValue } from '../types'
import { v4 as uuid } from 'uuid'
import { BrickdocEventBus } from '@brickdoc/schema'
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

// interface Deferred {
//   promise: Promise<unknown>
//   cancel: any
// }

// const deferred = (ms: number): Deferred => {
//   let cancel
//   const promise = new Promise((resolve, reject) => {
//     cancel = reject
//     setTimeout(resolve, ms)
//   })
//   return { promise, cancel }
// }

// const debounce = (task: (arg0: any) => any, ms: number): ((...args: any[]) => Promise<void>) => {
//   let t: Deferred = { promise: null, cancel: () => {} }
//   return async (...args) => {
//     try {
//       t.cancel()
//       t = deferred(ms)
//       await t.promise
//       await task(...args)
//     } catch (_) {
//       /* prevent memory leak */
//     }
//   }
// }

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
    BrickdocEventBus.dispatch(FormulaTaskStarted({ task, namespaceId, variableId }))
    void variableValue.then(value => {
      const newTask: VariableTask = { ...task, variableValue: value, execEndTime: new Date(), async: false }
      BrickdocEventBus.dispatch(FormulaTaskCompleted({ task: newTask, namespaceId, variableId }))
    })
  })
  return task
}
