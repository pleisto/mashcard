import { BrowserType, chromium, firefox, request, webkit } from '@playwright/test'
import path from 'path'
import fs from 'fs'

const browserList: { [key: string]: BrowserType } = {
  chromium,
  firefox,
  webkit
}

async function globalSetup(): Promise<void> {
  const project = process.env.TEST_BROWSER ?? 'chromium'
  const module = process.env.TEST_MODULE ?? ''
  const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000/'

  const userParams = `name=${project}-${module}&email=${project}-${module}@mashcard.com`
  const fileName = path.join(`./storage/${project}-${module}.json`)

  if (!fs.existsSync(fileName)) {
    const requestContext = await request.newContext()
    const response = await requestContext.post(`${baseURL}$internal-apis/accounts/auth/developer/callback`, {
      data: userParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    await requestContext.storageState({ path: fileName })
    await requestContext.dispose()

    // When the user not exist, will redirect to sign up page to create it.
    if (response.url().includes('/accounts/sign-up')) {
      const browser = await browserList[project].launch()
      const page = await browser.newPage({ baseURL, storageState: fileName })

      await page.goto('/accounts/sign-up')
      await page.locator('button[type="submit"]').click()
      await page.waitForNavigation()
      await page.context().storageState({ path: fileName })
    }
  }
}

export default globalSetup
