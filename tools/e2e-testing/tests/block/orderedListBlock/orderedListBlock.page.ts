import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { ORDERED_LIST_BLOCK_SELECTORS } from './orderedListBlock.selector'

export class OrderedListBlock extends CommonPage {
  readonly orderedLists = this.get('orderedLists')

  get(selector: keyof typeof ORDERED_LIST_BLOCK_SELECTORS): Locator {
    return this.locator(ORDERED_LIST_BLOCK_SELECTORS[selector])
  }
}
