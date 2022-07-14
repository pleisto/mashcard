import { gql } from '@apollo/client'

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

export const GroupUpdateMember = gql`
  mutation groupUpdateMember($input: GroupUpdateMemberInput!) {
    groupUpdateMember(input: $input) {
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
      deletedAt
      pathArray {
        id
        text
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
      rootId
      parentId
      type
      text
      meta {
        people {
          type
          domain
          name
          avatarUrl
        }
        cover {
          ... on BlockImage {
            type
            source
            key
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
