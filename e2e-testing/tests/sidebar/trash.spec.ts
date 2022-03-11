import { Trash } from '../../components/sidebar/Trash'
import { test, expect } from '../../fixtures/testFixtures'
import { COMMON_SELECTORS } from '../../selectors/common'

test.describe('Trash', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })

  test('verify trash page is in viewport', async ({ page, pageExtend }) => {
    const trash = new Trash(page)
    await trash.openTrashPage()
    const isInViewPort = await pageExtend.isInViewPort(COMMON_SELECTORS.tooltip)
    expect(isInViewPort).toBeTruthy()
  })
})
