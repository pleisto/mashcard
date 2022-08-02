import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { BULLET_LIST_BLOCK_SELECTORS } from './bulletListBlock.selector'

export class BulletListBlock extends CommonPage {
  getBulletList(index: number = 0): Locator {
    return this.page.locator(BULLET_LIST_BLOCK_SELECTORS.block(index))
  }
}
