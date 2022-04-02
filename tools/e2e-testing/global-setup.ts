import { chromium, FullConfig, Page } from '@playwright/test'
import { TESTER, Tester } from './data/tester'
import { SIGN_IN_SELECTOR } from './selectors/account'

const login = async (page: Page, tester: Tester): Promise<void> => {
  const { email, password } = tester
  await page.goto('/accounts/sign_in', { waitUntil: 'networkidle' })
  await page.fill(SIGN_IN_SELECTOR.emailInput, email)
  await page.fill(SIGN_IN_SELECTOR.passwordInput, password)
  await page.click(SIGN_IN_SELECTOR.signInButton)
  await page.waitForNavigation()
}

async function globalSetup(config: FullConfig): Promise<void> {
  const browser = await chromium.launch()

  for (let index = 0; index < config.projects.length; index++) {
    const project = config.projects[index]

    const page = await browser.newPage({ baseURL: project.use.baseURL })
    await login(page, TESTER[project.name])
    await page.context().storageState({ path: `./storageState-${project.name}.json` })
  }

  await browser.close()
}

export default globalSetup
