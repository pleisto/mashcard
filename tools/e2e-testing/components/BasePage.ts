import { Page } from '@playwright/test'

export class BasePage {
  public readonly page
  constructor(page: Page) {
    this.page = page
  }

  async waitForResponse(operationName: string, actionFn: Promise<void>): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(
        response =>
          response.url().includes('.internal-apis/$graph') &&
          response.request().postDataJSON().operationName === operationName &&
          response.ok()
      ),
      actionFn
    ])
  }
}
