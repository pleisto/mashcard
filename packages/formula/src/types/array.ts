import { extractSubType } from '../grammar'
import { AnyTypeResult, BaseResult, FormulaType, FormulaTypeAttributes } from '../type'

const TypeName = 'Array' as const

export type FormulaArrayType = BaseResult<typeof TypeName, AnyTypeResult[], any[], FormulaType>

export const FormulaArrayAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: ({ result, meta, ...rest }, dumpF) => ({ ...rest, result: result.map(a => dumpF(a)) }),
  cast: ({ result, ...rest }, ctx, castF) => {
    const array = result.map(a => castF(a, ctx))
    return { ...rest, result: array, meta: extractSubType(array) }
  }
}
