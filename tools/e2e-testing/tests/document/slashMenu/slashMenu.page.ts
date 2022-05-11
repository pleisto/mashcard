import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { SLASH_MENU_SELECTORS } from './slashMenu.selector'

export class SlashMenu extends CommonPage {
  getSlashMenu(): Locator {
    return this.page.locator(SLASH_MENU_SELECTORS.slashMenu)
  }
}
