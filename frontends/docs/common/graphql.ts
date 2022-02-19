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
      type
      size
    }
  }
`

export const querySpaceSearch = gql`
  query QuerySpaceSearch($input: String!) {
    spaceSearch(input: $input) {
      domain
      email
      name
      avatarData {
        url
      }
    }
  }
`

export const CreateOrUpdateSpace = gql`
  mutation createOrUpdateSpace($input: CreateOrUpdateSpaceInput!) {
    createOrUpdateSpace(input: $input) {
      errors
      space {
        domain
        name
        inviteEnable
        inviteSecret
      }
    }
  }
`

export const JoinSpace = gql`
  mutation joinSpace($input: JoinSpaceInput!) {
    joinSpace(input: $input) {
      errors
    }
  }
`

export const UpdateMember = gql`
  mutation updateMember($input: UpdateMemberInput!) {
    updateMember(input: $input) {
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
      rootId
      parentId
      type
      text
      content
      data
      meta {
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

export const queryTrashBlocks = gql`
  query GetTrashBlocks($domain: String!, $blockId: UUID, $search: String) {
    trashBlocks(domain: $domain, blockId: $blockId, search: $search) {
      id
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

export const queryBlockSnapshots = gql`
  query GetBlockSnapshots($id: String!) {
    blockSnapshots(id: $id) {
      id
      snapshotVersion
      name
      createdAt
      relativeTime
    }
  }
`

export const queryBlockShareLinks = gql`
  query GetBlockShareLinks($id: String!) {
    blockShareLinks(id: $id) {
      key
      policy
      state
      shareSpaceData {
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

export const BlockDuplicate = gql`
  mutation blockDuplicate($input: BlockDuplicateInput!) {
    blockDuplicate(input: $input) {
      id
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

export const SnapshotRestore = gql`
  mutation snapshotRestore($input: SnapshotRestoreInput!) {
    snapshotRestore(input: $input) {
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
