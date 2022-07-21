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
  documentInfo: {
    title: string
  }
}

export interface BlockCommitInput {
  input: {
    documentId: string
    blockId: string
    operatorId: '54701a5a-f151-499f-8cc3-069950144ad3'
    stateType: 'full'
    state: string
    stateId: string
    statesCount: 1
    meta: {
      title: string
      icon?: {
        __typename: 'BlockEmoji'
        type: 'EMOJI'
        name: string
        emoji: string
      }
    }
    content: {
      type: 'doc'
      content: []
    }
  }
}

export interface CreateBlockInput {
  input: {
    parentId?: string
    title: string
    username: string
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
  | 'blockCommit'
  | 'blockCreate'
  | 'blockSoftDelete'
  | 'blockHardDelete'

export type InputType =
  | GetPageBlocksInput
  | GetTrashBlocksInput
  | BlockCommitInput
  | CreateBlockInput
  | BlockSoftDeleteInput
  | BlockHardDeleteInput

export interface graphqlGroupType {
  BLOCK_COMMIT: string
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
