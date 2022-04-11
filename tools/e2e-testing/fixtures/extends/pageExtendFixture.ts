import { PageExtend } from '@/helpers/PageExtend'
import { FixtureReturnType } from '../types'

export function pageExtendFixture(): FixtureReturnType<PageExtend> {
  return async ({ page }, use) => {
    const pageExtend = new PageExtend(page)
    await use(pageExtend)
  }
}
