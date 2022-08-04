import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { BULLET_LIST_BLOCK_SELECTORS } from './bulletListBlock.selector'

export class BulletListBlock extends CommonPage {
  readonly bulletLists = this.get('bulletLists')

  get(selector: keyof typeof BULLET_LIST_BLOCK_SELECTORS): Locator {
    return this.locator(BULLET_LIST_BLOCK_SELECTORS[selector])
  }
}
