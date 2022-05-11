import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { LINK_MENU_BLOCK_SELECTORS } from './linkMenuBlock.selector'

export class LinkMenuBlockPage extends CommonPage {
  getLinkMenuPopup(): Locator {
    return this.page.locator(LINK_MENU_BLOCK_SELECTORS.linkMenuPopup)
  }
}
