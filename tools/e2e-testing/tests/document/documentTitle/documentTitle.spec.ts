import { test, expect } from '@/fixtures'
import { rem2Pixel } from '@/helpers/utils/rem2Pixel'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import { COMMON_STYLE, INITIAL_PAGE } from '@/tests/common/common.data'
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

  test('Verify the font-size is equal 2.5rem', async () => {
    await expect(documentTitle.title).toHaveCSS('font-size', rem2Pixel('2.25rem'))
  })

  test('Verify the initial page value and placeholder are equal Untitled', async ({ page }) => {
    await expect(documentTitle.title).toHaveAttribute('placeholder', 'Untitled')
    await expect(page).toHaveTitle('Untitled - MashCard')
  })

  test('Verify title can be filled', async ({ page }) => {
    await documentTitle.fillTitle('Document title')

    await expect(page).toHaveTitle('Document title - MashCard')
  })

  test('Verify Add icon & Add cover are shown when hover', async () => {
    await expect(documentTitle.actionButtons).toHaveCSS('opacity', '0')

    await documentTitle.title.hover()

    await expect(documentTitle.actionButtons).toHaveCSS('opacity', '1')
  })

  test('Verify Add icon & Add cover are changed background when hover', async () => {
    await documentTitle.title.hover()
    await documentTitle.addIconButton.hover()

    await expect(documentTitle.addIconButton).toHaveCSS('background-color', COMMON_STYLE.hoverBackground)

    await documentTitle.title.hover()
    await documentTitle.addCoverButton.hover()

    await expect(documentTitle.addCoverButton).toHaveCSS('background-color', COMMON_STYLE.hoverBackground)
  })
})
