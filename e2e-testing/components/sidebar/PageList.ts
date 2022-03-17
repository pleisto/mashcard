import { Locator, Page } from '@playwright/test'
import { SIDEBAR_SELECTORS } from '@/selectors/sidebar'

type ActionButton = 'Pin page' | 'Copy link' | 'Duplicate' | 'Rename' | 'Delete'

export class PageList {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  getPageSectionTitle(): Locator {
    return this.page.locator(SIDEBAR_SELECTORS.mainActions.pageSection)
  }

  getAddSubPageButton(index: number = 0): Locator {
    return this.page.locator(SIDEBAR_SELECTORS.mainActions.addSubPageButton).nth(index)
  }

  getSubPage(index: number = 0): Locator {
    return this.page.locator(SIDEBAR_SELECTORS.mainActions.pageIndent).nth(index)
  }

  getMoreActionIcon(index: number = 0): Locator {
    return this.page.locator(SIDEBAR_SELECTORS.mainActions.moreActionIcon).nth(index)
  }

  getMoreButtonByText(actionButton: ActionButton, index: number = 0): Locator {
    return this.page.locator(SIDEBAR_SELECTORS.mainActions.actionButton(actionButton)).nth(index)
  }

  getArrow(index: number = 0): Locator {
    return this.page.locator(SIDEBAR_SELECTORS.mainActions.arrow).nth(index)
  }

  async hover(index: number = 0, position?: { x: number; y: number }): Promise<void> {
    await this.page.hover(SIDEBAR_SELECTORS.mainActions.pageItem(index), { position })
  }

  async addPage(): Promise<void> {
    await this.page.locator(SIDEBAR_SELECTORS.mainActions.addPageButton).click()
  }

  async addSubPage(index: number = 0): Promise<void> {
    await this.hover(index)
    await this.getAddSubPageButton(index).click()
  }

  async removePage(index: number = 0): Promise<void> {
    await this.hover(index)
    await this.getMoreActionIcon(index).click()
    await this.getMoreButtonByText('Delete', index).click()
  }

  async renamePage(pageName: string): Promise<void> {
    await this.page.fill(SIDEBAR_SELECTORS.mainActions.renameInput, pageName)
    await this.page.press(SIDEBAR_SELECTORS.mainActions.renameInput, 'Enter')
  }
}
