import { CellType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Cell' as const

export type FormulaCellType = BaseResult<typeof TypeName, CellType>

export const FormulaCellAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => ({ ...rest, result: 'Not supported' }),
  cast: rest => ({ ...rest, result: 'Not supported', meta: 'runtime', type: 'Error' })
}
