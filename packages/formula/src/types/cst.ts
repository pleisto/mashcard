import { CstNode } from 'chevrotain'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Cst' as const
const ShortName = 'cst' as const

export type FormulaCstType = BaseResult<typeof TypeName, CstNode>

export const FormulaCstAttributes: FormulaTypeAttributes<typeof TypeName, typeof ShortName> = {
  type: TypeName,
  shortName: ShortName,
  dump: rest => ({ ...rest, result: 'other.not_supported' }),
  cast: rest => ({ ...rest, result: { message: 'other.not_supported', type: 'runtime' }, type: 'Error' }),
  display: rest => ({ ...rest, result: '#<Cst>' })
}
