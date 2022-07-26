import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { PAGE_SELECTOR } from './page.selector'

type ActionButton = 'Pin page' | 'Copy link' | 'Duplicate' | 'Rename' | 'Delete'

export class PageTreePage extends CommonPage {
  getPages(): Locator {
    return this.page.locator(PAGE_SELECTOR.pages)
  }

  getAddPageButton(): Locator {
    return this.page.locator(PAGE_SELECTOR.addPageButton)
  }

  getPageSectionTitle(): Locator {
    return this.page.locator(PAGE_SELECTOR.pageSection)
  }

  getAddSubPageButton(index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.addSubPageButton(index))
  }

  getPageByIndex(index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.pageItem(index))
  }

  getSubPage(index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.pageIndent(index))
  }

  getMoreActionIcon(index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.moreActionIcon(index))
  }

  getMoreButtonByText(actionButton: ActionButton, index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.actionButton(actionButton, index))
  }

  getArrow(index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.arrow(index))
  }

  getRenameInput(): Locator {
    return this.page.locator(PAGE_SELECTOR.renameInput)
  }

  async clickPage(index?: number): Promise<void> {
    await this.waitForResponseWithAction('GetChildrenBlocks', this.getPageByIndex(index).click())
  }

  async expandArrow(index?: number): Promise<void> {
    const arrowClass = await this.getArrow(index).getAttribute('class')
    if (!arrowClass?.includes('-isExpanded-true')) {
      await this.getArrow(index).click()
    }
  }

  async expandSubPageOneByOne(layer: number): Promise<void> {
    for (let index = 0; index < layer; index++) {
      await this.expandArrow(index)
    }
  }

  async addPage(): Promise<void> {
    await this.waitForResponseWithAction('GetPageBlocks', this.getAddPageButton().click())
  }

  async addSubPage(index?: number): Promise<void> {
    await this.getPageByIndex(index).hover()
    await this.waitForResponseWithAction('GetPageBlocks', this.getAddSubPageButton(index).click())
    await this.expandArrow()
  }

  async removePage(index?: number): Promise<void> {
    await this.getPageByIndex(index).hover()
    await this.getMoreActionIcon(index).click()
    await this.waitForResponseWithAction('GetPageBlocks', this.getMoreButtonByText('Delete', index).click())
  }

  async renamePage(pageName: string, index?: number): Promise<void> {
    await this.getPageByIndex(index).hover()
    await this.getMoreActionIcon(index).click()
    await this.getMoreButtonByText('Rename', index).click()
    await this.getRenameInput().fill(pageName)
    await this.waitForResponseWithAction('GetPageBlocks', this.getRenameInput().press('Enter'))
  }
}
