import { chromium, FullConfig } from '@playwright/test'
import { ACCOUNT_SELECTORS } from './selectors/account'

const email = process.env.E2E_LOGIN_EMAIL ?? 'ADMIN3@brickdoc.com'
const password = process.env.E2E_LOGIN_PASSWORD ?? 'PASSWORD3'

async function globalSetup(config: FullConfig): Promise<void> {
  const { baseURL, storageState } = config.projects[0].use
  const browser = await chromium.launch()
  const page = await browser.newPage({ baseURL })
  await page.goto(`/accounts/sign_in`)

  await page.fill(ACCOUNT_SELECTORS.signIn.emailInput, email)
  await page.fill(ACCOUNT_SELECTORS.signIn.passwordInput, password)
  await page.click(ACCOUNT_SELECTORS.signIn.signInButton)

  await page.waitForNavigation()
  await page.context().storageState({
    path: `./${storageState}`
  })
  await browser.close()
}

export default globalSetup
