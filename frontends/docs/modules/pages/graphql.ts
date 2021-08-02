import { gql } from '@apollo/client'

export const BlockSyncBatch = gql`
  mutation blockSyncBatch($input: BlockSyncBatchInput!) {
    blockSyncBatch(input: $input) {
      errors
    }
  }
`

export const NewPatch = gql`
  subscription newPatch($docId: UUID!) {
    newPatch(docId: $docId) {
      state
      seq
      patches {
        id
        path
        patchType
        payload
        operatorId
      }
    }
  }
`

export const queryChildrenBlocks = gql`
  query GetChildrenBlocks($parentId: String!, $excludePages: Boolean!, $snapshotVersion: Int!) {
    childrenBlocks(parentId: $parentId, excludePages: $excludePages, snapshotVersion: $snapshotVersion) {
      id
      sort
      parentId
      type
      data {
        text
        content
      }
      meta
    }
  }
`
