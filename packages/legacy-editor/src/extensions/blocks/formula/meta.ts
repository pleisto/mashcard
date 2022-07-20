import { ContextInterface, VariableDisplayData } from '@mashcard/formula'
import { ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'formulaBlock',
  extensionType: 'block'
}

export interface FormulaOptions {
  formulaContext?: ContextInterface | null
}
export interface FormulaAttributes {
  isNew: boolean
  formula: {
    type: 'FORMULA'
    displayData?: VariableDisplayData
  }
}
