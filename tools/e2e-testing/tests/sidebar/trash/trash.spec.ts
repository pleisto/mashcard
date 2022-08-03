import { test, expect } from '@/fixtures'
import { EditorPage } from '@/tests/document/editor/editor.page'
import { DocumentTitlePage } from '@/tests/document/documentTitle/documentTitle.page'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import { TRASH_PAGE_TREE, TRASH_PAGE_TREE_FOR_VISUAL, TRASH_SINGLE_PAGE } from './trash.data'
import { TrashPage } from './trash.page'
import { COMMON_STYLE } from '@/tests/common/common.data'

test.describe('Trash', () => {
  let trash: TrashPage

  test.describe('Init & Search', () => {
    test.beforeEach(async ({ api, page }) => {
      await api.removeAllPages()
      await api.removeAllTrashPages()

      await api.createPageTree(TRASH_PAGE_TREE)
      await api.removeAllPages()
      trash = new TrashPage(page)
      await trash.openTrashPage()
    })

    test('Verify it can redirect to Trash page when click trash button', async () => {
      await expect(trash.title).toContainText('Trash')
    })

    test('Verify search is working well', async () => {
      await trash.searchTrash('for search')

      await expect(trash.trashes).toHaveCount(2)
    })
  })

  test.describe('Trash Item', () => {
    test.beforeEach(async ({ api, page }) => {
      await api.removeAllPages()
      await api.removeAllTrashPages()

      await api.createPage(TRASH_SINGLE_PAGE)
      await api.removeAllPages()
      trash = new TrashPage(page)
      await trash.openTrashPage()
    })

    test('Verify UI is working well', async () => {
      await expect(trash.itemTitles.nth(0)).toHaveClass('ellipsis')
      await expect(trash.itemIcons.nth(0)).toContainText(`${TRASH_SINGLE_PAGE.icon?.emoji}`)
    })

    test('Verify trash item has background-color and action button will be shown when hover', async () => {
      await trash.trashes.nth(0).hover()

      await expect(trash.trashes.nth(0)).toHaveCSS('background-color', COMMON_STYLE.hoverBackground)
      await expect(trash.itemRestoreButtons.nth(0)).toBeVisible()
      await expect(trash.itemRemoveButtons.nth(0)).toBeVisible()
    })

    test('Verify it can redirect to editor but uneditable when click on trash item', async ({ page }) => {
      await trash.itemTitles.nth(0).click()

      const editor = new EditorPage(page)
      await expect(editor.content).toHaveAttribute('contenteditable', 'false')

      const documentTitle = new DocumentTitlePage(page)
      await expect(documentTitle.article).toContainText('This page is in trash.')
    })

    test('Verify restore item is working well', async ({ page }) => {
      await trash.itemRestore()

      await expect(trash.trashes).toHaveCount(0)

      const pageTree = new PageTreePage(page)
      await expect(pageTree.pages.nth(0)).toContainText(TRASH_SINGLE_PAGE.title)
    })

    test('Verify remove item is working well', async () => {
      await trash.itemRemove()

      await expect(trash.trashes).toHaveCount(0)
    })
  })

  test.describe('Path', () => {
    test.beforeEach(async ({ api }) => {
      await api.removeAllPages()
      await api.removeAllTrashPages()

      await api.createPage(TRASH_SINGLE_PAGE)
    })

    test('Verify there has pages path as subtitle when remove subPage', async ({ api, page }) => {
      const subPageId = (await api.getBlocks()).filter(item => item.parentId)[0].id
      await api.removePage({ input: { id: subPageId, hardDelete: false } })

      trash = new TrashPage(page)
      await trash.openTrashPage()

      await expect(trash.itemPaths.nth(0)).toContainText(`${TRASH_SINGLE_PAGE.icon?.emoji}${TRASH_SINGLE_PAGE.title}`)
    })
  })

  test.describe('Selected Bar', () => {
    test.beforeEach(async ({ api, page }) => {
      await api.removeAllPages()
      await api.removeAllTrashPages()

      await api.createPageTree(TRASH_PAGE_TREE)
      await api.removeAllPages()
      trash = new TrashPage(page)
      await trash.openTrashPage()
    })

    test('Verify selected footer is shown when select item', async () => {
      await trash.itemCheckboxes.nth(0).click()

      await expect(trash.selectedCount).toContainText('selected')
    })

    test('Verify selected checkbox behavior is correct', async () => {
      await trash.itemCheckboxes.nth(0).click()

      await expect(trash.indeterminate).toBeVisible()

      await trash.itemCheckboxes.nth(1).click()
      await trash.itemCheckboxes.nth(2).click()

      await expect(trash.selectedAllButton).toBeVisible()
    })

    test('Verify restore selected is working well', async ({ page }) => {
      await trash.searchTrash('for search')
      await trash.itemCheckboxes.nth(0).click()
      await trash.itemCheckboxes.nth(1).click()
      await trash.selectedBarRestore()

      await expect(trash.trashes).toHaveCount(0)
      const pageTree = new PageTreePage(page)
      await expect(pageTree.pages.nth(0)).toContainText('for search')
      await expect(pageTree.pages.nth(1)).toContainText('for search')
    })

    test('Verify remove selected is working well', async () => {
      await trash.itemCheckboxes.nth(0).click()
      await trash.itemCheckboxes.nth(1).click()
      await trash.selectedBarRemove()

      await expect(trash.trashes).toHaveCount(1)
    })

    test('Verify it will not trigger dialog when click item checkbox', async () => {
      await trash.itemCheckboxes.nth(0).click()
      await trash.itemCheckboxes.nth(1).click()
      await trash.selectedBarRemove()
      await trash.itemCheckboxes.nth(0).click()

      await expect(trash.dialog).not.toBeVisible()
    })
  })

  test.describe('Visual test @visual', () => {
    test.beforeEach(async ({ api, page }) => {
      await api.removeAllPages()
      await api.removeAllTrashPages()

      await api.createPageTree(TRASH_PAGE_TREE_FOR_VISUAL)
      await api.removeAllPages({
        isSorted: true
      })
      trash = new TrashPage(page)
      await trash.openTrashPage()
    })

    test.afterEach(async () => {
      await trash.createScreenshot(await trash.getDeletedAtList())
    })

    test.only('hover item one', async () => {
      await trash.trashes.nth(0).hover()
    })

    test.only('select item one', async () => {
      await trash.itemCheckboxes.nth(0).click()
    })

    test.only('select all', async () => {
      await trash.selectedAll()
    })
  })
})
