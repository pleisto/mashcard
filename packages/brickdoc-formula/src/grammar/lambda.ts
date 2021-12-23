import { CstNode } from 'chevrotain'
import { ControlType, FunctionContext, FunctionResult, Reference } from '..'

export type Lambda = () => void

export const functionResult2lambda = <T extends ControlType>(
  ctx: FunctionContext,
  { result }: FunctionResult,
  ctrl: T
): Lambda => {
  result.forEach(({ name }) => {
    if (name !== 'Set') {
      throw new Error('Only Set is supported')
    }
  })

  return () => {
    result.forEach(({ args: [ref, cst] }) => {
      const reference = ref.result as Reference
      const cstdata = cst.result as CstNode

      if (reference.kind === 'variable') {
        const variable = ctx.ctx.findVariable(reference.namespaceId, reference.variableId)!

        if (variable.t.kind === 'expression') {
          throw new Error('Only constant variable is supported')
        }

        variable.updateCst(cstdata, ctx.interpretContext)
      } else if (reference.kind === 'self' && reference.attribute) {
        console.log('self', { reference, cstdata })
      }
    })

    console.log('lambda called', { ctx, result, ctrl })
  }
}
