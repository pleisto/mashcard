import { FORMULA_BLOCK_SELECTORS } from '@/selectors/document'
import { Locator } from '@playwright/test'
import { BasePage } from '../../Base.page'

export class FormulaBlock extends BasePage {
  getFormulaPopup(): Locator {
    return this.page.locator(FORMULA_BLOCK_SELECTORS.formulaPopup)
  }
}
