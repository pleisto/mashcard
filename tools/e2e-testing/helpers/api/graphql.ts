export const BLOCK_SYNC_BATCH = `
mutation blockSyncBatch($input: BlockSyncBatchInput!) {
  blockSyncBatch(input: $input) {
    errors
    __typename
  }
}
`

export const CREATE_BLOCK = `
mutation blockCreate($input: BlockCreateInput!) {
  blockCreate(input: $input) {
    id
    errors
    __typename
  }
}
`

export const BLOCK_SOFT_DELETE = `
mutation blockSoftDelete($input: BlockSoftDeleteInput!) {
  blockSoftDelete(input: $input) {
    errors
    __typename
  }
}
`

export const GET_PAGE_BLOCKS = `
query GetPageBlocks($domain: String!) {
  pageBlocks(domain: $domain) {
    id
    parentId
  }
}
`