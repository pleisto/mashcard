import { blockSyncBatchConverter } from '@/data/converter/blockSyncBatchConverter'
import { PageBlock } from '@/data/type'
import { APIRequestContext } from '@playwright/test'
import { createBlockConverter } from '../../data/converter/createBlockConverter'
import { BLOCK_SOFT_DELETE, BLOCK_SYNC_BATCH, CREATE_BLOCK, GET_PAGE_BLOCKS } from './graphql'
import { BlockSoftDeleteInput, CreateBlockInput, InputType, OperationName, OptionsType, PageType } from './type'

export class BlockApi {
  private readonly request
  private readonly csrfToken
  private readonly REQUEST_URL = '/.internal-apis/$graph'

  constructor(request: APIRequestContext, csrfToken: string) {
    this.request = request
    this.csrfToken = csrfToken
  }

  options(gqlQuery: string, operationName: OperationName, variables: InputType): OptionsType {
    return {
      data: {
        query: gqlQuery,
        operationName,
        variables
      },
      headers: {
        'x-csrf-token': this.csrfToken
      }
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

  async removeAllPages(pages: PageType[]): Promise<void> {
    await Promise.all(
      pages.map(page => (!page.parentId ? this.removePage({ input: { id: page.id, hardDelete: true } }) : undefined))
    )
  }

  async createPage(page: PageBlock, parentId?: string): Promise<void> {
    const id = await this.createPageApi(createBlockConverter(page, parentId))
    page.id = id
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
}
