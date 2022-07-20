import { extractSubType } from '../grammar'
import { AnyTypeResult, BaseResult, FormulaType, FormulaTypeAttributes } from '../type'

const TypeName = 'Array' as const
const ShortName = 'array' as const

export type FormulaArrayType = BaseResult<typeof TypeName, AnyTypeResult[], any[], FormulaType>

export const FormulaArrayAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: ({ result, meta, ...rest }, f) => ({ ...rest, result: result.map(a => f(a)) }),
  cast: ({ result, ...rest }, ctx, f) => {
    const array = result.map(a => f(a, ctx))
    return { ...rest, result: array, meta: extractSubType(array) }
  },
  display: ({ result, meta, ...rest }, ctx, f) => ({
    ...rest,
    result: `[${result.map(v => f(v, ctx).result).join('')}]`
  })
}
