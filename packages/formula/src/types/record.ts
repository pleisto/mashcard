import { extractSubType } from '../grammar'
import { AnyTypeResult, BaseResult, FormulaType, FormulaTypeAttributes } from '../type'
import { mapValues } from 'lodash'

const TypeName = 'Record' as const

export type FormulaRecordType = BaseResult<
  typeof TypeName,
  { [key: string]: AnyTypeResult },
  Record<string, any>,
  FormulaType
>

export const FormulaRecordAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: ({ result, meta, ...rest }, f) => ({ ...rest, result: mapValues(result, a => f(a)) }),
  cast: ({ result, ...rest }, ctx, f) => {
    const record = mapValues(result, a => f(a, ctx))
    return { ...rest, result: record, meta: extractSubType(Object.values(record)) }
  },
  display: ({ result, meta, ...rest }, f) => {
    const recordArray = Object.entries(result).map(([key, value]) => `${key}: ${f(value).result}`)
    const recordResult = recordArray.join(', ')
    return { ...rest, result: `{${recordResult}}` }
  }
}
