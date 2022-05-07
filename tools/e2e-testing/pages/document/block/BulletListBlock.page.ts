import { BULLET_LIST_BLOCK_SELECTORS } from '@/selectors/document'
import { Locator } from '@playwright/test'
import { BasePage } from '../../Base.page'

export class BulletListBlock extends BasePage {
  getBulletList(): Locator {
    return this.page.locator(BULLET_LIST_BLOCK_SELECTORS.bulletListBlock)
  }
}
