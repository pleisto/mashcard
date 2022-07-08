import { CstNode } from 'chevrotain'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Cst' as const

export type FormulaCstType = BaseResult<typeof TypeName, CstNode>

export const FormulaCstAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => ({ ...rest, result: 'Not supported' }),
  cast: rest => ({ ...rest, result: 'Not supported', meta: 'runtime', type: 'Error' }),
  display: rest => ({ ...rest, result: '#<Cst>' })
}
