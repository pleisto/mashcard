import { gql } from '@apollo/client'

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

export const ConversationCommentCreate = gql`
  mutation conversationCommentCreate($input: ConversationCommentCreateInput!) {
    conversationCommentCreate(input: $input) {
      conversation {
        id
        docId
        markIds
        blockIds
        latestReplyAt
        updatedAt
        createdAt
        status
        comments {
          id
          content
          status
          createdAt
          updatedAt
          creator {
            name
            domain
            avatarData {
              url
              downloadUrl
              signedId
            }
          }
        }
      }
      errors
    }
  }
`

export const ConversationResolve = gql`
  mutation conversationResolve($input: ConversationResolveInput!) {
    conversationResolve(input: $input) {
      errors
    }
  }
`

export const ConversationOpen = gql`
  mutation conversationOpen($input: ConversationOpenInput!) {
    conversationOpen(input: $input) {
      errors
    }
  }
`

export const ConversationDelete = gql`
  mutation conversationDelete($input: ConversationDeleteInput!) {
    conversationDelete(input: $input) {
      errors
    }
  }
`

export const ConversationCommentAppend = gql`
  mutation conversationCommentAppend($input: ConversationCommentAppendInput!) {
    conversationCommentAppend(input: $input) {
      errors
      comment {
        id
        content
        status
        createdAt
        updatedAt
        creator {
          name
          domain
          avatarData {
            url
            downloadUrl
            signedId
          }
        }
      }
    }
  }
`

export const queryConversationComments = gql`
  query GetConversationComments($pageIds: [UUID!]!) {
    conversationComments(pageIds: $pageIds) {
      id
      docId
      markIds
      blockIds
      latestReplyAt
      updatedAt
      createdAt
      status
      comments {
        id
        content
        status
        createdAt
        updatedAt
        creator {
          name
          domain
          avatarData {
            url
            downloadUrl
            signedId
          }
        }
      }
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
          viewUrl
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
          viewUrl
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

export const queryBlockNew = gql`
  query BlockNew($id: String!, $historyId: String) {
    blockNew(id: $id, historyId: $historyId) {
      id
      statesCount
      stateId
      blockType
      states {
        id
        state
      }
    }
  }
`
export const queryDocumentHistories = gql`
  query documentHistories($id: String!) {
    documentHistories(id: $id) {
      users {
        name
        domain
        avatarData {
          url
          downloadUrl
          signedId
        }
      }
      histories {
        id
        createdAt
        username
      }
    }
  }
`

export const BlockCommit = gql`
  mutation BlockCommit($input: BlockCommitInput!) {
    blockCommit(input: $input) {
      errors
      block {
        id
        statesCount
        stateId
        blockType
      }
      diffStates {
        id
        state
        createdAt
      }
      requireFull
    }
  }
`

export const Document = gql`
  subscription Document($docId: UUID!) {
    document(docId: $docId) {
      operatorId
      blocks {
        id
        statesCount
        stateId
        blockType
      }
      states {
        id
        state
        createdAt
        blockId
      }
      histories {
        id
        createdAt
        username
      }
      users {
        name
        domain
        avatarData {
          url
          downloadUrl
          signedId
        }
      }
    }
  }
`

export const AwarenessUpdate = gql`
  mutation AwarenessUpdate($input: AwarenessUpdateInput!) {
    awarenessUpdate(input: $input) {
      errors
    }
  }
`

export const Awareness = gql`
  subscription Awareness($docId: UUID!) {
    awareness(docId: $docId) {
      operatorId
      updates
    }
  }
`
