import { PageList } from '@/components/sidebar/PageList'
import { Page } from '@playwright/test'

export interface PageTreeNode {
  pageName: string
  parentNode?: string
}

export class PageTree {
  private readonly page: Page
  constructor(page: Page) {
    this.page = page
  }

  createPageTree = async (pageTrees: PageTreeNode[]): Promise<void> => {
    const pageList = new PageList(this.page)
    for (let index = 0; index < pageTrees.length; index++) {
      const { pageName, parentNode } = pageTrees[index]
      if (!parentNode) {
        await pageList.addPage()
      } else {
        const index = pageTrees.findIndex(item => item.pageName === parentNode)
        await pageList.addSubPage(index)
      }

      const arrowClassName = await pageList.getArrow(index).getAttribute('class')
      if (!arrowClassName?.includes('-isExpanded-true')) {
        await pageList.getArrow(index).click()
      }

      await pageList.hover(index)
      await pageList.getMoreActionIcon(index).click()
      await pageList.getMoreButtonByText('Rename', index).click()
      await pageList.renamePage(pageName)
    }
  }

  removeAllPages = async (): Promise<void> => {
    const pageList = new PageList(this.page)
    while (await pageList.getPageSectionTitle().isVisible()) {
      await pageList.hover()
      await pageList.getMoreActionIcon().click()
      await pageList.getMoreButtonByText('Delete').click()
    }
  }
}
