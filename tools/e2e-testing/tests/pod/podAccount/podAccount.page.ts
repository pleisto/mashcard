import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { ACCOUNT_SELECTOR } from './podAccount.selector'

export class AccountPage extends CommonPage {
  getLeavesByIndex(index: number = 0): Locator {
    return this.page.locator(ACCOUNT_SELECTOR.leave(index))
  }

  getDeleteAccountButton(): Locator {
    return this.page.locator(ACCOUNT_SELECTOR.deleteAccount)
  }

  async deleteAccount(): Promise<void> {
    await this.getDeleteAccountButton().click()
  }
}
