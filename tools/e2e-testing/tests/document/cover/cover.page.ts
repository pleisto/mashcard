import { Locator } from '@playwright/test'
import { UploaderDashboardPage } from '@/tests/document/uploaderDashboard/uploaderDashboard.page'
import { COVER_SELECTOR } from './cover.selector'

export class CoverPage extends UploaderDashboardPage {
  readonly unsplashImages = this.get('unsplashImages')
  readonly searchInput = this.get('searchInput')

  get(selector: keyof typeof COVER_SELECTOR): Locator {
    return this.locator(COVER_SELECTOR[selector])
  }

  async addCover(index: number = 0): Promise<void> {
    await this.unsplashImages.nth(index).click()
  }

  async searchImage(name: string): Promise<void> {
    await this.waitForResponseWithAction('QueryUnsplashImage', this.searchInput.fill(name))
  }
}
