import { Locator } from '@playwright/test'
import { BasePage } from '@/pages/Base.page'
import { BREADCRUMB_SELECTOR } from '@/selectors/topBar'

export class BreadcrumbPage extends BasePage {
  getBreadcrumbTextByIndex(index: number = 0): Locator {
    return this.page.locator(BREADCRUMB_SELECTOR.breadcrumbText(index))
  }

  getBreadcrumbIconByIndex(index: number = 0): Locator {
    return this.page.locator(BREADCRUMB_SELECTOR.breadcrumbIcon(index))
  }

  getBreadcrumbItems(): Locator {
    return this.page.locator(BREADCRUMB_SELECTOR.breadcrumbItem)
  }
}
