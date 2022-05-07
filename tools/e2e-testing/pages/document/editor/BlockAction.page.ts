import { BLOCK_ACTION_SELECTORS } from '@/selectors/document'
import { Locator } from '@playwright/test'
import { BasePage } from '../../Base.page'

export class BlockAction extends BasePage {
  getBlockActionByIndex(index?: number): Locator {
    return this.page.locator(BLOCK_ACTION_SELECTORS.blockAction(index))
  }
}
