import { gql } from '@apollo/client'

export const BlockSync = gql`
  mutation blockSync($input: BlockSyncInput!) {
    blockSync(input: $input) {
      errors
    }
  }
`

export const BlockSyncBatch = gql`
  mutation blockSyncBatch($input: BlockSyncBatchInput!) {
    blockSyncBatch(input: $input) {
      errors
    }
  }
`

export const queryChildrenBlocks = gql`
  query GetChildrenBlocks($parentId: String!, $excludePages: Boolean!, $snapshotVersion: Int!) {
    __typename
    childrenBlocks(parentId: $parentId, excludePages: $excludePages, snapshotVersion: $snapshotVersion) {
      ... on MetaBlock {
        id
        sort
        parentId
        type
        meta {
          attrs
          marks
        }
      }

      ... on PageBlock {
        id
        sort
        parentId
        type
        data {
          title
        }
        meta {
          icon
          cover
          attrs
        }
      }

      ... on ParagraphBlock {
        id
        sort
        parentId
        type
        data {
          title
        }
        meta {
          attrs
        }
      }

      ... on TextBlock {
        id
        sort
        parentId
        type
        data {
          content
        }
        meta {
          marks
          attrs
        }
      }
    }
  }
`
