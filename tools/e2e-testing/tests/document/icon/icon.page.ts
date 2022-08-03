import { Locator } from '@playwright/test'
import { UploaderDashboardPage } from '@/tests/document/uploaderDashboard/uploaderDashboard.page'
import { ICON_SELECTOR } from './icon.selector'

export class IconPage extends UploaderDashboardPage {
  readonly items = this.get('items')
  readonly searchInput = this.get('searchInput')

  get(selector: keyof typeof ICON_SELECTOR): Locator {
    return this.locator(ICON_SELECTOR[selector])
  }

  async searchEmoji(emojiName: string): Promise<void> {
    await this.searchInput.fill(emojiName)
    await this.page.waitForTimeout(300)
  }

  async addEmoji(name: string): Promise<void> {
    await this.searchEmoji(name)
    await this.waitForResponseWithAction('BlockCommit', this.items.nth(0).click())
  }
}
