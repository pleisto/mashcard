import { Page } from '@playwright/test'

export class PageExtend {
  private readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  async isInViewPort(selector: string): Promise<boolean> {
    return await this.page.evaluate(selector => {
      let isVisible = false
      const element = document.querySelector(selector)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top >= 0 && rect.left >= 0) {
          const viewPortWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
          const viewPortHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
          if (rect.right <= viewPortWidth && rect.bottom <= viewPortHeight) {
            isVisible = true
          }
        }
      }
      return isVisible
    }, selector)
  }
}
