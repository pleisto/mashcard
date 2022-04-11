import { BlockApi } from '@/helpers/api/BlockApi'
import { PageExtend } from '@/helpers/PageExtend'
import { PlaywrightTestArgs } from '@playwright/test'

export interface Fixtures {
  pageExtend: PageExtend
  api: BlockApi
}

export type FixtureReturnType<T> = (testArgs: PlaywrightTestArgs, use: (use: T) => Promise<void>) => Promise<void>
