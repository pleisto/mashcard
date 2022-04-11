import { test as baseTest } from '@playwright/test'
import { apiFixture, coverageFixture, pageExtendFixture } from './extends'
import { Fixtures } from './types'

export const test = baseTest.extend<Fixtures>({
  context: coverageFixture(),

  pageExtend: pageExtendFixture(),

  api: apiFixture()
})

export const expect = test.expect
