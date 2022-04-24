import { LINK_MENU_BLOCK_SELECTORS } from '@/selectors/document'
import { Locator } from '@playwright/test'
import { BasePage } from '../../BasePage'

export class LinkMenuBlockPage extends BasePage {
  getLinkMenuPopup(): Locator {
    return this.page.locator(LINK_MENU_BLOCK_SELECTORS.linkMenuPopup)
  }
}
