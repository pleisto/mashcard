import { chromium, FullConfig } from '@playwright/test'
import { TESTER } from './data/tester'
import { login } from './helpers/login'

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
