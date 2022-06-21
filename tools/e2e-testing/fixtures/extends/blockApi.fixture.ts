import { BlockApi } from '@/helpers/api/BlockApi'
import { FixtureReturnType } from '@/helpers/types/fixture.types'

export function apiFixture(): FixtureReturnType<BlockApi> {
  return async ({ page }, use): Promise<void> => {
    await page.goto('/')
    const csrfToken: string = await page.evaluate(() => (window as any).mashcardContext.csrfToken)
    const blockApi = new BlockApi(page, csrfToken)
    await use(blockApi)
  }
}
