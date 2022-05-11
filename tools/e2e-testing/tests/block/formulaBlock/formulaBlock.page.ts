import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { FORMULA_BLOCK_SELECTORS } from './formulaBlock.selector'

export class FormulaBlock extends CommonPage {
  getFormulaPopup(): Locator {
    return this.page.locator(FORMULA_BLOCK_SELECTORS.formulaPopup)
  }
}
