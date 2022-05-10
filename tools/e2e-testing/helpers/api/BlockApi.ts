import { blockSyncBatchConverter } from '@/data/converter/blockSyncBatchConverter'
import { PageBlock } from '@/data/types.data'
import { Page } from '@playwright/test'
import { createBlockConverter } from '../../data/converter/createBlockConverter'
import {
  BLOCK_HARD_DELETE,
  BLOCK_SOFT_DELETE,
  BLOCK_SYNC_BATCH,
  CREATE_BLOCK,
  GET_PAGE_BLOCKS,
  GET_TRASH_BLOCKS
} from './graphql'
import { BlockSoftDeleteInput, CreateBlockInput, InputType, OperationName, OptionsType, PageType } from './types'

export class BlockApi {
  private readonly page
  private readonly request
  private readonly REQUEST_URL = '/.internal-apis/$graph'
  private readonly REQUEST_HEADER

  constructor(page: Page, csrfToken: string) {
    this.page = page
    this.request = page.request
    this.REQUEST_HEADER = {
      'x-csrf-token': csrfToken
    }
  }

  async pageReload(): Promise<void> {
    await this.page.reload({ waitUntil: 'networkidle' })
  }

  options(gqlQuery: string, operationName: OperationName, variables: InputType): OptionsType {
    return {
      data: {
        query: gqlQuery,
        operationName,
        variables
      },
      headers: this.REQUEST_HEADER
    }
  }

  async getBlocks(domain: string): Promise<PageType[]> {
    const response = await this.request.post(
      this.REQUEST_URL,
      this.options(GET_PAGE_BLOCKS, 'GetPageBlocks', {
        domain
      })
    )
    return (await response.json()).data.pageBlocks
  }

  async removePage(variables: BlockSoftDeleteInput): Promise<void> {
    await this.request.post(this.REQUEST_URL, this.options(BLOCK_SOFT_DELETE, 'blockSoftDelete', variables))
  }

  async removeAllPages(isHardDeleted: boolean = true): Promise<void> {
    const domain = await this.page.evaluate(() => (window as any).brickdocContext.currentSpace.domain)
    const pages = await this.getBlocks(domain)
    await Promise.all(
      pages.map(page =>
        !page.parentId ? this.removePage({ input: { id: page.id, hardDelete: isHardDeleted } }) : undefined
      )
    )
  }

  async createPage(page: PageBlock, parentId?: string): Promise<void> {
    const id = await this.createPageApi(createBlockConverter(page, parentId))
    await this.blockSyncBatch(page, id)
    if (page.children) {
      for (const child of page.children) {
        await this.createPage(child, id)
      }
    }
  }

  async createPageTree(pageTree: PageBlock[]): Promise<void> {
    for (const page of pageTree) {
      await this.createPage(page)
    }
  }

  async createPageApi(variables: CreateBlockInput): Promise<string> {
    const response = await this.request.post(this.REQUEST_URL, this.options(CREATE_BLOCK, 'blockCreate', variables))
    return (await response.json()).data.blockCreate.id
  }

  async blockSyncBatch(page: PageBlock, id: string): Promise<void> {
    const variables = blockSyncBatchConverter(page, id)
    await this.request.post(this.REQUEST_URL, this.options(BLOCK_SYNC_BATCH, 'blockSyncBatch', variables))
  }

  async getTrashBlock(domain: string, search: string = ''): Promise<PageType[]> {
    const response = await this.request.post(
      this.REQUEST_URL,
      this.options(GET_TRASH_BLOCKS, 'GetTrashBlocks', {
        domain,
        search
      })
    )
    return (await response.json()).data.trashBlocks
  }

  async removeAllTrashPages(): Promise<void> {
    const domain = await this.page.evaluate(() => (window as any).brickdocContext.currentSpace.domain)
    const pages = (await this.getTrashBlock(domain)).map(page => page.id)

    await this.request.post(
      this.REQUEST_URL,
      this.options(BLOCK_HARD_DELETE, 'blockHardDelete', { input: { ids: pages } })
    )
  }
}
