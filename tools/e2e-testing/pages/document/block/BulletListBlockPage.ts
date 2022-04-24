import { BULLET_LIST_BLOCK_SELECTORS } from '@/selectors/document'
import { Locator } from '@playwright/test'
import { BasePage } from '../../BasePage'

export class BulletListBlock extends BasePage {
  getBulletList(): Locator {
    return this.page.locator(BULLET_LIST_BLOCK_SELECTORS.bulletListBlock)
  }
}
