import { Locator, Page } from '@playwright/test'
import { ActionType, COMMON_SELECTORS } from './common.selector'
import { expect } from '@/fixtures'
import { TEST_ID_ENUM } from '@mashcard/test-helper'

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

  getDialogActionButton(action: ActionType): Locator {
    return this.page.locator(COMMON_SELECTORS.dialog.actionButton(action))
  }

  getDialogInput(): Locator {
    return this.page.locator(COMMON_SELECTORS.dialog.input)
  }

  getListItems(): Locator {
    return this.page.locator(COMMON_SELECTORS.listBox.listItems)
  }

  getListItemByName(name: string): Locator {
    return this.page.locator(COMMON_SELECTORS.listBox.listItem(name))
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
        this.page.locator(`[data-testid=${TEST_ID_ENUM.page.topBar.saving.id}]`),
        this.page.locator(`[data-testid=${TEST_ID_ENUM.page.topBar.collaboratorMenu.id}]`),
        this.page.locator(`[data-testid=${TEST_ID_ENUM.page.DocumentPage.loading.id}]`),
        this.page.locator(`[data-testid=${TEST_ID_ENUM.layout.sidebar.podSelect.id}]`),
        ...maskList
      ]
    })
  }
}
