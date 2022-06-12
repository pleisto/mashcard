import { test as baseTest } from '@playwright/test'
import { apiFixture, pageExtendFixture } from './extends'
import { Fixtures } from '@/helpers/types/fixture.types'

export const test = baseTest.extend<Fixtures>({
  // Disabled E2E coverage temporary
  // context: coverageFixture(),

  pageExtend: pageExtendFixture(),

  api: apiFixture()
})

export const expect = test.expect
