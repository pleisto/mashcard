import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { TRASH_SELECTOR } from './trash.selector'

export class TrashPage extends CommonPage {
  getTrashButton(): Locator {
    return this.page.locator(TRASH_SELECTOR.trashButton)
  }

  getTitle(): Locator {
    return this.page.locator(TRASH_SELECTOR.trashTitle)
  }

  getSearchInput(): Locator {
    return this.page.locator(TRASH_SELECTOR.trashSearchInput)
  }

  getTrashes(): Locator {
    return this.page.locator(TRASH_SELECTOR.trashItems)
  }

  getItemByIndex(index: number = 0): Locator {
    return this.getTrashes().nth(index)
  }

  getItemTitle(index: number = 0): Locator {
    return this.page.locator(TRASH_SELECTOR.trashItemTitle(index))
  }

  getItemIcon(index: number = 0): Locator {
    return this.page.locator(TRASH_SELECTOR.trashItemIcon(index))
  }

  getItemPath(index: number = 0): Locator {
    return this.page.locator(TRASH_SELECTOR.trashItemPath(index))
  }

  getItemRestoreButton(index: number = 0): Locator {
    return this.page.locator(TRASH_SELECTOR.trashItemRestoreButton(index))
  }

  getItemRemoveButton(index: number = 0): Locator {
    return this.page.locator(TRASH_SELECTOR.trashItemRemoveButton(index))
  }

  getItemCheckbox(index: number = 0): Locator {
    return this.page.locator(TRASH_SELECTOR.trashItemCheckbox(index))
  }

  getImmediateCheckbox(): Locator {
    return this.page.locator(TRASH_SELECTOR.trashIndeterminate)
  }

  getSelectedCount(): Locator {
    return this.page.locator(TRASH_SELECTOR.trashSelectedCount)
  }

  getSelectedAllCheckbox(): Locator {
    return this.page.locator(TRASH_SELECTOR.trashSelectedAll)
  }

  getSelectedBarRestoreButton(): Locator {
    return this.page.locator(TRASH_SELECTOR.trashSelectedRestore)
  }

  getSelectedBarRemoveButton(): Locator {
    return this.page.locator(TRASH_SELECTOR.trashSelectedRemove)
  }

  async openTrashPage(): Promise<void> {
    await this.getTrashButton().click()
  }

  async searchTrash(keyword: string): Promise<void> {
    await this.waitForResponseWithAction('GetTrashBlocks', this.getSearchInput().fill(keyword))
  }

  async itemRestore(index: number = 0): Promise<void> {
    await this.getItemByIndex(index).hover()
    await this.waitForResponseWithAction('blockRestore', this.getItemRestoreButton(index).click())
  }

  async itemRemove(index: number = 0): Promise<void> {
    await this.getItemByIndex(index).hover()
    await this.getItemRemoveButton(index).click()
    await this.waitForResponseWithAction('blockHardDelete', this.getDialogDeleteButton().click())
  }

  async selectedBarRestore(): Promise<void> {
    await this.waitForResponseWithAction('blockRestore', this.getSelectedBarRestoreButton().click())
  }

  async selectedBarRemove(): Promise<void> {
    await this.getSelectedBarRemoveButton().click()
    await this.waitForResponseWithAction('blockHardDelete', this.getDialogDeleteButton().click())
  }
}
