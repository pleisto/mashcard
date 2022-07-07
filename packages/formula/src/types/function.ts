import { AnyTypeResult, BaseResult } from '../type'

type FormulaFunctionKind = 'Set' | 'Lambda'

interface FormulaFunction {
  name: FormulaFunctionKind
  args: Array<AnyTypeResult<'Cst' | 'Reference'>>
}

export type FormulaFunctionType = BaseResult<'Function', [FormulaFunction, ...FormulaFunction[]]>
