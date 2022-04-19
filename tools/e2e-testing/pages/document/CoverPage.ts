import { COVER_SELECTOR } from '@/selectors/document/cover'
import { Locator } from '@playwright/test'
import { UploaderDashboardPage } from './UploaderDashboardPage'

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
