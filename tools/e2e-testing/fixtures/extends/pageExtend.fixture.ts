import { PageExtend } from '@/helpers/extends/PageExtend'
import { FixtureReturnType } from '@/helpers/types/fixture.types'

export function pageExtendFixture(): FixtureReturnType<PageExtend> {
  return async ({ page }, use) => {
    const pageExtend = new PageExtend(page)
    await use(pageExtend)
  }
}
