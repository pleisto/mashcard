import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { FORMULA_BLOCK_SELECTORS } from './formulaBlock.selector'

export class FormulaBlock extends CommonPage {
  readonly formulaPopup = this.get('formulaPopup')

  get(selector: keyof typeof FORMULA_BLOCK_SELECTORS): Locator {
    return this.locator(FORMULA_BLOCK_SELECTORS[selector])
  }
}
