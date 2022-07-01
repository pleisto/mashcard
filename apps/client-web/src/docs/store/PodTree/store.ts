import { apolloClient } from '@/core/apollo'
import {
  GetBlockPinsDocument,
  GetBlockPinsQuery,
  GetBlockPinsQueryVariables,
  GetPageBlocksDocument,
  GetPageBlocksQuery,
  GetPageBlocksQueryVariables
} from '@/MashcardGraphQL'
import { createStore } from 'zustand'

type PageBlocks = GetPageBlocksQuery['pageBlocks']
interface PodTreeStore {
  pinIds: string[]
  pageBlocks: PageBlocks
  pinnedBlocks: PageBlocks

  fetch: (domain: string) => void
}

const store = createStore<PodTreeStore>((set, get) => ({
  async fetch(domain: string) {
    const pagesResult = await apolloClient.query<GetPageBlocksQuery, GetPageBlocksQueryVariables>({
      query: GetPageBlocksDocument,
      variables: { domain }
    })
    const pageBlocks = pagesResult.data.pageBlocks
    const pinsResult = await apolloClient.query<GetBlockPinsQuery, GetBlockPinsQueryVariables>({
      query: GetBlockPinsDocument
    })
    const pinIds = pinsResult.data.blockPins?.map(pin => pin.blockId)
    set({ pageBlocks, pinIds })
  },
  pageBlocks: null,
  pinnedBlocks: null,
  pinIds: []
}))
