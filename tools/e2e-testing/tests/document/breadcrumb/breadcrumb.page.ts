import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { BREADCRUMB_SELECTOR } from './breadcrumb.selector'

export class BreadcrumbPage extends CommonPage {
  getBreadcrumbTextByIndex(index: number = 0): Locator {
    return this.getBreadcrumbItemsByIndex(index).locator(BREADCRUMB_SELECTOR.breadcrumbText)
  }

  getBreadcrumbIconByIndex(index: number = 0): Locator {
    return this.getBreadcrumbItemsByIndex(index).locator(BREADCRUMB_SELECTOR.breadcrumbIcon)
  }

  getBreadcrumbItems(): Locator {
    return this.page.locator(BREADCRUMB_SELECTOR.breadcrumbItems)
  }

  getBreadcrumbItemsByIndex(index: number = 0): Locator {
    return this.page.locator(BREADCRUMB_SELECTOR.breadcrumbItems).nth(index)
  }

  async redirectToPage(isInDialog: boolean = false, index: number = 0): Promise<void> {
    isInDialog ? await this.getItemsInMenubar().nth(index).click() : await this.getBreadcrumbTextByIndex(index).click()
  }
}
