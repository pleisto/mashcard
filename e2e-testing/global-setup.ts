import { chromium, FullConfig } from '@playwright/test'
import { ACCOUNT_SELECTORS } from './selectors/account'

const email = process.env.E2E_LOGIN_EMAIL ?? 'ADMIN4@brickdoc.com'
const password = process.env.E2E_LOGIN_PASSWORD ?? 'PASSWORD4'

async function globalSetup(config: FullConfig): Promise<void> {
  const { baseURL = '/', storageState } = config.projects[0].use
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(baseURL)

  await page.fill(ACCOUNT_SELECTORS.sigIn.emailInput, email)
  await page.fill(ACCOUNT_SELECTORS.sigIn.passwordInput, password)

  await Promise.all([page.waitForNavigation(), page.locator(ACCOUNT_SELECTORS.sigIn.signInButton).click()])
  await page.context().storageState({
    path: `./${storageState}`
  })
  await browser.close()
}

export default globalSetup
