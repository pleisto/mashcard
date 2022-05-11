import { BrowserType, chromium, firefox, FullConfig, webkit } from '@playwright/test'
import { TESTER } from '@/tests/account/signIn/tester.data'
import { login } from '@/helpers/login/login'

const browserList: { [key: string]: BrowserType } = {
  chromium,
  firefox,
  webkit
}

async function globalSetup(config: FullConfig): Promise<void> {
  const testBrowser = process.env.TEST_BROWSER ?? 'chromium'
  const project = config.projects.find(project => project.name === testBrowser)!
  const browser = await browserList[project.name].launch()

  const page = await browser.newPage({ baseURL: project.use.baseURL })
  await login(page, TESTER[project.name])
  await page.context().storageState({ path: `./storageState-${project.name}.json` })
  await browser.close()
}

export default globalSetup
