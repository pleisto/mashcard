import { Locator } from '@playwright/test'
import { UploaderDashboardPage } from '@/tests/document/uploaderDashboard/uploaderDashboard.page'
import { ICON_SELECTOR } from './icon.selector'

export class IconPage extends UploaderDashboardPage {
  getEmojiSearchInput(): Locator {
    return this.page.locator(ICON_SELECTOR.emojiSearchInput)
  }

  getEmojiByIndex(index: number = 0): Locator {
    return this.page.locator(ICON_SELECTOR.emojiItem(index))
  }

  async searchEmoji(emojiName: string): Promise<void> {
    await this.getEmojiSearchInput().fill(emojiName)
    await this.page.waitForTimeout(300)
  }

  async addEmoji(name: string): Promise<void> {
    await this.searchEmoji(name)
    await this.waitForResponseWithAction('blockSyncBatch', this.getEmojiByIndex().click())
  }
}
