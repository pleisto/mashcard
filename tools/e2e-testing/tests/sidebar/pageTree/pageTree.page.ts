import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { PAGE_SELECTOR } from './page.selector'

type ActionButton = 'Pin page' | 'Copy link' | 'Duplicate' | 'Rename' | 'Delete'

export class PageTreePage extends CommonPage {
  readonly pageSection = this.get('pageSection')
  readonly pageTree = this.get('pageTree')
  readonly addPageButton = this.get('addPageButton')
  readonly addSubPageButtons = this.get('addSubPageButtons')
  readonly moreActionIcons = this.get('moreActionIcons')
  readonly pages = this.get('pages')
  readonly subPages = this.get('subPages')
  readonly renameInput = this.get('renameInput')
  readonly arrows = this.get('arrows')

  get(selector: keyof typeof PAGE_SELECTOR): Locator {
    return this.locator(PAGE_SELECTOR[selector])
  }

  getMoreButtonByAction(actionButton: ActionButton, index: number = 0): Locator {
    return this.menubarItems.locator(`text=${actionButton}`).nth(index)
  }

  async clickPage(index: number = 0): Promise<void> {
    await this.waitForResponseWithAction('DocumentBlock', this.pages.nth(index).click())
  }

  async expandArrow(index: number = 0): Promise<void> {
    const arrowClass = await this.arrows.nth(index).getAttribute('class')
    if (!arrowClass?.includes('-isExpanded-true')) {
      await this.arrows.nth(index).click()
    }
  }

  async expandSubPageOneByOne(layer: number): Promise<void> {
    for (let index = 0; index < layer; index++) {
      await this.expandArrow(index)
    }
  }

  async addPage(): Promise<void> {
    await this.waitForResponseWithAction('GetPageBlocks', this.addPageButton.click())
  }

  async addSubPage(index: number = 0): Promise<void> {
    await this.pages.nth(index).hover()
    await this.waitForResponseWithAction('DocumentBlock', this.addSubPageButtons.nth(index).click())
    await this.expandArrow()
  }

  async removePage(index: number = 0): Promise<void> {
    await this.pages.nth(index).hover()
    await this.moreActionIcons.nth(index).click()
    await this.waitForResponseWithAction('GetPageBlocks', this.getMoreButtonByAction('Delete', index).click())
  }

  async renamePage(pageName: string, index: number = 0): Promise<void> {
    await this.pages.nth(index).hover()
    await this.moreActionIcons.nth(index).click()
    await this.getMoreButtonByAction('Rename', index).click()
    await this.renameInput.fill(pageName)
    await this.waitForResponseWithAction('GetPageBlocks', this.renameInput.press('Enter'))
  }
}
