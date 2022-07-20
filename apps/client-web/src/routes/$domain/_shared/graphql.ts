import { gql } from '@apollo/client'

export const queryPageBlocks = gql`
  query GetPageBlocks($domain: String!) {
    pageBlocks(domain: $domain) {
      id
      sort
      nextSort
      firstChildSort
      parentId
      documentInfo {
        id
        title
        icon {
          ... on BlockImage {
            type
            source
            key
            height
            width
          }

          ... on BlockEmoji {
            type
            name
            emoji
          }
        }
        pin
      }
    }
  }
`

export const queryTrashBlocks = gql`
  query GetTrashBlocks($domain: String!, $blockId: UUID, $search: String) {
    trashBlocks(domain: $domain, blockId: $blockId, search: $search) {
      id
      documentInfo {
        id
        title
        deletedAt
        restorable
        icon {
          ... on BlockImage {
            type
            source
            key
            height
            width
          }

          ... on BlockEmoji {
            type
            name
            emoji
          }
        }
        pathArray {
          id
          title
          isDeleted
          icon {
            ... on BlockImage {
              type
              source
              key
              height
              width
            }

            ... on BlockEmoji {
              type
              name
              emoji
            }
          }
        }
      }
    }
  }
`

export const queryBlockPins = gql`
  query GetBlockPins {
    blockPins {
      blockId
      text
      meta {
        icon {
          ... on BlockImage {
            type
            source
            key
          }

          ... on BlockEmoji {
            type
            name
            emoji
          }
        }
      }
    }
  }
`
