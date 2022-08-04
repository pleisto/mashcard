import { Locator } from '@playwright/test'
import { CommonPage } from '@/tests/common/common.page'
import { SIGN_IN_SELECTOR } from './signIn.selector'

export class SignInPage extends CommonPage {
  readonly title = this.get('title')

  get(selector: keyof typeof SIGN_IN_SELECTOR): Locator {
    return this.locator(SIGN_IN_SELECTOR[selector])
  }
}
