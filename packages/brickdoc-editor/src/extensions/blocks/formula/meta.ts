import { ContextInterface } from '@brickdoc/formula'
import { ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'formulaBlock',
  extensionType: 'block'
}

export interface FormulaOptions {
  formulaContext?: ContextInterface | null
}
export interface FormulaAttributes {
  // TODO: add attributes types
}
