import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'
import { test as baseTest } from '@playwright/test'
import { PageExtend } from '@/helpers/utils/PageExtend'

const istanbulCLIOutput = path.join(process.cwd(), '.nyc_output')

export function generateUUID(): string {
  return crypto.randomBytes(16).toString('hex')
}

export const test = baseTest.extend<{ pageExtend: PageExtend }>({
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
  }
})

export const expect = test.expect
