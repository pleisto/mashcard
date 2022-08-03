import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { BLOCK_ACTION_SELECTORS } from './blockAction.selector'

export class BlockAction extends CommonPage {
  readonly blockActions = this.get('blockActions')

  get(selector: keyof typeof BLOCK_ACTION_SELECTORS): Locator {
    return this.locator(BLOCK_ACTION_SELECTORS[selector])
  }
}
