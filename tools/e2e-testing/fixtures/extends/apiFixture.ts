import { BlockApi } from '@/helpers/api/BlockApi'
import { FixtureReturnType } from '../types'

export function apiFixture(): FixtureReturnType<BlockApi> {
  return async ({ page }, use): Promise<void> => {
    await page.goto('/')
    const csrfToken: string = await page.evaluate(() => (window as any).brickdocContext.csrfToken)
    const blockApi = new BlockApi(page, csrfToken)
    await blockApi.removeAllPages()
    await use(blockApi)
  }
}
