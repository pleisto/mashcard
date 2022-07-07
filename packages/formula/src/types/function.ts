import { AnyTypeResult, BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Function' as const

type FormulaFunctionKind = 'Set' | 'Lambda'

interface FormulaFunction {
  name: FormulaFunctionKind
  args: Array<AnyTypeResult<'Cst' | 'Reference'>>
}

export type FormulaFunctionType = BaseResult<typeof TypeName, [FormulaFunction, ...FormulaFunction[]]>

export const FormulaFunctionAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => ({ ...rest, result: 'Not supported' }),
  cast: rest => ({ ...rest, result: 'Not supported', meta: 'runtime', type: 'Error' })
}
