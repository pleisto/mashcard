import { Locator } from '@playwright/test'
import { UploaderDashboardPage } from '@/tests/document/uploaderDashboard/uploaderDashboard.page'
import { EmojiGroup, ICON_SELECTOR } from './icon.selector'

export class IconPage extends UploaderDashboardPage {
  getEmojiByGroup(group: EmojiGroup, index?: number): Locator {
    return this.page.locator(ICON_SELECTOR.emojiByGroup(group, index))
  }

  getEmojiSearchInput(): Locator {
    return this.page.locator(ICON_SELECTOR.emojiSearchInput)
  }

  async addEmoji(group: EmojiGroup, index?: number): Promise<void> {
    await this.getEmojiByGroup(group, index).click()
  }

  async searchEmoji(emojiName: string): Promise<void> {
    await this.getEmojiSearchInput().fill(emojiName)
  }
}
