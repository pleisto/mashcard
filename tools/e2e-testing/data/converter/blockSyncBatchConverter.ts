import { Block, BlockSyncBatchInput } from '@/helpers/api/types'
import { PageBlock } from '../types'

export function blockSyncBatchConverter(page: PageBlock, id: string): BlockSyncBatchInput {
  return {
    input: {
      blocks: blockConverter(page, id),
      deletedIds: [],
      rootId: id,
      // hard code temporary until backend be fixed
      operatorId: '54701a5a-f151-499f-8cc3-069950144ad3'
    }
  }
}

function blockConverter(page: PageBlock, id: string): Block[] {
  return [
    {
      content: [],
      id,
      text: page.title,
      type: 'doc',
      meta: {
        title: page.title,
        icon: page.icon
          ? {
              type: 'EMOJI',
              name: page.icon.name,
              emoji: page.icon.emoji,
              __typename: 'BlockEmoji'
            }
          : undefined,
        link: null,
        __typename: 'BlockMeta'
      },
      data: {}
    }
  ]
}
