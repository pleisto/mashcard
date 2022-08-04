import { test, expect } from '@/fixtures'
import { rem2Pixel } from '@/helpers/utils/rem2Pixel'
import { INITIAL_PAGE, TWO_LAYER_PAGE_TREE } from '@/tests/common/common.data'
import { NESTED_LAYER_PAGE_TREE, PAGE_LIST } from './page.data'
import { PageTreePage } from './pageTree.page'

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

      await expect(pageTree.pageSection).toContainText('Pages')
    })

    test('Verify sub page can be added', async ({ api }) => {
      await api.createPage(INITIAL_PAGE)
      await api.pageReload()

      await pageTree.addSubPage()

      await expect(pageTree.subPages.nth(1)).toHaveCSS('width', rem2Pixel('1rem'))
    })
  })

  test.describe('Action', () => {
    test('Verify action button is visible when hover page', async ({ api }) => {
      await api.createPage(INITIAL_PAGE)
      await api.pageReload()

      await pageTree.pages.nth(0).hover()

      await expect(pageTree.moreActionIcons.nth(0)).toBeVisible()
      await expect(pageTree.addSubPageButtons.nth(0)).toBeVisible()
    })

    test('Verify page can collapse when click arrow', async ({ api }) => {
      await api.createPageTree(TWO_LAYER_PAGE_TREE)
      await api.pageReload()

      const arrowClass = await pageTree.arrows.nth(0).getAttribute('class')
      if (arrowClass?.includes('-isExpanded-true')) {
        await pageTree.arrows.nth(0).click()
        expect(await pageTree.arrows.nth(0).getAttribute('class')).not.toMatch(/.+-isExpanded-true.*/g)
        await pageTree.arrows.nth(0).click()
        expect(await pageTree.arrows.nth(0).getAttribute('class')).toMatch(/.+-isExpanded-true.*/g)
      } else {
        await pageTree.arrows.nth(0).click()
        expect(await pageTree.arrows.nth(0).getAttribute('class')).toMatch(/.+-isExpanded-true.*/g)
        await pageTree.arrows.nth(0).click()
        expect(await pageTree.arrows.nth(0).getAttribute('class')).not.toMatch(/.+-isExpanded-true.*/g)
      }
    })
  })

  test.describe('Remove', () => {
    test('Verify page can be removed', async ({ api }) => {
      await api.createPage(INITIAL_PAGE)
      await api.pageReload()

      await pageTree.removePage()

      await expect(pageTree.pageSection).not.toBeVisible()
    })

    test('Verify remove last page with subPage will create a default page', async ({ api }) => {
      await api.createPageTree(TWO_LAYER_PAGE_TREE)
      await api.pageReload()

      await pageTree.removePage()

      await expect(pageTree.pages.nth(0)).toHaveCount(1)
    })

    test('Verify remove last page without subPage will create a default page', async ({ api }) => {
      await api.createPage(INITIAL_PAGE)
      await api.pageReload()

      await pageTree.removePage()

      await expect(pageTree.pages.nth(0)).toHaveCount(1)
    })
  })

  test.describe('Visual test @visual', () => {
    test.afterEach(async () => {
      await pageTree.createScreenshot()
    })

    test('Nested layer', async ({ api }) => {
      await api.createPageTree(NESTED_LAYER_PAGE_TREE)
      await api.pageReload()

      await pageTree.expandSubPageOneByOne(6)
    })

    test('Page List', async ({ api }) => {
      await api.createPageTree(PAGE_LIST())
      await api.pageReload()
    })
  })
})
