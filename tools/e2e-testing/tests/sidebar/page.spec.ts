import { PageListPage } from '@/pages/sidebar/PageListPage'
import { test, expect } from '@/fixtures/testFixtures'
import { rem2Pixel } from '@/helpers/utils/rem2Pixel'

test.describe('Page List', () => {
  let pageList: PageListPage

  test.beforeEach(async ({ page }) => {
    pageList = new PageListPage(page)
    await pageList.gotoHomePage()
    await pageList.removeAllPages()
    await pageList.addPage()
  })

  test('Verify page can be added', async () => {
    await expect(pageList.getPageSectionTitle()).toContainText('Pages')
  })

  test('Verify action button is visible when hover page', async () => {
    await pageList.hover()
    await expect(pageList.getMoreActionIcon()).toBeVisible()
    await expect(pageList.getAddSubPageButton()).toBeVisible()
  })

  test('Verify page can collapse when click arrow', async () => {
    const arrowClass = await pageList.getArrow().getAttribute('class')
    if (arrowClass?.includes('-isExpanded-true')) {
      await pageList.getArrow().click()
      expect(await pageList.getArrow().getAttribute('class')).not.toMatch(/.+-isExpanded-true.*/g)
      await pageList.getArrow().click()
      expect(await pageList.getArrow().getAttribute('class')).toMatch(/.+-isExpanded-true.*/g)
    } else {
      await pageList.getArrow().click()
      expect(await pageList.getArrow().getAttribute('class')).toMatch(/.+-isExpanded-true.*/g)
      await pageList.getArrow().click()
      expect(await pageList.getArrow().getAttribute('class')).not.toMatch(/.+-isExpanded-true.*/g)
    }
  })

  test('Verify sub page can be added', async () => {
    await pageList.addSubPage()
    await expect(pageList.getSubPage(1)).toHaveCSS('width', rem2Pixel('1rem'))
  })
})
