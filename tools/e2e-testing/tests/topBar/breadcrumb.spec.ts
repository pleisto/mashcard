import { FIVE_LAYER_PAGE_TREE, SUPER_LONG_TITLE_PAGE } from '@/data/breadcrumb'
import { INITIAL_PAGE, TWO_LAYER_PAGE_TREE } from '@/data/common'
import { test, expect } from '@/fixtures'
import { PageListPage } from '@/pages/sidebar/PageListPage'
import { BreadcrumbPage } from '@/pages/topBar/BreadcrumbPage'

test.describe('Breadcrumb', () => {
  let pageList: PageListPage
  let breadcrumb: BreadcrumbPage

  test.beforeEach(async ({ page }) => {
    breadcrumb = new BreadcrumbPage(page)
    pageList = new PageListPage(page)
  })

  test('Verify the initial breadcrumbs count equal 1 and named Untitled', async ({ api }) => {
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()

    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(1)
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveText('Untitled')
  })

  test('Verify breadcrumbs count equal 2 when add a sub page', async ({ api }) => {
    await api.createPageTree(TWO_LAYER_PAGE_TREE)
    await api.pageReload()

    await pageList.expandArrow()
    await pageList.clickPage(1)

    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(2)
  })

  test('Verify breadcrumb width is less than 400px', async ({ api }) => {
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()

    await pageList.clickPage()
    const lessThan400px = /(^\b(?:1[0-4][0-9]|[1-9]\d|\d)(?:\.\d+)?|400)px\b/

    await expect(breadcrumb.getBreadcrumbItems().nth(0)).toHaveCSS('width', lessThan400px)
  })

  test('Verify breadcrumb max width is equal 400px', async ({ api }) => {
    await api.createPage(SUPER_LONG_TITLE_PAGE)
    await api.pageReload()

    await pageList.clickPage()

    await expect(breadcrumb.getBreadcrumbItems().nth(0)).toHaveCSS('width', '400px')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('overflow', 'hidden')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('text-overflow', 'ellipsis')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('white-space', 'nowrap')
  })

  test('Verify breadcrumb tooltip is working with icon', async ({ api }) => {
    await api.createPage(SUPER_LONG_TITLE_PAGE)
    await api.pageReload()

    await pageList.clickPage()
    await breadcrumb.getBreadcrumbTextByIndex().hover()

    await expect(breadcrumb.getTooltip()).toContainText(SUPER_LONG_TITLE_PAGE.icon?.emoji as string)
  })

  test('Verify breadcrumb tooltip is working without icon', async ({ api }) => {
    await api.createPage(SUPER_LONG_TITLE_PAGE)
    await api.pageReload()

    await pageList.clickPage()
    await breadcrumb.getBreadcrumbTextByIndex().hover()

    await expect(breadcrumb.getTooltip()).toContainText(SUPER_LONG_TITLE_PAGE.title)
  })

  test('Verify breadcrumb max layer equal 4', async ({ api }) => {
    await api.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.pageReload()

    await pageList.expandSubPageOneByOne(4)
    await pageList.clickPage(4)

    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(4)
    await expect(breadcrumb.getBreadcrumbTextByIndex(1)).toContainText('...')
  })

  test('Verify can redirect to other page by breadcrumb', async ({ api }) => {
    await api.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.pageReload()

    await pageList.expandSubPageOneByOne(4)
    await pageList.clickPage(4)
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(4)
    await breadcrumb.getBreadcrumbTextByIndex().click()

    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(1)
  })

  test('Verify the omitted item exists in the menubar when hover on ... breadcrumb', async ({ api }) => {
    await api.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.pageReload()

    await pageList.expandSubPageOneByOne(4)
    await pageList.clickPage(4)
    await expect(breadcrumb.getBreadcrumbTextByIndex(3)).toHaveText('page 1-1-1-1-1')
    await breadcrumb.getBreadcrumbTextByIndex(1).hover()

    await expect(breadcrumb.getItemInMenubar()).toHaveCount(2)
  })

  test('Verify it can direct to the page when clicking on the omitted item', async ({ api }) => {
    await api.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.pageReload()

    await pageList.expandSubPageOneByOne(4)
    await pageList.clickPage(4)
    await expect(breadcrumb.getBreadcrumbTextByIndex(3)).toHaveText('page 1-1-1-1-1')
    await breadcrumb.getBreadcrumbTextByIndex(1).hover()
    await breadcrumb.getItemInMenubar().nth(0).click()

    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(2)
  })
})
