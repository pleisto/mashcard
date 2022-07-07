import { AnyTypeResult, FunctionContext, FunctionResult, PredicateFunction } from '../type'
import { ControlType } from '../controls'
import { devLog } from '@mashcard/design-system'
export type Lambda = VoidFunction

export const functionResult2lambda = <T extends ControlType>(
  ctx: FunctionContext,
  { result, type }: FunctionResult,
  ctrl: T
): Lambda => {
  if (type !== 'Function') {
    throw new Error('functionResult2lambda: type is not Function')
  }

  result.forEach(({ name }) => {
    if (name !== 'Set') {
      throw new Error('Only Set is supported')
    }
  })

  return () => {
    result.forEach(({ args: [ref, cst] }) => {
      if (ref.type !== 'Reference') {
        throw new Error('Only Reference is supported')
      }

      if (cst.type !== 'Cst') {
        throw new Error('Only Cst is supported')
      }

      const reference = ref.result
      const cstdata = cst.result

      if (reference.kind === 'variable') {
        const variable = ctx.formulaContext.findVariableById(reference.namespaceId, reference.variableId)!

        if (variable.t.variableParseResult.kind === 'expression') {
          throw new Error('Only constant variable is supported')
        }

        // variable.updateCst(cstdata, ctx.interpretContext)
      } else if (reference.kind === 'self' && reference.attribute) {
        devLog('self', { reference, cstdata })
      }
    })

    devLog('lambda called', { ctx, result, ctrl })
  }
}

export const buildPredicate = ({ result, meta: { operator } }: AnyTypeResult<'Predicate'>): PredicateFunction => {
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
