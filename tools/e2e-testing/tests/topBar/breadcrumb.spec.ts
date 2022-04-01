import { FIVE_LAYER_PAGE_TREE, SINGLE_PAGE, SINGLE_PAGE_WITH_ICON } from '@/data/breadcrumb'
import { INITIAL_PAGE, TWO_LAYER_PAGE_TREE } from '@/data/common'
import { test, expect } from '@/fixtures/testFixtures'
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
    await api.blockApi.createPage(INITIAL_PAGE)
    await api.page.reload()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(1)
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveText('Untitled')
  })

  test('Verify breadcrumbs count equal 2 when add a sub page', async ({ api }) => {
    await api.blockApi.createPageTree(TWO_LAYER_PAGE_TREE)
    await api.page.reload()
    await pageList.expandArrow()
    await pageList.getPageByIndex(1).click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(2)
  })

  test('Verify breadcrumb width is less than 150px', async ({ api }) => {
    await api.blockApi.createPage(INITIAL_PAGE)
    await api.page.reload()
    await pageList.getPageByIndex().click()
    const lessThan150px = /(^\b(?:1[0-4][0-9]|[1-9]\d|\d)(?:\.\d+)?|150)px\b/
    await expect(breadcrumb.getBreadcrumbItems().nth(0)).toHaveCSS('width', lessThan150px)
  })

  test('Verify breadcrumb max width is equal 150px', async ({ api }) => {
    await api.blockApi.createPage(SINGLE_PAGE)
    await api.page.reload()
    await pageList.getPageByIndex().click()
    await expect(breadcrumb.getBreadcrumbItems().nth(0)).toHaveCSS('width', '150px')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('overflow', 'hidden')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('text-overflow', 'ellipsis')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('white-space', 'nowrap')
  })

  test('Verify breadcrumb tooltip is working with icon', async ({ api }) => {
    await api.blockApi.createPage(SINGLE_PAGE_WITH_ICON)
    await api.page.reload()
    await pageList.getPageByIndex().click()
    await breadcrumb.getBreadcrumbTextByIndex().hover()
    await expect(breadcrumb.getTooltip()).toContainText('😛')
  })

  test('Verify breadcrumb tooltip is working without icon', async ({ api }) => {
    await api.blockApi.createPage(SINGLE_PAGE)
    await api.page.reload()
    await pageList.getPageByIndex().click()
    await breadcrumb.getBreadcrumbTextByIndex().hover()
    await expect(breadcrumb.getTooltip()).toHaveText('It is a breadcrumb which is more than 150px')
  })

  test('Verify breadcrumb max layer equal 4', async ({ api }) => {
    await api.blockApi.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.page.reload()

    for (let index = 0; index < 4; index++) {
      await pageList.expandArrow(index)
    }
    await pageList.getPageByIndex(4).click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(4)
    await expect(breadcrumb.getBreadcrumbTextByIndex(2)).toContainText('...')
  })

  test('Verify can redirect to other page by breadcrumb', async ({ api }) => {
    await api.blockApi.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.page.reload()
    for (let index = 0; index < 4; index++) {
      await pageList.expandArrow(index)
    }
    await pageList.getPageByIndex(4).click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(4)
    await breadcrumb.getBreadcrumbTextByIndex(1).click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(2)
  })

  test('Verify the last breadcrumb will be changed when clicking on the omitted breadcrumb', async ({ api }) => {
    await api.blockApi.createPageTree(FIVE_LAYER_PAGE_TREE)
    await api.page.reload()
    for (let index = 0; index < 4; index++) {
      await pageList.expandArrow(index)
    }
    await pageList.getPageByIndex(4).click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(4)
    await expect(breadcrumb.getBreadcrumbTextByIndex(3)).toHaveText('page 1-1-1-1-1')
    await breadcrumb.getBreadcrumbTextByIndex(2).click()
    await expect(breadcrumb.getBreadcrumbTextByIndex(3)).toHaveText('page 1-1-1-1')
  })
})
