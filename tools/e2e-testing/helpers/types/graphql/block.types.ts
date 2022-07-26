import { InputType } from './input.types'

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

export type OperationName =
  | 'GetPageBlocks'
  | 'GetTrashBlocks'
  | 'GetPods'
  | 'blockCommit'
  | 'blockCreate'
  | 'blockSoftDelete'
  | 'blockHardDelete'
  | 'groupDestroy'
  | 'createOrUpdatePod'

export interface graphqlGroupType {
  BLOCK_COMMIT: string
  CREATE_BLOCK: string
  BLOCK_SOFT_DELETE: string
  GET_PAGE_BLOCKS: string
  BLOCK_HARD_DELETE: string
  GET_TRASH_BLOCKS: string
  POD_DESTROY: string
  GET_PODS: string
  CREATE_OR_UPDATE_POD: string
}

export interface OptionsType {
  data: {
    query: string
    operationName: OperationName
    variables?: InputType
  }
  headers: {
    'x-csrf-token': string
  }
}
