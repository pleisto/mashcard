import { gql } from '@apollo/client'

export const queryPods = gql`
  query GetPods {
    pods {
      id
      webid
      name
      avatar
    }
  }
`

export const queryPageBlocks = gql`
  query GetPageBlocks($webid: String!) {
    pageBlocks(webid: $webid) {
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
        }
      }

      ... on ParagraphBlock {
        id
        sort
        parentId
        type
        data {
          text
          content
        }
        meta {
          attrs
        }
      }
    }
  }
`

export const queryBlockSnapshots = gql`
  query GetBlockSnapshots($id: String!) {
    blockSnapshots(id: $id) {
      id
      snapshotVersion
      name
    }
  }
`

export const queryBlockHistories = gql`
  query GetBlockHistories($id: String!) {
    blockHistories(id: $id) {
      id
      historyVersion
    }
  }
`

export const BlockDelete = gql`
  mutation blockDelete($input: BlockDeleteInput!) {
    blockDelete(input: $input) {
      errors
    }
  }
`

export const BlockCreateSnapshot = gql`
  mutation blockCreateSnapshot($input: BlockCreateSnapshotInput!) {
    blockCreateSnapshot(input: $input) {
      errors
    }
  }
`
