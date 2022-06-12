import { Locator } from '@playwright/test'
import { UploaderDashboardPage } from '@/tests/document/uploaderDashboard/uploaderDashboard.page'
import { COVER_SELECTOR } from './cover.selector'

export class CoverPage extends UploaderDashboardPage {
  getSearchInput(): Locator {
    return this.page.locator(COVER_SELECTOR.searchInput)
  }

  getUnsplashImageByIndex(index: number = 0): Locator {
    return this.page.locator(COVER_SELECTOR.unsplashImage(index))
  }

  async addCover(index?: number): Promise<void> {
    await this.waitForResponseWithAction('blockSyncBatch', this.getUnsplashImageByIndex(index).click())
  }

  async searchImage(name: string): Promise<void> {
    await this.waitForResponseWithAction('QueryUnsplashImage', this.getSearchInput().fill(name))
  }
}
