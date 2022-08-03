import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { BREADCRUMB_SELECTOR } from './breadcrumb.selector'

export class BreadcrumbPage extends CommonPage {
  readonly texts = this.get('texts')
  readonly icons = this.get('icons')
  readonly items = this.get('items')

  get(selector: keyof typeof BREADCRUMB_SELECTOR): Locator {
    return this.locator(BREADCRUMB_SELECTOR[selector])
  }

  async redirectToPage(isInDialog: boolean = false, index: number = 0): Promise<void> {
    isInDialog ? await this.menubarItems.nth(index).click() : await this.texts.nth(index).click()
  }
}
