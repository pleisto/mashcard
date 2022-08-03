import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { SLASH_MENU_SELECTORS } from './slashMenu.selector'

export class SlashMenu extends CommonPage {
  readonly slashMenu = this.get('slashMenu')

  get(selector: keyof typeof SLASH_MENU_SELECTORS): Locator {
    return this.locator(SLASH_MENU_SELECTORS[selector])
  }
}
