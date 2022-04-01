import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'
import { Page, test as baseTest } from '@playwright/test'
import { PageExtend } from '@/helpers/PageExtend'
import { BlockApi } from '@/helpers/api/BlockApi'

const istanbulCLIOutput = path.join(process.cwd(), '.nyc_output')

export function generateUUID(): string {
  return crypto.randomBytes(16).toString('hex')
}

interface Fixtures {
  pageExtend: PageExtend
  api: { page: Page; blockApi: BlockApi; csrfToken: string }
}

export const test = baseTest.extend<Fixtures>({
  context: async ({ context }, use) => {
    await context.addInitScript(() =>
      window.addEventListener('beforeunload', () =>
        (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__))
      )
    )
    await fs.promises.mkdir(istanbulCLIOutput, { recursive: true })
    await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
      if (coverageJSON)
        fs.writeFileSync(path.join(istanbulCLIOutput, `playwright_coverage_${generateUUID()}.json`), coverageJSON)
    })
    await use(context)
    for (const page of context.pages()) {
      await page.evaluate(() => (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__)))
    }
  },

  pageExtend: async ({ page }, use) => {
    const pageExtend = new PageExtend(page)
    await use(pageExtend)
  },

  api: async ({ page, request }, use) => {
    await page.goto('/')
    const csrfToken: string = await page.evaluate(() => (window as any).brickdocContext.csrfToken)
    const domain = await page.evaluate(() => (window as any).brickdocContext.currentSpace.domain)
    const blockApi = new BlockApi(request, csrfToken)
    const pages = await blockApi.getBlocks(domain)
    await blockApi.removeAllPages(pages)
    await use({ page, blockApi, csrfToken })
  }
})

export const expect = test.expect
