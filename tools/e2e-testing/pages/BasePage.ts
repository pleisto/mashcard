import { COMMON_SELECTORS } from '@/selectors/common'
import { Locator, Page } from '@playwright/test'

export class BasePage {
  constructor(readonly page: Page) {}

  getTooltip(): Locator {
    return this.page.locator(COMMON_SELECTORS.tooltip)
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
