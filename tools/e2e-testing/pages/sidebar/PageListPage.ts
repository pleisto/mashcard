import { PAGE_SELECTOR } from '@/selectors/sidebar'
import { Locator } from '@playwright/test'
import { BasePage } from '../BasePage'

export interface PageTreeNode {
  pageName: string
  parentNode?: string
}

type ActionButton = 'Pin page' | 'Copy link' | 'Duplicate' | 'Rename' | 'Delete'

export class PageListPage extends BasePage {
  getPageSectionTitle(): Locator {
    return this.page.locator(PAGE_SELECTOR.pageSection)
  }

  getAddSubPageButton(index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.addSubPageButton).nth(index)
  }

  getPageByIndex(index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.pageItem(index))
  }

  getSubPage(index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.pageIndent).nth(index)
  }

  getMoreActionIcon(index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.moreActionIcon).nth(index)
  }

  getMoreButtonByText(actionButton: ActionButton, index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.actionButton(actionButton)).nth(index)
  }

  getArrow(index: number = 0): Locator {
    return this.page.locator(PAGE_SELECTOR.arrow).nth(index)
  }

  async gotoHomePage(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' })
    await this.waitForResponse('GetPageBlocks')
  }

  async hover(index: number = 0, position?: { x: number; y: number }): Promise<void> {
    await this.page.hover(PAGE_SELECTOR.pageItem(index), { position })
  }

  async addPage(): Promise<void> {
    await this.waitForResponseWithAction('GetPageBlocks', this.page.locator(PAGE_SELECTOR.addPageButton).click())
  }

  async addSubPage(index: number = 0): Promise<void> {
    await this.hover(index)
    await this.waitForResponseWithAction('GetPageBlocks', this.getAddSubPageButton(index).click())
    const arrowClass = await this.getArrow().getAttribute('class')
    if (!arrowClass?.includes('-isExpanded-true')) {
      await this.getArrow().click()
    }
  }

  async removePage(index: number = 0): Promise<void> {
    await this.hover(index)
    await this.getMoreActionIcon(index).click()
    await this.waitForResponseWithAction('GetPageBlocks', this.getMoreButtonByText('Delete', index).click())
  }

  async renamePage(pageName: string, index: number = 0): Promise<void> {
    await this.hover(index)
    await this.getMoreActionIcon(index).click()
    await this.getMoreButtonByText('Rename', index).click()
    await this.page.fill(PAGE_SELECTOR.renameInput, pageName)
    await this.waitForResponseWithAction('GetPageBlocks', this.page.press(PAGE_SELECTOR.renameInput, 'Enter'))
  }

  async createPageTree(pageTrees: PageTreeNode[]): Promise<void> {
    for (let index = 0; index < pageTrees.length; index++) {
      const { pageName, parentNode } = pageTrees[index]
      if (!parentNode) {
        await this.addPage()
      } else {
        const index = pageTrees.findIndex(item => item.pageName === parentNode)
        await this.addSubPage(index)
      }

      const arrowClassName = await this.getArrow(index).getAttribute('class')
      if (!arrowClassName?.includes('-isExpanded-true')) {
        await this.getArrow(index).click()
      }

      await this.renamePage(pageName, index)
    }
  }

  async removeAllPages(): Promise<void> {
    while (await this.getPageSectionTitle().isVisible()) {
      await this.hover()
      await this.getMoreActionIcon().click()
      await this.waitForResponseWithAction('GetPageBlocks', this.getMoreButtonByText('Delete').click())
    }
  }
}
