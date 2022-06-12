import { test, expect } from '@/fixtures'
import { rem2Pixel } from '@/helpers/utils/rem2Pixel'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import { INITIAL_PAGE } from '@/tests/common/common.data'
import { DocumentTitlePage } from './documentTitle.page'

test.describe('Document Title', () => {
  let documentTitle: DocumentTitlePage
  let pageTree: PageTreePage

  test.beforeEach(async ({ api, page }) => {
    documentTitle = new DocumentTitlePage(page)
    pageTree = new PageTreePage(page)

    await api.removeAllPages()
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()
    await pageTree.clickPage()
  })

  test('Verify the font-size is equal 2.25rem', async () => {
    await expect(documentTitle.getDocumentTitle()).toHaveCSS('font-size', rem2Pixel('2.25rem'))
  })

  test('Verify the initial page value and placeholder are equal Untitled', async ({ page }) => {
    await expect(documentTitle.getDocumentTitle()).toHaveAttribute('placeholder', 'Untitled')
    await expect(page).toHaveTitle('Untitled - Brickdoc')
  })

  test('Verify title can be filled', async ({ page }) => {
    await documentTitle.fillTitle('Document title')

    await expect(page).toHaveTitle('Document title - Brickdoc')
  })

  test('Verify Add icon & Add cover are shown when hover', async () => {
    await expect(documentTitle.getActionButtons()).toHaveCSS('opacity', '0')

    await documentTitle.getDocumentTitle().hover()

    await expect(documentTitle.getActionButtons()).toHaveCSS('opacity', '1')
  })

  test('Verify Add icon & Add cover are changed background when hover', async () => {
    await documentTitle.getAddIconButton().hover()

    await expect(documentTitle.getAddIconButton()).toHaveCSS('background-color', 'rgba(53, 108, 249, 0.1)')

    await documentTitle.getAddCoverButton().hover()

    await expect(documentTitle.getAddCoverButton()).toHaveCSS('background-color', 'rgba(53, 108, 249, 0.1)')
  })
})
