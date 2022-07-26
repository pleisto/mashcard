import { graphqlGroupType } from '@/helpers/types/graphql/block.types'

export const GRAPHQL_GROUP: graphqlGroupType = {
  BLOCK_COMMIT: `
    mutation blockCommit($input: BlockCommitInput!) {
      blockCommit(input: $input) {
        errors
        __typename
      }
    }
  `,
  CREATE_BLOCK: `
    mutation blockCreate($input: BlockCreateInput!) {
      blockCreate(input: $input) {
        id
        errors
        __typename
      }
    }
  `,
  BLOCK_SOFT_DELETE: `
    mutation blockSoftDelete($input: BlockSoftDeleteInput!) {
      blockSoftDelete(input: $input) {
        errors
        __typename
      }
    }
  `,
  GET_PAGE_BLOCKS: `
    query GetPageBlocks($domain: String!) {
      pageBlocks(domain: $domain) {
        id
        parentId
        documentInfo {
          title
        }
      }
    }
  `,
  BLOCK_HARD_DELETE: `
    mutation blockHardDelete($input: BlockHardDeleteInput!) {
      blockHardDelete(input: $input) {
        errors
        __typename
      }
    }
  `,
  GET_TRASH_BLOCKS: `
    query GetTrashBlocks($domain: String!, $search: String) {
      trashBlocks(domain: $domain, search: $search) {
        id
      }
    }
  `,
  POD_DESTROY: `
    mutation groupDestroy($input: GroupDestroyInput!) {
      groupDestroy(input: $input) {
        errors
        __typename
      }
    }
  `,
  GET_PODS: `
    query GetPods {
      pods {
        ... on User {
          id
          domain
          personal
        }
        ... on Group {
          id
          domain
          personal
        }
      }
    }
  `,
  CREATE_OR_UPDATE_POD: `
    mutation createOrUpdatePod($input: CreateOrUpdatePodInput!) {
      createOrUpdatePod(input: $input) {
        errors
      }
    }
  `
}
