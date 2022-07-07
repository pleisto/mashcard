import { SwitchType } from '../controls'
import { BaseResult, FormulaTypeAttributes } from '../type'

const TypeName = 'Switch' as const

export type FormulaSwitchType = BaseResult<typeof TypeName, SwitchType>

export const FormulaSwitchAttributes: FormulaTypeAttributes<typeof TypeName> = {
  type: TypeName,
  dump: rest => ({ ...rest, result: 'Not supported' }),
  cast: rest => ({ ...rest, result: 'Not supported', meta: 'runtime', type: 'Error' })
}
