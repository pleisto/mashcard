import { TRASH_SELECTOR } from '@/selectors/sidebar'
import { BasePage } from '../BasePage'

export class TrashPage extends BasePage {
  async openTrashPage(): Promise<void> {
    await this.page.locator(TRASH_SELECTOR.trashButton).click()
  }
}
