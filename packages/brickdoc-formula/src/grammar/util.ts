import { AnyTypeResult, ErrorMessage, ErrorResult, ExpressionType, FormulaType, FunctionContext } from '../types'

export const extractSubType = (array: AnyTypeResult[]): FormulaType => {
  const types = array.map(a => a.type)
  const uniqTypes = [...new Set(types)]

  if (uniqTypes.length === 0) {
    return 'void'
  }

  if (uniqTypes.length === 1) {
    return uniqTypes[0]
  }

  return 'any'
}

export const intersectType = (
  expectedArgumentType: ExpressionType,
  contextResultType: FormulaType,
  label: string,
  ctx: FunctionContext
): { errorMessages: ErrorMessage[]; newType: FormulaType } => {
  if (expectedArgumentType === undefined) {
    return { errorMessages: [], newType: contextResultType }
  }

  if (expectedArgumentType === 'any') {
    return { errorMessages: [], newType: contextResultType }
  }

  if (contextResultType === 'any') {
    return {
      errorMessages: [],
      newType: expectedArgumentType instanceof Array ? expectedArgumentType[0] : expectedArgumentType
    }
  }

  if (expectedArgumentType instanceof Array && expectedArgumentType.includes(contextResultType)) {
    return { errorMessages: [], newType: contextResultType }
  }

  if (expectedArgumentType === contextResultType) {
    return { errorMessages: [], newType: expectedArgumentType }
  }

  if (expectedArgumentType === 'Reference') {
    return { errorMessages: [], newType: expectedArgumentType }
  }
  if (expectedArgumentType === 'Cst') {
    return { errorMessages: [], newType: expectedArgumentType }
  }

  if (expectedArgumentType === 'Predicate') {
    return { errorMessages: [], newType: contextResultType }
  }

  if (contextResultType === 'Error') {
    return { errorMessages: [], newType: contextResultType }
  }

  // console.error({ expectedArgumentType, contextResultType, label, ctx })

  return {
    errorMessages: [{ type: 'type', message: `Expected ${expectedArgumentType} but got ${contextResultType}` }],
    newType: contextResultType
  }
}

export const runtimeCheckType = (
  expectedArgumentType: ExpressionType,
  contextResultType: FormulaType,
  label: string,
  ctx: FunctionContext
): ErrorResult | undefined => {
  const { errorMessages } = intersectType(expectedArgumentType, contextResultType, `[Runtime] ${label}`, ctx)

  if (errorMessages.length > 0) {
    const { type, message } = errorMessages[0]
    console.log('runtimeCheckType', { label, expectedArgumentType, contextResultType, errorMessages })
    return { type: 'Error', result: message, errorKind: type }
  }

  return undefined
}
