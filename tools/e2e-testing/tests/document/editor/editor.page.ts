import { Locator } from '@playwright/test'
import { SlashMenu } from '@/tests/document/slashMenu/slashMenu.page'
import { TextBlock } from '@/tests/block/textBlock/textBlock.page'
import { OrderedListBlock } from '@/tests/block/orderedListBlock/orderedListBlock.page'
import { LinkMenuBlockPage } from '@/tests/block/linkMenuBlock/linkMenuBlock.page'
import { BulletListBlock } from '@/tests/block/bulletListBlock/bulletListBlock.page'
import { FormulaBlock } from '@/tests/block/formulaBlock/formulaBlock.page'
import { CommonPage } from '@/tests/common/common.page'
import { EDITOR_SELECTORS } from './editor.selector'

export class EditorPage extends CommonPage {
  getEditorContent(): Locator {
    return this.page.locator(EDITOR_SELECTORS.content)
  }

  getNodes(): Locator {
    return this.page.locator(EDITOR_SELECTORS.nodes)
  }

  getNodeByIndex(index: number = 0): Locator {
    return this.getNodes().nth(index)
  }

  getBlockAction(index?: number): Locator {
    return this.page.locator(EDITOR_SELECTORS.blockAction(index))
  }

  /**
   * Drag and drop element
   * @param dragIndex The index of element which user want to drag
   * @param targetElementIndex The index of the target element in front of which user want to place
   */
  async dragTo(dragIndex: number, targetElementIndex: number): Promise<void> {
    const targetElementY = (await this.getBlockAction(targetElementIndex).boundingBox())?.y as number
    const editorContentY = (await this.getEditorContent().boundingBox())?.y as number
    const targetElementToEditor = targetElementY - editorContentY

    await this.getBlockAction(dragIndex).dragTo(this.getEditorContent(), {
      targetPosition: { x: 0, y: targetElementToEditor }
    })
  }

  async fillToBlock(content: string): Promise<void> {
    await this.getEditorContent().click()
    await this.getEditorContent().type(content)
  }

  async triggerSlashMenuInBlock(): Promise<SlashMenu> {
    await this.fillToBlock('/')
    return new SlashMenu(this.page)
  }

  async createTextBelowIndex(): Promise<TextBlock> {
    await this.getEditorContent().click()
    await this.getEditorContent().press('Enter')
    return new TextBlock(this.page)
  }

  async createBulletListInBlock(): Promise<BulletListBlock> {
    await this.fillToBlock('- ')
    return new BulletListBlock(this.page)
  }

  async createOrderedListInBlock(): Promise<OrderedListBlock> {
    await this.fillToBlock('1. ')
    return new OrderedListBlock(this.page)
  }

  async createFormulaInBlock(): Promise<FormulaBlock> {
    await this.fillToBlock('/=')
    return new FormulaBlock(this.page)
  }

  async triggerLinkMenuInBlock(): Promise<LinkMenuBlockPage> {
    await this.fillToBlock('@')
    return new LinkMenuBlockPage(this.page)
  }
}
