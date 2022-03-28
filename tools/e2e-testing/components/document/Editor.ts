import { Locator } from '@playwright/test'
import { EDITOR_SELECTORS } from '@/selectors/editor'
import { BasePage } from '../BasePage'

export class Editor extends BasePage {
  getEditorContent(): Locator {
    return this.page.locator(EDITOR_SELECTORS.editorContent.content)
  }
}
