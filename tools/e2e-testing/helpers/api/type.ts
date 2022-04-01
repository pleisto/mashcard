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
    hardDelete: true
  }
}

export interface GetPageBlocksInput {
  domain: string
}

export interface CreateBlockOutput {
  data: {
    blockCreate: {
      id: string
    }
  }
}

export type OperationName = 'blockSyncBatch' | 'blockCreate' | 'blockSoftDelete' | 'GetPageBlocks'

export type InputType = BlockSyncBatchInput | CreateBlockInput | BlockSoftDeleteInput | GetPageBlocksInput

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

export interface PageType {
  id: string
  parentId: string
}
