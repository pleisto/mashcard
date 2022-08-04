import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { TRASH_SELECTOR } from './trash.selector'
export class TrashPage extends CommonPage {
  readonly openTrashButton = this.get('openTrashButton')
  readonly title = this.get('title')
  readonly searchInput = this.get('searchInput')
  readonly trashes = this.get('trashes')
  readonly itemTitles = this.get('itemTitles')
  readonly itemPaths = this.get('itemPaths')
  readonly itemIcons = this.get('itemIcons')
  readonly itemRestoreButtons = this.get('itemRestoreButtons')
  readonly itemRemoveButtons = this.get('itemRemoveButtons')
  readonly itemCheckboxes = this.get('itemCheckboxes')
  readonly selectedCount = this.get('selectedCount')
  readonly indeterminate = this.get('indeterminate')
  readonly selectedAllButton = this.get('selectedAllButton')
  readonly selectedRestore = this.get('selectedRestore')
  readonly selectedRemove = this.get('selectedRemove')
  readonly deletedAt = this.get('deletedAt')

  get(selector: keyof typeof TRASH_SELECTOR): Locator {
    return this.locator(TRASH_SELECTOR[selector])
  }

  async getDeletedAtList(): Promise<Locator[]> {
    const count = await this.deletedAt.count()
    const deletedAtList = []
    for (let i = 0; i < count; i++) {
      deletedAtList.push(this.deletedAt.nth(i))
    }
    return deletedAtList
  }

  async openTrashPage(): Promise<void> {
    await this.openTrashButton.click()
  }

  async searchTrash(keyword: string): Promise<void> {
    await this.waitForResponseWithAction('GetTrashBlocks', this.searchInput.fill(keyword))
    await this.page.waitForTimeout(300)
  }

  async itemRestore(index: number = 0): Promise<void> {
    await this.trashes.nth(index).hover()
    await this.waitForResponseWithAction('blockRestore', this.itemRestoreButtons.nth(index).click())
  }

  async itemRemove(index: number = 0): Promise<void> {
    await this.trashes.nth(index).hover()
    await this.itemRemoveButtons.nth(index).click()
    await this.waitForResponseWithAction('blockHardDelete', this.dialogDeletePageButton.click())
  }

  async selectedBarRestore(): Promise<void> {
    await this.waitForResponseWithAction('blockRestore', this.selectedRestore.click())
  }

  async selectedBarRemove(): Promise<void> {
    await this.selectedRemove.click()
    await this.waitForResponseWithAction('blockHardDelete', this.dialogDeletePageButton.click())
  }

  /** Only used for at least two items */
  async selectedAll(): Promise<void> {
    await this.itemCheckboxes.nth(0).click()
    await this.indeterminate.click()
  }
}
