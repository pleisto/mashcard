import { gql } from '@apollo/client'

export const queryPods = gql`
  query GetPods {
    pods {
      id
      webid
      name
      avatarUrl
      bio
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

export const queryPageBlocks = gql`
  query GetPageBlocks($webid: String!) {
    pageBlocks(webid: $webid) {
      id
      sort
      nextSort
      parentId
      type
      data {
        text
        content
      }
      meta
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

export const BlockMove = gql`
  mutation blockMove($input: BlockMoveInput!) {
    blockMove(input: $input) {
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
