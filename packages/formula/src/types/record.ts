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
  dump: ({ result, meta, ...rest }, dumpF) => ({ ...rest, result: mapValues(result, a => dumpF(a)) }),
  cast: ({ result, ...rest }, ctx, castF) => {
    const record = mapValues(result, a => castF(a, ctx))
    return { ...rest, result: record, meta: extractSubType(Object.values(record)) }
  }
}
