import { EmojiGroup, IconTab, ICON_SELECTOR } from '@/selectors/document/icon'
import { Locator } from '@playwright/test'
import { BasePage } from '../BasePage'

export class IconPage extends BasePage {
  getIconTab(tabName: IconTab): Locator {
    return this.page.locator(ICON_SELECTOR.iconTab(tabName))
  }

  getEmojiByGroup(group: EmojiGroup, index?: number): Locator {
    return this.page.locator(ICON_SELECTOR.emojiByGroup(group, index))
  }

  getEmojiSearchInput(): Locator {
    return this.page.locator(ICON_SELECTOR.emojiSearchInput)
  }

  getChooseImageButton(): Locator {
    return this.page.locator(ICON_SELECTOR.uploadImageButton)
  }

  getLinkInput(): Locator {
    return this.page.locator(ICON_SELECTOR.linkInput)
  }

  getLinkSubmitButton(): Locator {
    return this.page.locator(ICON_SELECTOR.linkSubmitButton)
  }

  getRemoveButton(): Locator {
    return this.page.locator(ICON_SELECTOR.removeButton)
  }

  getErrorTooltip(): Locator {
    return this.page.locator(ICON_SELECTOR.invalidUrlTooltip)
  }

  async switchTab(tabName: IconTab): Promise<void> {
    await this.getIconTab(tabName).click()
  }

  async searchEmoji(emojiName: string): Promise<void> {
    await this.getEmojiSearchInput().fill(emojiName)
  }

  async uploadImage(path: string): Promise<void> {
    await this.waitForResponseWithAction('blockSyncBatch', this.getChooseImageButton().setInputFiles(path))
  }

  async pasteImageLink(link: string): Promise<void> {
    await this.getLinkInput().fill(link)
    await this.getLinkSubmitButton().click()
  }

  async removeIcon(): Promise<void> {
    await this.getRemoveButton().click()
  }

  async addEmoji(group: EmojiGroup, index?: number): Promise<void> {
    await this.getEmojiByGroup(group, index).click()
  }
}
