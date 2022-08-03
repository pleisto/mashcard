import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { CoverPage } from '@/tests/document/cover/cover.page'
import { IconPage } from '@/tests/document/icon/icon.page'
import { DOCUMENT_TITLE_SELECTORS } from './documentTitle.selector'

export class DocumentTitlePage extends CommonPage {
  readonly article = this.get('article')
  readonly title = this.get('title')
  readonly emoji = this.get('emoji')
  readonly imageIcon = this.get('imageIcon')
  readonly actionButtons = this.get('actionButtons')
  readonly addIconButton = this.get('addIconButton')
  readonly addCoverButton = this.get('addCoverButton')
  readonly pageCover = this.get('pageCover')
  readonly changeCoverButton = this.get('changeCoverButton')
  readonly removeButton = this.get('removeButton')

  get(selector: keyof typeof DOCUMENT_TITLE_SELECTORS): Locator {
    return this.locator(DOCUMENT_TITLE_SELECTORS[selector])
  }

  async fillTitle(title: string): Promise<void> {
    await this.title.fill(title)
  }

  async openIconPopup(): Promise<IconPage> {
    await this.title.hover()
    await this.addIconButton.click()
    return new IconPage(this.page)
  }

  async reopenIconPopup(type: 'Emoji' | 'Image' = 'Emoji'): Promise<void> {
    type === 'Emoji' ? await this.emoji.click() : await this.imageIcon.click()
  }

  async openCoverPopup(): Promise<CoverPage> {
    await this.title.hover()
    await this.waitForResponseWithAction('QueryUnsplashImage', this.addCoverButton.click())
    return new CoverPage(this.page)
  }

  async changeCover(): Promise<void> {
    await this.pageCover.hover({ force: true })
    await this.changeCoverButton.click()
  }

  async removeCover(): Promise<void> {
    await this.changeCover()
    await this.removeButton.click()
  }
}
