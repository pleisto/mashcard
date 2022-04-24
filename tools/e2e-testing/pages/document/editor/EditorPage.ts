import { Locator } from '@playwright/test'
import { EDITOR_SELECTORS } from '@/selectors/document'
import { BasePage } from '../../BasePage'
import { SlashMenu } from './SlashMenuPage'
import { TextBlock } from '../block/TextBlockPage'
import { BulletListBlock } from '../block/BulletListBlockPage'
import { OrderedListBlock } from '../block/OrderedListBlockPage'
import { FormulaBlock } from '../block/FormulaBlockPage'
import { LinkMenuBlockPage } from '../block/LinkMenuBlockPage'

export class EditorPage extends BasePage {
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

  async fillToBlock(content: string, blockIndex?: number): Promise<void> {
    await this.getNodeByIndex(blockIndex).click()
    await this.getNodeByIndex(blockIndex).type(content)
  }

  async triggerSlashMenuInBlock(blockIndex?: number): Promise<SlashMenu> {
    await this.fillToBlock('/', blockIndex)
    return new SlashMenu(this.page)
  }

  async createTextBelowIndex(blockIndex?: number): Promise<TextBlock> {
    await this.getNodeByIndex(blockIndex).click()
    await this.getNodeByIndex(blockIndex).press('Enter')
    return new TextBlock(this.page)
  }

  async createBulletListInBlock(blockIndex?: number): Promise<BulletListBlock> {
    await this.fillToBlock('- ', blockIndex)
    return new BulletListBlock(this.page)
  }

  async createOrderedListInBlock(blockIndex?: number): Promise<OrderedListBlock> {
    await this.fillToBlock('1. ', blockIndex)
    return new OrderedListBlock(this.page)
  }

  async createFormulaInBlock(blockIndex?: number): Promise<FormulaBlock> {
    await this.fillToBlock('/=', blockIndex)
    return new FormulaBlock(this.page)
  }

  async triggerLinkMenuInBlock(blockIndex?: number): Promise<LinkMenuBlockPage> {
    await this.fillToBlock('@', blockIndex)
    return new LinkMenuBlockPage(this.page)
  }
}
