import { Locator } from '@playwright/test'
import { EDITOR_SELECTORS } from '@/selectors/document'
import { BasePage } from '../../BasePage'

export class EditorPage extends BasePage {
  getEditorContent(): Locator {
    return this.page.locator(EDITOR_SELECTORS.content)
  }
}
