import { PageListPage } from '@/pages/sidebar/PageListPage'
import { test, expect } from '@/fixtures'
import { rem2Pixel } from '@/helpers/utils/rem2Pixel'
import { INITIAL_PAGE, TWO_LAYER_PAGE_TREE } from '@/data/common'

test.describe('Page List', () => {
  let pageList: PageListPage

  test.beforeEach(async ({ page }) => {
    pageList = new PageListPage(page)
  })

  test('Verify page can be added', async ({ api }) => {
    await api.pageReload()
    await pageList.addPage()

    await expect(pageList.getPageSectionTitle()).toContainText('Pages')
  })

  test('Verify page can be removed', async ({ api }) => {
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()

    await pageList.removePage()

    await expect(pageList.getPageSectionTitle()).not.toBeVisible()
  })

  test('Verify action button is visible when hover page', async ({ api }) => {
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()

    await pageList.getPageByIndex().hover()

    await expect(pageList.getMoreActionIcon()).toBeVisible()
    await expect(pageList.getAddSubPageButton()).toBeVisible()
  })

  test('Verify page can collapse when click arrow', async ({ api }) => {
    await api.createPageTree(TWO_LAYER_PAGE_TREE)
    await api.pageReload()

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

  test('Verify sub page can be added', async ({ api }) => {
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()

    await pageList.addSubPage()

    await expect(pageList.getSubPage(1)).toHaveCSS('width', rem2Pixel('1rem'))
  })
})
