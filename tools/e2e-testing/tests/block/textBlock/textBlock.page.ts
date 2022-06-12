import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { TEXT_BLOCK_SELECTORS } from './textBlock.selector'

export class TextBlock extends CommonPage {
  getTextBlock(): Locator {
    return this.page.locator(TEXT_BLOCK_SELECTORS.textBlock)
  }
}
