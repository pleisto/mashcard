import { SIGN_IN_SELECTOR } from '@/tests/account/signIn/signIn.selector'
import { Tester } from '@/tests/account/signIn/tester.data'
import { Page } from '@playwright/test'

export const login = async (page: Page, tester: Tester): Promise<void> => {
  const { email, password } = tester
  await page.goto('/accounts/sign_in')
  await page.fill(SIGN_IN_SELECTOR.emailInput, email)
  await page.fill(SIGN_IN_SELECTOR.passwordInput, password)
  await page.click(SIGN_IN_SELECTOR.signInButton)
  await page.waitForNavigation()
}
