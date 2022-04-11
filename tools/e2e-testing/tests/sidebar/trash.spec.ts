import { TrashPage } from '@/pages/sidebar/TrashPage'
import { test, expect } from '@/fixtures'
import { COMMON_SELECTORS } from '@/selectors/common'

// wait for refactoring, just skip first
// eslint-disable-next-line jest/no-disabled-tests
test.skip('Trash', () => {
  test('Verify trash page is in viewport', async ({ page, pageExtend }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    const trash = new TrashPage(page)
    await trash.openTrashPage()
    const isInViewPort = await pageExtend.isInViewPort(COMMON_SELECTORS.tooltip)

    expect(isInViewPort).toBeTruthy()
  })
})
