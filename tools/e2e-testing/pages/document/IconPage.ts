import { ICON_SELECTOR } from '@/selectors/document/icon'
import { BasePage } from '../BasePage'

export class IconPage extends BasePage {
  async addEmoji(emoji: string): Promise<void> {
    await this.page.locator(ICON_SELECTOR.emoji(emoji)).click()
  }
}
