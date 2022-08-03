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
  readonly content = this.get('content')
  readonly nodes = this.get('nodes')
  readonly blockActions = this.get('blockActions')

  get(selector: keyof typeof EDITOR_SELECTORS): Locator {
    return this.locator(EDITOR_SELECTORS[selector])
  }

  /**
   * Drag and drop element
   * @param dragIndex The index of element which user want to drag
   * @param targetElementIndex The index of the target element in front of which user want to place
   */
  async dragTo(dragIndex: number, targetElementIndex: number): Promise<void> {
    const targetElementY = (await this.blockActions.nth(targetElementIndex).boundingBox())?.y as number
    const editorContentY = (await this.content.boundingBox())?.y as number
    const targetElementToEditor = targetElementY - editorContentY

    await this.blockActions.nth(dragIndex).dragTo(this.content, {
      targetPosition: { x: 0, y: targetElementToEditor }
    })
  }

  async fillToBlock(content: string): Promise<void> {
    await this.content.click()
    await this.content.type(content)
  }

  async triggerSlashMenuInBlock(): Promise<SlashMenu> {
    await this.fillToBlock('/')
    return new SlashMenu(this.page)
  }

  async createTextBelowIndex(): Promise<TextBlock> {
    await this.content.click()
    await this.content.press('Enter')
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
