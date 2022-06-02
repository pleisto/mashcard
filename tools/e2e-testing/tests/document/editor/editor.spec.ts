import { test, expect } from '@/fixtures'
import { EditorPage } from '@/tests/document/editor/editor.page'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import { INITIAL_PAGE } from '@/tests/common/common.data'

test.describe('Editor', () => {
  let pageTree: PageTreePage
  let editor: EditorPage

  test.beforeEach(async ({ api, page }) => {
    pageTree = new PageTreePage(page)
    editor = new EditorPage(page)

    await api.removeAllPages()
    await api.createPage(INITIAL_PAGE)
    await api.pageReload()
    await pageTree.clickPage()
  })

  test.describe('Editor', () => {
    test('Verify editor is editable & there has a paragraph node by default', async () => {
      await expect(editor.getEditorContent()).toHaveAttribute('contenteditable', 'true')
      await expect(editor.getNodeByIndex()).toHaveClass(/node-paragraph/)
    })

    test('Verify it will not create node when click node border', async () => {
      await editor.getEditorContent().click()
      const paragraphHeight = (await editor.getNodeByIndex().boundingBox())?.height as number
      await editor.getNodeByIndex().click({ position: { x: 20, y: 0 }, force: true })
      await editor.getNodeByIndex().click({ position: { x: 20, y: paragraphHeight }, force: true })

      await expect(editor.getNodes()).toHaveCount(1)
    })

    test('Verify it will create paragraph when click under the last non-empty block', async () => {
      await editor.fillToBlock('test')
      const paragraphHeight = (await editor.getNodeByIndex().boundingBox())?.height as number
      await editor.getEditorContent().click({ position: { x: 20, y: paragraphHeight * 1.5 } })
      await expect(editor.getNodes()).toHaveCount(2)
    })

    test('Verify blockAction is visible when hover node', async () => {
      await expect(editor.getBlockAction()).toHaveCSS('opacity', '0')

      await editor.getNodeByIndex().hover()

      await expect(editor.getBlockAction()).toHaveCSS('opacity', '1')
    })
  })

  test.describe('Create Block', () => {
    test('Verify type "/" can create Slash Menu', async () => {
      const slashMenu = await editor.triggerSlashMenuInBlock()

      await expect(slashMenu.getSlashMenu()).toBeVisible()
    })

    test('Verify type "Enter" can create Text Block', async () => {
      await editor.createTextBelowIndex()

      await expect(editor.getNodeByIndex(1)).toHaveClass(/node-paragraph/)
    })

    test('Verify type "- " can create BulletList Block', async () => {
      await editor.createBulletListInBlock()

      await expect(editor.getNodeByIndex()).toHaveClass(/node-bulletList/)
    })

    test('Verify type "1. " can create OrderedList Block', async () => {
      await editor.createOrderedListInBlock()

      await expect(editor.getNodeByIndex()).toHaveClass(/node-orderedList/)
    })

    test('Verify type "/=" can create Formula Block', async () => {
      const formula = await editor.createFormulaInBlock()

      await expect(formula.getFormulaPopup()).toBeVisible()
    })

    test('Verify type "@" can create LinkMenu Block', async () => {
      const formula = await editor.triggerLinkMenuInBlock()

      await expect(formula.getLinkMenuPopup()).toBeVisible()
    })
  })

  test.describe('Drag', () => {
    test('drags element in Text block only', async () => {
      test.setTimeout(30000)
      await editor.getNodeByIndex().fill('000')
      await editor.createTextBelowIndex()
      await editor.getNodeByIndex(1).fill('111')
      await editor.createTextBelowIndex()
      await editor.getNodeByIndex(2).fill('222')
      await editor.dragTo(2, 0)

      await expect(editor.getNodeByIndex(0)).toHaveText('222')
    })

    // TODO: more Drag-and-drop tests that include more complex blocks
  })
})
