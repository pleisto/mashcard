import { test, expect } from '@/fixtures'
import { PageTreePage } from '@/tests/sidebar/pageTree/pageTree.page'
import { INITIAL_PAGE } from '@/tests/common/common.data'
import { EditorPage } from './editor.page'
import { TextBlock } from '@/tests/block/textBlock/textBlock.page'

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
    test('Verify editor is editable & there has a paragraph node by default', async ({ page }) => {
      await expect(editor.content).toHaveAttribute('contenteditable', 'true')
      await editor.content.click()
      const paragraph = new TextBlock(page)
      await expect(paragraph.paragraphs.nth(0)).toBeVisible()
    })

    test('Verify it will not create node when click node border', async () => {
      await editor.content.click()
      const paragraphHeight = (await editor.nodes.nth(0).boundingBox())?.height as number
      await editor.nodes.nth(0).click({ position: { x: 20, y: 0 }, force: true })
      await editor.nodes.nth(0).click({ position: { x: 20, y: paragraphHeight }, force: true })

      await expect(editor.nodes).toHaveCount(1)
    })

    test('Verify it will not create paragraph when click under the last non-empty block', async () => {
      await editor.fillToBlock('test')
      const paragraphHeight = (await editor.nodes.nth(0).boundingBox())?.height as number
      await editor.content.click({ position: { x: 20, y: paragraphHeight * 1.5 } })
      await expect(editor.nodes).toHaveCount(1)
    })

    test('Verify blockAction is visible when hover node', async () => {
      await expect(editor.blockActions.nth(0)).toHaveCSS('opacity', '0')

      await editor.nodes.nth(0).hover()

      await expect(editor.blockActions.nth(0)).toHaveCSS('opacity', '1')
    })
  })

  test.describe('Create Block', () => {
    test('Verify type "/" can create Slash Menu', async () => {
      const slashMenu = await editor.triggerSlashMenuInBlock()

      await expect(slashMenu.slashMenu).toBeVisible()
    })

    test('Verify type "Enter" can create Text Block', async ({ page }) => {
      const paragraph = await editor.createTextBelowIndex()

      await expect(paragraph.paragraphs.nth(1)).toHaveAttribute('data-placeholder', "Type '/' for commands")
    })

    test('Verify type "- " can create BulletList Block', async () => {
      const bulletList = await editor.createBulletListInBlock()

      await expect(bulletList.bulletLists.nth(0)).toBeVisible()
    })

    test('Verify type "1. " can create OrderedList Block', async () => {
      const orderedList = await editor.createOrderedListInBlock()

      await expect(orderedList.orderedLists.nth(0)).toBeVisible()
    })

    test('Verify type "/=" can create Formula Block', async () => {
      const formula = await editor.createFormulaInBlock()

      await expect(formula.formulaPopup).toBeVisible()
    })

    test('Verify type "@" can create LinkMenu Block', async () => {
      const formula = await editor.triggerLinkMenuInBlock()

      await expect(formula.linkMenuPopup).toBeVisible()
    })
  })

  test.describe('Drag', () => {
    test('drags element in Text block only', async () => {
      test.setTimeout(30000)
      await editor.nodes.nth(0).fill('000')
      await editor.createTextBelowIndex()
      await editor.nodes.nth(1).fill('111')
      await editor.createTextBelowIndex()
      await editor.nodes.nth(2).fill('222')
      await editor.dragTo(2, 0)

      await expect(editor.nodes.nth(0)).toHaveText('222')
    })

    // TODO: more Drag-and-drop tests that include more complex blocks
  })
})
