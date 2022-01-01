import { CstNode } from 'chevrotain'
import { FunctionContext, FunctionResult, Reference, PredicateFunction, PredicateResult } from '../types'
import { ControlType } from '../controls'
export type Lambda = VoidFunction

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
        const variable = ctx.formulaContext.findVariable(reference.namespaceId, reference.variableId)!

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

export const buildPredicate = ({ result: { result }, operator }: PredicateResult): PredicateFunction => {
  switch (operator) {
    case 'equal':
      return input => input === result
    case 'notEqual':
      return input => input !== result
    case 'greaterThan':
      return input => input > result
    case 'greaterThanEqual':
      return input => input >= result
    case 'lessThan':
      return input => input < result
    case 'lessThanEqual':
      return input => input <= result
  }
}
