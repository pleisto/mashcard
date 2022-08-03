import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { LINK_MENU_BLOCK_SELECTORS } from './linkMenuBlock.selector'

export class LinkMenuBlockPage extends CommonPage {
  readonly linkMenuPopup = this.get('linkMenuPopup')

  get(selector: keyof typeof LINK_MENU_BLOCK_SELECTORS): Locator {
    return this.locator(LINK_MENU_BLOCK_SELECTORS[selector])
  }
}
