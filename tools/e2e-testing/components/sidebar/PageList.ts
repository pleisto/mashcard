import { Locator } from '@playwright/test'
import { SIDEBAR_SELECTORS } from '@/selectors/sidebar'
import { BasePage } from '../BasePage'

export interface PageTreeNode {
  pageName: string
  parentNode?: string
}

type ActionButton = 'Pin page' | 'Copy link' | 'Duplicate' | 'Rename' | 'Delete'

export class PageList extends BasePage {
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
    await this.waitForResponse('GetPageBlocks', this.page.locator(SIDEBAR_SELECTORS.mainActions.addPageButton).click())
  }

  async addSubPage(index: number = 0): Promise<void> {
    await this.hover(index)
    await this.waitForResponse('GetPageBlocks', this.getAddSubPageButton(index).click())
    const arrowClass = await this.getArrow().getAttribute('class')
    if (!arrowClass?.includes('-isExpanded-true')) {
      await this.getArrow().click()
    }
  }

  async removePage(index: number = 0): Promise<void> {
    await this.hover(index)
    await this.getMoreActionIcon(index).click()
    await this.waitForResponse('GetPageBlocks', this.getMoreButtonByText('Delete', index).click())
  }

  async renamePage(pageName: string): Promise<void> {
    await this.page.fill(SIDEBAR_SELECTORS.mainActions.renameInput, pageName)
    await this.waitForResponse('GetPageBlocks', this.page.press(SIDEBAR_SELECTORS.mainActions.renameInput, 'Enter'))
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

      await this.hover(index)
      await this.getMoreActionIcon(index).click()
      await this.getMoreButtonByText('Rename', index).click()
      await this.renamePage(pageName)
    }
  }

  async removeAllPages(): Promise<void> {
    while (await this.getPageSectionTitle().isVisible()) {
      await this.hover()
      await this.getMoreActionIcon().click()
      await this.waitForResponse('GetPageBlocks', this.getMoreButtonByText('Delete').click())
    }
  }
}
