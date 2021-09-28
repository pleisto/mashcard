import { gql } from '@apollo/client'

export const queryPods = gql`
  query GetPods {
    pods {
      id
      webid
      name
      avatarData {
        url
        signedId
      }
      bio
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
    }
  }
`

export const CreateOrUpdatePod = gql`
  mutation createOrUpdatePod($input: CreateOrUpdatePodInput!) {
    createOrUpdatePod(input: $input) {
      errors
      pod {
        webid
        name
      }
    }
  }
`

export const queryBlockSearch = gql`
  query GetBlockSearch($webid: String!, $input: String!) {
    blockSearch(webid: $webid, input: $input) {
      id
      type
      text
      rootId
    }
  }
`

export const queryPageBlocks = gql`
  query GetPageBlocks($webid: String!) {
    pageBlocks(webid: $webid) {
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
  query GetTrashBlocks($webid: String!, $blockId: UUID, $search: String) {
    trashBlocks(webid: $webid, blockId: $blockId, search: $search) {
      id
      pathArray {
        id
        text
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

export const queryBlockHistories = gql`
  query GetBlockHistories($id: String!) {
    blockHistories(id: $id) {
      id
      historyVersion
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

export const BlockCreateSubBlock = gql`
  mutation blockCreateSubBlock($input: BlockCreateSubBlockInput!) {
    blockCreateSubBlock(input: $input) {
      errors
    }
  }
`

export const BlockCreateShareLink = gql`
  mutation blockCreateShareLink($input: BlockCreateShareLinkInput!) {
    blockCreateShareLink(input: $input) {
      errors
      shareLink {
        key
      }
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

export const BlockUpdate = gql`
  mutation blockUpdate($input: BlockUpdateInput!) {
    blockUpdate(input: $input) {
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
