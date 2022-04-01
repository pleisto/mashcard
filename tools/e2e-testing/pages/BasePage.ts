import { COMMON_SELECTORS } from '@/selectors/common'
import { Locator, Page } from '@playwright/test'

export class BasePage {
  public readonly page
  constructor(page: Page) {
    this.page = page
  }

  getTooltip(): Locator {
    return this.page.locator(COMMON_SELECTORS.tooltip)
  }

  async gotoHomePage(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' })
    const csrfToken = await this.page.evaluate(() => (window as any).brickdocContext.csrfToken)
    // TODO: remove all pages & get pageBlocks
    await this.waitForResponse('GetPageBlocks')
    return csrfToken
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
    await actionFn
    await this.waitForResponse(operationName)
  }
}
