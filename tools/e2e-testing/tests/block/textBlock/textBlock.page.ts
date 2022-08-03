import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { TEXT_BLOCK_SELECTORS } from './textBlock.selector'

export class TextBlock extends CommonPage {
  readonly paragraphs = this.get('paragraphs')

  get(selector: keyof typeof TEXT_BLOCK_SELECTORS): Locator {
    return this.locator(TEXT_BLOCK_SELECTORS[selector])
  }
}
