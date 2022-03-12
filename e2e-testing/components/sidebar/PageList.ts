import { Page } from '@playwright/test'
import { SIDEBAR_SELECTORS } from '@/selectors/sidebar'

export class PageList {
  private readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async addPage(): Promise<void> {
    await this.page.locator(SIDEBAR_SELECTORS.mainActions.addPageButton).click()
  }

  async addSubPage(): Promise<void> {
    await this.page.locator(SIDEBAR_SELECTORS.mainActions.addSubPageButton).click()
  }

  async removeAll(): Promise<void> {}
}
