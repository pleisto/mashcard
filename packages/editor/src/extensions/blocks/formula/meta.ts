import { ContextInterface, VariableMetadata } from '@mashcard/formula'
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
    // TODO refactor me
    attrs?: Pick<VariableMetadata, 'name' | 'input' | 'position'> & { display: string }
  }
}
