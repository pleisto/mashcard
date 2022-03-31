import { FIVE_LAYER_PAGE_TREES } from '@/data/breadcrumb'
import { test, expect } from '@/fixtures/testFixtures'
import { DocumentTitlePage } from '@/pages/document/DocumentTitlePage'
import { PageListPage } from '@/pages/sidebar/PageListPage'
import { BreadcrumbPage } from '@/pages/topBar/BreadcrumbPage'

test.describe('Breadcrumb', () => {
  let pageList: PageListPage
  let breadcrumb: BreadcrumbPage

  test.beforeEach(async ({ page }) => {
    pageList = new PageListPage(page)
    await pageList.gotoHomePage()
    await pageList.removeAllPages()
    breadcrumb = new BreadcrumbPage(page)
  })

  test('Verify the initial breadcrumbs count equal 1 and named Untitled', async () => {
    await pageList.addPage()
    await pageList.getPageByIndex().click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(1)
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveText('Untitled')
  })

  test('Verify breadcrumbs count equal 2 when add a sub page', async () => {
    await pageList.addPage()
    await pageList.addSubPage()
    await pageList.getPageByIndex(1).click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(2)
  })

  test('Verify breadcrumb width is less than 150px', async () => {
    await pageList.addPage()
    await pageList.getPageByIndex().click()
    const lessThan150px = /(^\b(?:1[0-4][0-9]|[1-9]\d|\d)(?:\.\d+)?|150)px\b/
    await expect(breadcrumb.getBreadcrumbItems().nth(0)).toHaveCSS('width', lessThan150px)
  })

  test('Verify breadcrumb max width is equal 150px', async () => {
    await pageList.addPage()
    await pageList.renamePage('It is a breadcrumb which is more than 150px')
    await pageList.getPageByIndex().click()
    await expect(breadcrumb.getBreadcrumbItems().nth(0)).toHaveCSS('width', '150px')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('overflow', 'hidden')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('text-overflow', 'ellipsis')
    await expect(breadcrumb.getBreadcrumbTextByIndex()).toHaveCSS('white-space', 'nowrap')
  })

  test('Verify breadcrumb tooltip is working with icon', async ({ page }) => {
    await pageList.addPage()
    await pageList.getPageByIndex().click()
    const icon = await new DocumentTitlePage(page).addIcon()
    await icon.addEmoji('🤪')
    await breadcrumb.getBreadcrumbTextByIndex().hover()
    await expect(breadcrumb.getTooltip()).toContainText('🤪')
  })

  test('Verify breadcrumb tooltip is working without icon', async () => {
    await pageList.addPage()
    await pageList.renamePage('It is a breadcrumb which is more than 150px')
    await breadcrumb.getBreadcrumbTextByIndex().hover()
    await expect(breadcrumb.getTooltip()).toHaveText('It is a breadcrumb which is more than 150px')
  })

  // Skip the slow test for now, will fix it soon (creating page tree by api)
  test.skip('Verify breadcrumb max layer equal 4', async () => {
    test.setTimeout(120000)
    await pageList.createPageTree(FIVE_LAYER_PAGE_TREES)
    await pageList.getPageByIndex(4).click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(4)
    await expect(breadcrumb.getBreadcrumbTextByIndex(2)).toContainText('...')
  })

  test.skip('Verify can redirect to other page by breadcrumb', async () => {
    test.setTimeout(120000)
    await pageList.createPageTree(FIVE_LAYER_PAGE_TREES)
    await pageList.getPageByIndex(4).click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(4)
    await breadcrumb.getBreadcrumbTextByIndex(1).click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(2)
  })

  test.skip('Verify the last breadcrumb will be changed when clicking on the omitted breadcrumb', async () => {
    test.setTimeout(120000)
    await pageList.createPageTree(FIVE_LAYER_PAGE_TREES)
    await pageList.getPageByIndex(4).click()
    await expect(breadcrumb.getBreadcrumbItems()).toHaveCount(4)
    await expect(breadcrumb.getBreadcrumbTextByIndex(3)).toHaveText('page 1.1.1.1.1')
    await breadcrumb.getBreadcrumbTextByIndex(2).click()
    await expect(breadcrumb.getBreadcrumbTextByIndex(3)).toHaveText('page 1.1.1.1')
  })
})
