import { Locator, Page } from '@playwright/test'
import { COMMON_SELECTORS } from './common.selector'
import { expect } from '@/fixtures'

export class CommonPage {
  constructor(readonly page: Page) {}

  getTooltip(): Locator {
    return this.page.locator(COMMON_SELECTORS.tooltip)
  }

  getItemsInMenubar(): Locator {
    return this.page.locator(COMMON_SELECTORS.menubarItems)
  }

  getDialog(): Locator {
    return this.page.locator(COMMON_SELECTORS.dialog.component)
  }

  getDialogCancelButton(): Locator {
    return this.page.locator(COMMON_SELECTORS.dialog.cancelButton)
  }

  getDialogDeleteButton(): Locator {
    return this.page.locator(COMMON_SELECTORS.dialog.deleteButton)
  }

  async scrollUntilElementIntoView(waitingSelector: string, scrollSelector: string, offset = 100): Promise<void> {
    while (!(await this.page.locator(waitingSelector).isVisible())) {
      await this.page.evaluate(
        async ({ scrollSelector, offset }) => {
          document.querySelector(scrollSelector)!.scrollBy(0, offset)
        },
        { scrollSelector, offset }
      )
    }
  }

  async waitForResponse(operationName: string): Promise<void> {
    await this.page.waitForResponse(
      response =>
        response.url().includes('.internal-apis/$graph') &&
        response.request().postDataJSON().operationName === operationName &&
        response.ok()
    )
  }

  async waitForResponseWithAction(operationName: string, actionFn: Promise<void>): Promise<void> {
    await Promise.all([this.waitForResponse(operationName), actionFn])
  }

  async createScreenshot(mask?: Locator[]): Promise<void> {
    await this.page.waitForTimeout(500)
    const maskList = mask ?? []
    await expect(this.page).toHaveScreenshot({
      mask: [
        this.page.locator('[data-testid=page-topBar-saving]'),
        this.page.locator('[data-testid=page-document-page-loading]'),
        this.page.locator('[data-testid=layout-sidebar-pod-select]'),
        ...maskList
      ]
    })
  }
}
