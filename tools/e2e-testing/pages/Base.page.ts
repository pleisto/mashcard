import { BASE_SELECTORS } from '@/selectors/base'
import { Locator, Page } from '@playwright/test'

export class BasePage {
  constructor(readonly page: Page) {}

  getTooltip(): Locator {
    return this.page.locator(BASE_SELECTORS.tooltip)
  }

  getItemInMenubar(): Locator {
    return this.page.locator(BASE_SELECTORS.menubarItem)
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
}
