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
    }
  }
`

export const FormulaCreate = gql`
  mutation formulaCreate($input: FormulaCreateInput!) {
    formulaCreate(input: $input) {
      errors
    }
  }
`

export const FormulaUpdate = gql`
  mutation formulaUpdate($input: FormulaUpdateInput!) {
    formulaUpdate(input: $input) {
      errors
    }
  }
`

export const FormulaDelete = gql`
  mutation formulaDelete($input: FormulaDeleteInput!) {
    formulaDelete(input: $input) {
      errors
    }
  }
`

export const queryFormulas = gql`
  query GetFormulas($webid: String!) {
    formulas(webid: $webid) {
      id
      name
      view
      cacheValue
      blockId
      definition
      dependencyIds
      updatedAt
      createdAt
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
  query GetBlockInfo($id: String!, $webid: String!) {
    blockInfo(id: $id, webid: $webid) {
      title
      id
      enabledAlias {
        key
        payload
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
      isDeleted
      isMaster
      pin
      pathArray {
        id
        text
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
        start
        image {
          type
          source
          key
          height
          width
          ratio
        }
        page {
          type
          key
          title
          icon
          link
        }
        people {
          type
          webid
          name
          avatarUrl
        }
        attachment {
          type
          source
          key
          height
          width
          name
          size
          mode
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
