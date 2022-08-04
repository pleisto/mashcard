import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { ORDERED_LIST_BLOCK_SELECTORS } from './orderedListBlock.selector'

export class OrderedListBlock extends CommonPage {
  getOrderedList(index: number = 0): Locator {
    return this.page.locator(ORDERED_LIST_BLOCK_SELECTORS.block(index))
  }
}
