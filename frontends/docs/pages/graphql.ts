import { gql } from '@apollo/client'

export const queryPlugins = gql`
  query GetPlugin {
    plugins {
      name
      version
      logo
      enabled
      metadata
    }
  }
`

export const BlockSyncBatch = gql`
  mutation blockSyncBatch($input: BlockSyncBatchInput!) {
    blockSyncBatch(input: $input) {
      errors
      refetchTree
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

export const queryBlockInfo = gql`
  query GetBlockInfo($id: String!, $webid: String!, $kind: BlockIDKind!) {
    blockInfo(id: $id, webid: $webid, kind: $kind) {
      title
      id
      payload
      isDeleted
      pin
      pathArray {
        id
        text
      }
      permission {
        key
        policy
        state
      }
      collaborators {
        name
        webid
        email
        avatarData {
          url
        }
      }
    }
  }
`

export const queryChildrenBlocks = gql`
  query GetChildrenBlocks($rootId: String!, $snapshotVersion: Int!) {
    childrenBlocks(rootId: $rootId, snapshotVersion: $snapshotVersion) {
      id
      sort
      parentId
      deletedAt
      rootId
      blobs {
        blobKey
        downloadUrl
        url
      }
      type
      text
      content
      data
      meta {
        title
        level
        language
        image {
          type
          source
          key
          height
          width
          ratio
        }
        attachment {
          type
          source
          key
          height
          width
          name
          size
        }
        cover {
          ... on BlockImage {
            type
            source
            key
            height
            width
          }
          ... on BlockColor {
            type
            color
          }
        }
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
        link {
          key
          type
          source
          cover
          description
          title
        }
      }
    }
  }
`

export const queryDatabaseRowBlocks = gql`
  query GetDatabaseRowBlocks($parentId: String!, $snapshotVersion: Int!) {
    databaseRowBlocks(parentId: $parentId, snapshotVersion: $snapshotVersion) {
      id
      sort
      parentId
      type
      text
      content
      data
    }
  }
`
