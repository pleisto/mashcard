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

export const queryDocumentBlock = gql`
  query DocumentBlock($id: String!, $historyId: String) {
    blockNew(id: $id, historyId: $historyId) {
      id
      statesCount
      stateId
      blockType
      states {
        id
        state
      }
      documentInfo {
        id
        title
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
        restorable
        isMaster
        pin
        pathArray {
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
        }
        permission {
          key
          policy
          state
        }
        collaborators {
          name
          domain
          avatarData {
            url
          }
        }
      }
      blobs {
        blobKey
        downloadUrl
        url
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

export const queryUnsplashImage = gql`
  query QueryUnsplashImage($query: String, $page: Int, $perPage: Int) {
    unsplashImage(query: $query, page: $page, perPage: $perPage) {
      id
      width
      height
      fullUrl
      smallUrl
      username
      blurHash
    }
  }
`

export const queryPreviewBox = gql`
  query QueryPreviewBox($url: String!) {
    previewBox(url: $url) {
      url
      title
      description
      cover
      icon
      type
      size
      iframeUrl
    }
  }
`

export const queryPodSearch = gql`
  query QueryPodSearch($input: String!) {
    podSearch(input: $input) {
      domain
      name
      avatarData {
        url
      }
    }
  }
`

export const CreateOrUpdatePod = gql`
  mutation createOrUpdatePod($input: CreateOrUpdatePodInput!) {
    createOrUpdatePod(input: $input) {
      errors
      pod {
        ... on User {
          domain
          name
        }
        ... on Group {
          domain
          name
          inviteEnable
          inviteSecret
        }
      }
    }
  }
`

export const GroupJoin = gql`
  mutation groupJoin($input: GroupJoinInput!) {
    groupJoin(input: $input) {
      errors
    }
  }
`

export const queryBlockSearch = gql`
  query GetBlockSearch($domain: String!, $input: String!) {
    blockSearch(domain: $domain, input: $input) {
      id
      type
      text
      rootId
    }
  }
`

export const queryBlockShareLinks = gql`
  query GetBlockShareLinks($id: String!) {
    blockShareLinks(id: $id) {
      key
      policy
      state
      sharePodData {
        name
        domain
        avatarData {
          url
        }
      }
    }
  }
`

export const BlockDuplicate = gql`
  mutation blockDuplicate($input: BlockDuplicateInput!) {
    blockDuplicate(input: $input) {
      id
      formulaIds
      errors
    }
  }
`

export const BlockSoftDelete = gql`
  mutation blockSoftDelete($input: BlockSoftDeleteInput!) {
    blockSoftDelete(input: $input) {
      errors
    }
  }
`

export const BlockHardDelete = gql`
  mutation blockHardDelete($input: BlockHardDeleteInput!) {
    blockHardDelete(input: $input) {
      errors
    }
  }
`

export const BlockRestore = gql`
  mutation blockRestore($input: BlockRestoreInput!) {
    blockRestore(input: $input) {
      errors
    }
  }
`

export const BlockPinOrUnpin = gql`
  mutation blockPinOrUnpin($input: BlockPinOrUnpinInput!) {
    blockPinOrUnpin(input: $input) {
      errors
    }
  }
`

export const BlockCreate = gql`
  mutation blockCreate($input: BlockCreateInput!) {
    blockCreate(input: $input) {
      id
      errors
    }
  }
`

export const BlockCreateShareLink = gql`
  mutation blockCreateShareLink($input: BlockCreateShareLinkInput!) {
    blockCreateShareLink(input: $input) {
      errors
    }
  }
`

export const BlockMove = gql`
  mutation blockMove($input: BlockMoveInput!) {
    blockMove(input: $input) {
      errors
    }
  }
`

export const BlockRename = gql`
  mutation blockRename($input: BlockRenameInput!) {
    blockRename(input: $input) {
      errors
    }
  }
`
