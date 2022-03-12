import { PageList } from '@/components/sidebar/PageList'
import { test, expect } from '@/fixtures/testFixtures'
import { SIDEBAR_SELECTORS } from '@/selectors/sidebar'

test.describe('Page List', () => {
  test('verify page can be added', async ({ page }) => {
    await page.goto('/')
    const pageList = new PageList(page)
    await pageList.addPage()
    await expect(page.locator(SIDEBAR_SELECTORS.mainActions.pageSection)).toContainText('Pages')
  })
})
