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

export const FormulaCommit = gql`
  mutation formulaCommit($input: FormulaCommitInput!) {
    formulaCommit(input: $input) {
      errors
    }
  }
`

export const queryFormulas = gql`
  query GetFormulas($domain: String!, $ids: String) {
    formulas(domain: $domain, ids: $ids) {
      id
      name
      cacheValue
      blockId
      definition
      updatedAt
      createdAt
      version
      type
      meta
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

export const Ydoc = gql`
  subscription ydoc($docId: UUID!) {
    ydoc(docId: $docId) {
      operatorId
      stateId
      updates
    }
  }
`

export const queryBlockInfo = gql`
  query GetBlockInfo($id: String!, $domain: String!) {
    blockInfo(id: $id, domain: $domain) {
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
        domain
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
        autoWrap
        start
        image {
          type
          source
          key
          displayName
          height
          width
          ratio
          mode
          name
          size
          align
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
          domain
          name
          avatarUrl
        }
        embedMeta {
          type
          embedType
        }
        attachment {
          type
          source
          key
          height
          width
          name
          displayName
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
          displayName
          icon
          mode
        }
      }
    }
  }
`

export const querySpreadsheetChildren = gql`
  query GetSpreadsheetChildren($parentId: String!) {
    spreadsheetChildren(parentId: $parentId) {
      blocks {
        id
        sort
        parentId
        type
        text
        content
        data
      }
    }
  }
`

export const queryGetDocument = gql`
  query GetDocument($docId: String!) {
    document(docId: $docId) {
      id
      stateId
      state
    }
  }
`

export const SyncDocument = gql`
  mutation SyncDocument($input: SyncDocumentInput!) {
    syncDocument(input: $input) {
      errors
      document {
        state
        stateId
      }
    }
  }
`
