export type InputType =
  | GetPageBlocksInput
  | GetTrashBlocksInput
  | BlockCommitInput
  | CreateBlockInput
  | BlockSoftDeleteInput
  | BlockHardDeleteInput
  | PodDestroyInput
  | CreateOrUpdatePodInput

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
    hardDelete: false
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

export interface PodDestroyInput {
  input: {
    username: string
  }
}

export interface CreateOrUpdatePodInput {
  input: {
    type: 'CREATE' | 'UPDATE'
    domain: string
    name: string
    bio?: string
  }
}
