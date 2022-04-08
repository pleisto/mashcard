import { ICON_SELECTOR } from '@/selectors/document/icon'
import { Locator } from '@playwright/test'
import { BasePage } from '../BasePage'

export class IconPage extends BasePage {
  getEmoji(emoji: string): Locator {
    return this.page.locator(ICON_SELECTOR.emoji(emoji))
  }

  async addEmoji(emoji: string): Promise<void> {
    await this.getEmoji(emoji).click()
  }
}
