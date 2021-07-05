import { gql } from '@apollo/client'

export const BlockSync = gql`
  mutation blockSync($input: BlockSyncInput!) {
    blockSync(input: $input) {
      errors
    }
  }
`

export const queryChildrenBlocks = gql`
  query GetChildrenBlocks($parentId: String!) {
    childrenBlocks(parentId: $parentId) {
      ... on MetaBlock {
        nullableData: data
        meta {
          attrs
          marks
        }
      }

      ... on PageBlock {
        data {
          title
        }
        meta {
          icon
          cover
        }
      }

      ... on TextBlock {
        data {
          content
        }
        nullableMeta: meta
      }
    }
  }
`
