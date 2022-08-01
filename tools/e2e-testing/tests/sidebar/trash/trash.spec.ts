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
      await expect(trash.getTitle()).toContainText('Trash')
    })

    test('Verify search is working well', async () => {
      await trash.searchTrash('for search')

      await expect(trash.getTrashes()).toHaveCount(2)
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
      await expect(trash.getItemTitle()).toHaveClass('ellipsis')
      await expect(trash.getItemIcon()).toContainText(`${TRASH_SINGLE_PAGE.icon?.emoji}`)
    })

    test('Verify trash item has background-color and action button will be shown when hover', async () => {
      await trash.getItemByIndex().hover()

      await expect(trash.getItemByIndex()).toHaveCSS('background-color', COMMON_STYLE.hoverBackground)
      await expect(trash.getItemRestoreButton()).toBeVisible()
      await expect(trash.getItemRemoveButton()).toBeVisible()
    })

    test('Verify it can redirect to editor but uneditable when click on trash item', async ({ page }) => {
      await trash.getItemTitle().click()

      const editor = new EditorPage(page)
      await expect(editor.getEditorContent()).toHaveAttribute('contenteditable', 'false')

      const documentTitle = new DocumentTitlePage(page)
      await expect(documentTitle.getArticle()).toContainText('This page is in trash.')
    })

    test('Verify restore item is working well', async ({ page }) => {
      await trash.itemRestore()

      await expect(trash.getTrashes()).toHaveCount(0)

      const pageTree = new PageTreePage(page)
      await expect(pageTree.getPageByIndex()).toContainText(TRASH_SINGLE_PAGE.title)
    })

    test('Verify remove item is working well', async () => {
      await trash.itemRemove()

      await expect(trash.getTrashes()).toHaveCount(0)
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

      await expect(trash.getItemPath()).toContainText(`${TRASH_SINGLE_PAGE.icon?.emoji}${TRASH_SINGLE_PAGE.title}`)
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
      await trash.getItemCheckbox().click()

      await expect(trash.getSelectedCount()).toContainText('selected')
    })

    test('Verify selected checkbox behavior is correct', async () => {
      await trash.getItemCheckbox().click()

      await expect(trash.getImmediateCheckbox()).toBeVisible()

      await trash.getItemCheckbox(1).click()
      await trash.getItemCheckbox(2).click()

      await expect(trash.getSelectedAllCheckbox()).toBeVisible()
    })

    test('Verify restore selected is working well', async ({ page }) => {
      await trash.searchTrash('for search')
      await trash.getItemCheckbox().click()
      await trash.getItemCheckbox(1).click()
      await trash.selectedBarRestore()

      await expect(trash.getTrashes()).toHaveCount(0)
      const pageTree = new PageTreePage(page)
      await expect(pageTree.getPageByIndex()).toContainText('for search')
      await expect(pageTree.getPageByIndex(1)).toContainText('for search')
    })

    test('Verify remove selected is working well', async () => {
      await trash.getItemCheckbox().click()
      await trash.getItemCheckbox(1).click()
      await trash.selectedBarRemove()

      await expect(trash.getTrashes()).toHaveCount(1)
    })

    test('Verify it will not trigger dialog when click item checkbox', async () => {
      await trash.getItemCheckbox().click()
      await trash.getItemCheckbox(1).click()
      await trash.selectedBarRemove()
      await trash.getItemCheckbox().click()

      await expect(trash.getDialog()).not.toBeVisible()
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

    test('hover item one', async () => {
      await trash.getItemByIndex().hover()
    })

    test('select item one', async () => {
      await trash.getItemCheckbox().click()
    })

    test('select all', async () => {
      await trash.selectedAll()
    })
  })
})
