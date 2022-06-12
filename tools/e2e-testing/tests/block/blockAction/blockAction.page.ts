import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { BLOCK_ACTION_SELECTORS } from './blockAction.selector'

export class BlockAction extends CommonPage {
  getBlockActionByIndex(index?: number): Locator {
    return this.page.locator(BLOCK_ACTION_SELECTORS.blockAction(index))
  }
}
