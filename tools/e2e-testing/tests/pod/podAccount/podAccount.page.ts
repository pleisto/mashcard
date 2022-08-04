import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { ACCOUNT_SELECTOR } from './podAccount.selector'

export class AccountPage extends CommonPage {
  readonly leaves = this.get('leaves')
  readonly deleteAccountButton = this.get('deleteAccount')

  get(selector: keyof typeof ACCOUNT_SELECTOR): Locator {
    return this.locator(ACCOUNT_SELECTOR[selector])
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountButton.click()
  }
}
