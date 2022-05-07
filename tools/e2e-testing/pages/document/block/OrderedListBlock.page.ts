import { ORDERED_LIST_BLOCK_SELECTORS } from '@/selectors/document'
import { Locator } from '@playwright/test'
import { BasePage } from '../../Base.page'

export class OrderedListBlock extends BasePage {
  getOrderedList(): Locator {
    return this.page.locator(ORDERED_LIST_BLOCK_SELECTORS.orderedListBlock)
  }
}
