import { Page } from '@playwright/test'
import { PageList } from '../../components/sidebar/PageList'
import { test, expect } from '../../fixtures/testFixtures'
import { SIDEBAR_SELECTORS } from '../../selectors/sidebar'

test.skip('Page List', () => {
  let page: Page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/')
  })

  test.afterAll(async () => {
    await page.close()
  })

  test('verify page can be added', async () => {
    const pageList = new PageList(page)
    await pageList.addPage()
    await expect(page.locator(SIDEBAR_SELECTORS.mainActions.pageSection)).toContainText('Pages')
  })
})
