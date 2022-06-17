export interface Block {
  content: []
  id: string
  text: string
  type: 'doc'
  meta: {
    title: string
    icon?: {
      type: 'EMOJI'
      name: string
      emoji: string
      __typename: 'BlockEmoji'
    }
    link?: string | null
    __typename: 'BlockMeta'
  }
  data: {}
}

export interface PageType {
  id: string
  parentId: string
  text: string
}

export interface BlockSyncBatchInput {
  input: {
    blocks: Block[]
    deletedIds: []
    rootId: string
    operatorId: '54701a5a-f151-499f-8cc3-069950144ad3'
  }
}

export interface CreateBlockInput {
  input: {
    parentId?: string
    title: string
  }
}

export interface BlockSoftDeleteInput {
  input: {
    id: string
    hardDelete: boolean
  }
}

export interface GetPageBlocksInput {
  domain: string
}

export interface BlockHardDeleteInput {
  input: {
    ids: string[]
  }
}

export interface GetTrashBlocksInput {
  domain: string
  search: string
}

export type OperationName =
  | 'GetPageBlocks'
  | 'GetTrashBlocks'
  | 'blockSyncBatch'
  | 'blockCreate'
  | 'blockSoftDelete'
  | 'blockHardDelete'

export type InputType =
  | GetPageBlocksInput
  | GetTrashBlocksInput
  | BlockSyncBatchInput
  | CreateBlockInput
  | BlockSoftDeleteInput
  | BlockHardDeleteInput

export interface graphqlGroupType {
  BLOCK_SYNC_BATCH: string
  CREATE_BLOCK: string
  BLOCK_SOFT_DELETE: string
  GET_PAGE_BLOCKS: string
  BLOCK_HARD_DELETE: string
  GET_TRASH_BLOCKS: string
}

export interface OptionsType {
  data: {
    query: string
    operationName: OperationName
    variables: InputType
  }
  headers: {
    'x-csrf-token': string
  }
}

export interface CreateBlockOutput {
  data: {
    blockCreate: {
      id: string
    }
  }
}
