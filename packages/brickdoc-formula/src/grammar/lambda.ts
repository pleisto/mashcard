import { CstNode } from 'chevrotain'
import { ContextInterface, ControlType, FunctionResult, Reference } from '..'

export type Lambda = () => void

export const functionResult2lambda = (ctx: ContextInterface, { result }: FunctionResult, ctrl: ControlType): Lambda => {
  if (result.name !== 'Set') {
    throw new Error('Only Set is supported')
  }

  const [ref, cst] = result.args
  // console.log({ ref, cst, ctrl })

  const reference = ref.result as Reference
  const cstdata = cst.result as CstNode

  if (reference.kind !== 'variable') {
    throw new Error('Only variable reference is supported')
  }

  return () => {
    if (reference.kind === 'variable') {
      const variable = ctx.findVariable(reference.namespaceId, reference.variableId)!

      if (variable.t.kind === 'expression') {
        throw new Error('Only variable reference is supported')
      }

      variable.updateCst(cstdata)
    }
    // ctrl.name = 'Clicked'
    console.log(`Button clicked`)
  }
}
