import { DOCUMENT_TITLE_SELECTORS } from '@/selectors/document/documentTitle'
import { Locator } from '@playwright/test'
import { BasePage } from '../BasePage'
import { IconPage } from './IconPage'

export class DocumentTitlePage extends BasePage {
  getDocumentTitle(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.documentTitle)
  }

  getAddIconButton(): Locator {
    return this.page.locator(DOCUMENT_TITLE_SELECTORS.addIconButton)
  }

  async hover(): Promise<void> {
    await this.getDocumentTitle().hover()
  }

  async addIcon(): Promise<IconPage> {
    await this.hover()
    await this.getAddIconButton().click()
    return new IconPage(this.page)
  }
}
