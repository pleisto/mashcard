import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import { test, expect } from '@/fixtures'
import { rem2Pixel } from '@/helpers/utils/rem2Pixel'
import { INITIAL_PAGE, TWO_LAYER_PAGE_TREE } from '@/tests/common/common.data'

test.describe('Page List', () => {
  let pageTree: PageTreePage

  test.beforeEach(async ({ api, page }) => {
    pageTree = new PageTreePage(page)
    await api.removeAllPages()
  })

  test.describe('Create', () => {
    test('Verify page can be added', async ({ api }) => {
      await api.pageReload()
      await pageTree.addPage()

      await expect(pageTree.getPageSectionTitle()).toContainText('Pages')
    })

    test('Verify sub page can be added', async ({ api }) => {
      await api.createPage(INITIAL_PAGE)
      await api.pageReload()

      await pageTree.addSubPage()

      await expect(pageTree.getSubPage(1)).toHaveCSS('width', rem2Pixel('1rem'))
    })
  })

  test.describe('Action', () => {
    test('Verify action button is visible when hover page', async ({ api }) => {
      await api.createPage(INITIAL_PAGE)
      await api.pageReload()

      await pageTree.getPageByIndex().hover()

      await expect(pageTree.getMoreActionIcon()).toBeVisible()
      await expect(pageTree.getAddSubPageButton()).toBeVisible()
    })

    test('Verify page can collapse when click arrow', async ({ api }) => {
      await api.createPageTree(TWO_LAYER_PAGE_TREE)
      await api.pageReload()

      const arrowClass = await pageTree.getArrow().getAttribute('class')
      if (arrowClass?.includes('-isExpanded-true')) {
        await pageTree.getArrow().click()
        expect(await pageTree.getArrow().getAttribute('class')).not.toMatch(/.+-isExpanded-true.*/g)
        await pageTree.getArrow().click()
        expect(await pageTree.getArrow().getAttribute('class')).toMatch(/.+-isExpanded-true.*/g)
      } else {
        await pageTree.getArrow().click()
        expect(await pageTree.getArrow().getAttribute('class')).toMatch(/.+-isExpanded-true.*/g)
        await pageTree.getArrow().click()
        expect(await pageTree.getArrow().getAttribute('class')).not.toMatch(/.+-isExpanded-true.*/g)
      }
    })
  })

  test.describe('Remove', () => {
    test('Verify page can be removed', async ({ api }) => {
      await api.createPage(INITIAL_PAGE)
      await api.pageReload()

      await pageTree.removePage()

      await expect(pageTree.getPageSectionTitle()).not.toBeVisible()
    })

    test('Verify remove last page with subPage will create a default page', async ({ api }) => {
      await api.createPageTree(TWO_LAYER_PAGE_TREE)
      await api.pageReload()

      await pageTree.removePage()

      await expect(pageTree.getPages()).toHaveCount(1)
    })

    test('Verify remove last page without subPage will create a default page', async ({ api }) => {
      await api.createPage(INITIAL_PAGE)
      await api.pageReload()

      await pageTree.removePage()

      await expect(pageTree.getPages()).toHaveCount(1)
    })
  })
})
