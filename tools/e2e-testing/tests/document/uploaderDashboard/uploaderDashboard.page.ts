import { CommonPage } from '@/tests/common/common.page'
import { UPLOADER_DASHBOARD_SELECTOR } from './uploaderDashboard.selector'
import { COVER_TAB } from '../cover/cover.selector'
import { ICON_TAB } from '../icon/icon.selector'

export class UploaderDashboardPage extends CommonPage {
  readonly unsplashTab = this.locator(UPLOADER_DASHBOARD_SELECTOR.unsplashTab)
  readonly uploadTab = this.locator(UPLOADER_DASHBOARD_SELECTOR.uploadTab)
  readonly linkTab = this.locator(UPLOADER_DASHBOARD_SELECTOR.linkTab)
  readonly emojiTab = this.locator(UPLOADER_DASHBOARD_SELECTOR.emojiTab)
  readonly uploadImageTab = this.locator(UPLOADER_DASHBOARD_SELECTOR.uploadImageTab)
  readonly uploadImageButton = this.locator(UPLOADER_DASHBOARD_SELECTOR.uploadImageButton)
  readonly linkInput = this.locator(UPLOADER_DASHBOARD_SELECTOR.linkInput)
  readonly linkSubmitButton = this.locator(UPLOADER_DASHBOARD_SELECTOR.linkSubmitButton)
  readonly invalidUrlTooltip = this.locator(UPLOADER_DASHBOARD_SELECTOR.invalidUrlTooltip)
  readonly removeButton = this.locator(UPLOADER_DASHBOARD_SELECTOR.removeButton)

  async switchTab(tabName: keyof typeof COVER_TAB | keyof typeof ICON_TAB): Promise<void> {
    await this.locator(UPLOADER_DASHBOARD_SELECTOR[tabName]).click()
  }

  async uploadImage(path: string): Promise<void> {
    await this.waitForResponseWithAction('blockCommit', this.uploadImageButton.setInputFiles(path))
  }

  async pasteImageLink(link: string): Promise<void> {
    await this.linkInput.fill(link)
    await this.linkSubmitButton.click()
  }

  async remove(): Promise<void> {
    await this.removeButton.click()
  }
}
