import { blockCommitConverter } from '@/helpers/converter/blockCommitConverter'
import { APIResponse, Page } from '@playwright/test'
import { createBlockConverter } from '@/helpers/converter/createBlockConverter'
import { PageBlock } from '@/helpers/types/data.types'
import { GRAPHQL_GROUP } from './graphql'
import { OperationName, OptionsType, PageType } from '@/helpers/types/graphql/block.types'
import { compareAttributeItem } from '@/helpers/utils/sortByAttribute'
import { BlockSoftDeleteInput, CreateBlockInput, InputType } from '@/helpers/types/graphql/input.types'
import { PodOutput } from '@/helpers/types/graphql/output.types'

export class BlockApi {
  private readonly page
  private readonly request
  private readonly REQUEST_URL = '/$internal-apis/$graph'
  private readonly REQUEST_HEADER

  constructor(page: Page, csrfToken: string) {
    this.page = page
    this.request = page.request
    this.REQUEST_HEADER = {
      'x-csrf-token': csrfToken
    }
  }

  async getUsername(): Promise<string> {
    return await this.page.evaluate(() => (window as any).location.pathname.split('/')[1])
  }

  async pageReload(): Promise<void> {
    await this.page.reload({ waitUntil: 'networkidle' })
  }

  async post(options: OptionsType): Promise<APIResponse> {
    return await this.request.post(this.REQUEST_URL, options)
  }

  options(gqlQuery: string, operationName: OperationName, variables?: InputType): OptionsType {
    return {
      data: {
        query: gqlQuery,
        operationName,
        variables
      },
      headers: this.REQUEST_HEADER
    }
  }

  async getBlocks(username: string): Promise<PageType[]> {
    const response = await this.post(
      this.options(GRAPHQL_GROUP.GET_PAGE_BLOCKS, 'GetPageBlocks', {
        domain: username
      })
    )
    return (await response.json()).data.pageBlocks
  }

  async removePage(variables: BlockSoftDeleteInput): Promise<void> {
    await this.post(this.options(GRAPHQL_GROUP.BLOCK_SOFT_DELETE, 'blockSoftDelete', variables))
  }

  async removeAllPages(options?: { isSorted?: boolean }): Promise<void> {
    const isSorted = options?.isSorted ?? false

    const username = await this.getUsername()
    const pages = (await this.getBlocks(username)).sort(compareAttributeItem)

    isSorted ? await this.orderRemoveAllPage(pages) : await this.outOfOrderRemoveAllPage(pages)
  }

  async orderRemoveAllPage(pages: PageType[]): Promise<void> {
    for (let index = 0; index < pages.length; index++) {
      const page = pages[index]

      if (!page.parentId) {
        await this.removePage({ input: { id: page.id, hardDelete: false } })
      }
    }
  }

  async outOfOrderRemoveAllPage(pages: PageType[]): Promise<void> {
    await Promise.all(
      pages.map(page => (!page.parentId ? this.removePage({ input: { id: page.id, hardDelete: false } }) : undefined))
    )
  }

  async createPage(page: PageBlock, parentId?: string): Promise<void> {
    const username = await this.getUsername()
    const id = await this.createPageApi(createBlockConverter(page, username, parentId))
    await this.blockCommit(page, id)
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
    const response = await this.post(this.options(GRAPHQL_GROUP.CREATE_BLOCK, 'blockCreate', variables))
    return (await response.json()).data.blockCreate.id
  }

  async blockCommit(page: PageBlock, id: string): Promise<void> {
    const variables = blockCommitConverter(page, id)
    await this.post(this.options(GRAPHQL_GROUP.BLOCK_COMMIT, 'blockCommit', variables))
  }

  async getTrashBlock(username: string, search: string = ''): Promise<PageType[]> {
    const response = await this.post(
      this.options(GRAPHQL_GROUP.GET_TRASH_BLOCKS, 'GetTrashBlocks', {
        domain: username,
        search
      })
    )
    return (await response.json()).data.trashBlocks
  }

  async removeAllTrashPages(): Promise<void> {
    const username = await this.getUsername()
    const pages = (await this.getTrashBlock(username)).map(page => page.id)

    await this.post(this.options(GRAPHQL_GROUP.BLOCK_HARD_DELETE, 'blockHardDelete', { input: { ids: pages } }))
  }

  async getPods(): Promise<PodOutput[]> {
    const response = await this.request.post(this.REQUEST_URL, this.options(GRAPHQL_GROUP.GET_PODS, 'GetPods'))
    return (await response.json()).data.pods
  }

  async destroyPod(username: string): Promise<void> {
    await this.request.post(
      this.REQUEST_URL,
      this.options(GRAPHQL_GROUP.POD_DESTROY, 'groupDestroy', { input: { username } })
    )
  }

  async destroyAllCreatedPod(): Promise<void> {
    const createdPods = (await this.getPods()).filter(pod => !pod.personal)

    await Promise.all(createdPods.map(async pod => await this.destroyPod(pod.domain)))
  }

  async createPod(name: string): Promise<void> {
    await this.request.post(
      this.REQUEST_URL,
      this.options(GRAPHQL_GROUP.CREATE_OR_UPDATE_POD, 'createOrUpdatePod', {
        input: { type: 'CREATE', domain: name, name }
      })
    )
  }
}
