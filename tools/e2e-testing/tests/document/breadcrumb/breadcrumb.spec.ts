import { test, expect } from '@/fixtures'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import { INITIAL_PAGE, TWO_LAYER_PAGE_TREE } from '@/tests/common/common.data'
import { FIVE_LAYER_PAGE_TREE, SUPER_LONG_TITLE_PAGE } from './breadcrumb.data'
import { BreadcrumbPage } from './breadcrumb.page'

test.describe('Breadcrumb', () => {
  let pageTree: PageTreePage
  let breadcrumb: BreadcrumbPage

  test.beforeEach(async ({ api, page }) => {
    breadcrumb = new BreadcrumbPage(page)
    pageTree = new PageTreePage(page)
    await api.removeAllPages()
  })

  test('Verify the initial breadcrumbs count equal 1 and named Untitled', async ({ api }) => {
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()

    await pageTree.clickPage()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(1)
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveText(INITIAL_PAGE.title)
  })

  test('Verify breadcrumbs count equal 2 when add a sub page', async ({ api }) => {
    await api.createPageTree(TWO_LAYER_PAGE_TREE)
    await api.pageReload()

    await pageTree.expandArrow()
    await pageTree.clickPage(1)

    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(2)
  })

  test('Verify breadcrumb width is less than 400px', async ({ api }) => {
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()

    await pageTree.clickPage()
    const lessThan400px = /(^\b(?:1[0-4][0-9]|[1-9]\d|\d)(?:\.\d+)?|400)px\b/

    await expect(breadcrumb.getBreadcrumbItemsByIndex()).toHaveCSS('width', lessThan400px)
  })

  test('Verify breadcrumb max width is equal 400px', async ({ api }) => {
    await api.createPage(SUPER_LONG_TITLE_PAGE)
    await api.pageReload()

    await pageTree.clickPage()

    await expect(breadcrumb.getBreadcrumbItemsByIndex()).toHaveCSS('width', '400px')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('overflow', 'hidden')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('text-overflow', 'ellipsis')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('white-space', 'nowrap')
  })

  test('Verify breadcrumb tooltip is working with icon', async ({ api }) => {
    await api.createPage(SUPER_LONG_TITLE_PAGE)
    await api.pageReload()

    await pageTree.clickPage()
    await breadcrumb.getBreadcrumbTextByIndex().hover()

    await expect(breadcrumb.getTooltip()).toContainText(SUPER_LONG_TITLE_PAGE.icon?.emoji as string)
  })

  test('Verify breadcrumb tooltip is working without icon', async ({ api }) => {
    await api.createPage(SUPER_LONG_TITLE_PAGE)
    await api.pageReload()

    await pageTree.clickPage()
    await breadcrumb.getBreadcrumbTextByIndex().hover()

    await expect(breadcrumb.getTooltip()).toContainText(SUPER_LONG_TITLE_PAGE.title)
  })

  test('Verify breadcrumb max layer equal 4', async ({ api }) => {
    await api.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.pageReload()

    await pageTree.expandSubPageOneByOne(4)
    await pageTree.clickPage(4)

    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(4)
    await expect(breadcrumb.getBreadcrumbItemsByIndex(1)).toContainText('...')
  })

  test('Verify can redirect to other page by breadcrumb', async ({ api }) => {
    await api.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.pageReload()

    await pageTree.expandSubPageOneByOne(4)
    await pageTree.clickPage(4)
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(4)

    await breadcrumb.redirectToPage()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(1)
  })

  test('Verify the omitted item exists in the menubar when hover on ... breadcrumb', async ({ api }) => {
    await api.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.pageReload()

    await pageTree.expandSubPageOneByOne(4)
    await pageTree.clickPage(4)
    await expect(breadcrumb.getBreadcrumbTextByIndex(3)).toHaveText('page 1-1-1-1-1')

    await breadcrumb.getBreadcrumbItemsByIndex(1).hover()
    await expect(breadcrumb.getItemsInMenubar()).toHaveCount(2)
  })

  test('Verify it can direct to the page when clicking on the omitted item', async ({ api }) => {
    await api.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.pageReload()

    await pageTree.expandSubPageOneByOne(4)
    await pageTree.clickPage(4)
    await expect(breadcrumb.getBreadcrumbTextByIndex(3)).toHaveText('page 1-1-1-1-1')

    await breadcrumb.getBreadcrumbItemsByIndex(1).hover()
    await breadcrumb.redirectToPage(true)
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(2)
  })

  test.describe('Visual test @visual', () => {
    test('layer more than 4', async ({ api }) => {
      await api.createPageTree(FIVE_LAYER_PAGE_TREE)
      await api.pageReload()

      await pageTree.expandSubPageOneByOne(4)
      await pageTree.clickPage(4)
      await breadcrumb.getBreadcrumbItemsByIndex(1).hover()

      await breadcrumb.createScreenshot()
    })
  })
})
