import { Locator, Page } from '@playwright/test'
import { COMMON_SELECTORS } from './common.selector'
import { expect } from '@/fixtures'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

export class CommonPage {
  readonly tooltip = this.locator(COMMON_SELECTORS.tooltip)
  readonly errorTooltip = this.locator(COMMON_SELECTORS.errorTooltip)
  readonly menubarItems = this.locator(COMMON_SELECTORS.menubarItems)
  readonly dialog = this.locator(COMMON_SELECTORS.dialog.component)
  readonly dialogCancelButton = this.locator(COMMON_SELECTORS.dialog.cancelButton)
  readonly dialogCreateButton = this.locator(COMMON_SELECTORS.dialog.createButton)
  readonly dialogConfirmButton = this.locator(COMMON_SELECTORS.dialog.confirmButton)
  readonly dialogDeletePageButton = this.locator(COMMON_SELECTORS.dialog.deletePageButton)
  readonly dialogDeletePodButton = this.locator(COMMON_SELECTORS.dialog.deletePodButton)
  readonly dialogInput = this.locator(COMMON_SELECTORS.dialog.input)
  readonly listItems = this.locator(COMMON_SELECTORS.listBox.listItems)

  constructor(readonly page: Page) {}

  locator(selector: string): Locator {
    return this.page.locator(selector)
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
        response.url().includes('$internal-apis/$graph') &&
        response.request().postDataJSON().operationName === operationName &&
        response.ok()
    )
  }

  async waitForResponseWithAction(operationName: string, actionFn: Promise<void>): Promise<void> {
    await Promise.all([this.waitForResponse(operationName), actionFn])
  }

  async createScreenshot(mask?: Locator[]): Promise<void> {
    const maskList = mask ?? []
    await expect(this.page).toHaveScreenshot({
      mask: [
        this.locator(`[data-testid=${TEST_ID_ENUM.page.topBar.saving.id}]`),
        this.locator(`[data-testid=${TEST_ID_ENUM.page.topBar.collaboratorMenu.id}]`),
        this.locator(`[data-testid=${TEST_ID_ENUM.page.DocumentPage.loading.id}]`),
        this.locator(`[data-testid=${TEST_ID_ENUM.layout.sidebar.podSelect.id}]`),
        ...maskList
      ]
    })
  }
}
