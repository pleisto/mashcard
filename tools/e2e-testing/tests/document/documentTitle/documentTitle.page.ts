import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { CoverPage } from '@/tests/document/cover/cover.page'
import { IconPage } from '@/tests/document/icon/icon.page'
import { DOCUMENT_TITLE_SELECTORS } from './documentTitle.selector'

export class DocumentTitlePage extends CommonPage {
  getArticle(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.article)
  }

  getDocumentTitle(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.documentTitle)
  }

  getDocumentEmoji(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.documentEmoji)
  }

  getDocumentImageIcon(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.documentImageIcon)
  }

  getActionButtons(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.actionButtons)
  }

  getAddIconButton(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.addIconButton)
  }

  getAddCoverButton(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.addCoverButton)
  }

  getPageCover(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.pageCover)
  }

  getChangeCoverButton(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.changeCoverButton)
  }

  getRemoveCoverButton(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.removeButton)
  }

  async fillTitle(title: string): Promise<void> {
    await this.getDocumentTitle().fill(title)
  }

  async openIconPopup(): Promise<IconPage> {
    await this.getDocumentTitle().hover()
    await this.getAddIconButton().click()
    return new IconPage(this.page)
  }

  async reopenIconPopup(type: 'Emoji' | 'Image' = 'Emoji'): Promise<void> {
    type === 'Emoji' ? await this.getDocumentEmoji().click() : await this.getDocumentImageIcon().click()
  }

  async openCoverPopup(): Promise<CoverPage> {
    await this.getDocumentTitle().hover()
    await this.waitForResponseWithAction('QueryUnsplashImage', this.getAddCoverButton().click())
    return new CoverPage(this.page)
  }

  async changeCover(): Promise<void> {
    await this.getPageCover().hover({ force: true })
    await this.getChangeCoverButton().click()
  }

  async removeCover(): Promise<void> {
    await this.changeCover()
    await this.getRemoveCoverButton().click()
  }
}
