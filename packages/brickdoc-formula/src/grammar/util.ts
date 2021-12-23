import { AnyTypeResult, FormulaType } from '..'

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
