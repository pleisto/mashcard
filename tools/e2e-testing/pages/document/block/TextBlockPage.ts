import { TEXT_BLOCK_SELECTORS } from '@/selectors/document'
import { Locator } from '@playwright/test'
import { BasePage } from '../../BasePage'

export class TextBlock extends BasePage {
  getTextBlock(): Locator {
    return this.page.locator(TEXT_BLOCK_SELECTORS.textBlock)
  }
}
