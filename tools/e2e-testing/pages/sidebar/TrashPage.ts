import { TRASH_SELECTOR } from '@/selectors/sidebar'
import { Page } from '@playwright/test'

export class TrashPage {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async openTrashPage(): Promise<void> {
    await this.page.locator(TRASH_SELECTOR.trashButton).click()
  }
}
