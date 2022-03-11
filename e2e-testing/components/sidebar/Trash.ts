import { Page } from '@playwright/test'
import { SIDEBAR_SELECTORS } from '../../selectors/sidebar'

export class Trash {
  private readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async openTrashPage(): Promise<void> {
    await this.page.locator(SIDEBAR_SELECTORS.mainActions.trashButton).click()
  }
}
