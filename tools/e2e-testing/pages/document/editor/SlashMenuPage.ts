import { SLASH_MENU_SELECTORS } from '@/selectors/document'
import { Locator } from '@playwright/test'
import { BasePage } from '../../BasePage'

export class SlashMenu extends BasePage {
  getSlashMenu(): Locator {
    return this.page.locator(SLASH_MENU_SELECTORS.slashMenu)
  }
}
