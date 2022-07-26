import { PageBlock } from '@/helpers/types/data.types'
import { generateUUID } from '@/helpers/utils/uuid'
import { BlockCommitInput } from '@/helpers/types/graphql/input.types'

export function blockCommitConverter(page: PageBlock, id: string): BlockCommitInput {
  return {
    input: {
      documentId: id,
      blockId: id,
      // hard code temporary until backend be fixed
      operatorId: '54701a5a-f151-499f-8cc3-069950144ad3',
      stateType: 'full',
      state: page.state ?? '',
      stateId: generateUUID(),
      statesCount: 1,
      meta: {
        title: page.title,
        icon: page.icon
          ? {
              __typename: 'BlockEmoji',
              type: 'EMOJI',
              name: page.icon.name,
              emoji: page.icon.emoji
            }
          : undefined
      },
      content: {
        type: 'doc',
        content: []
      }
    }
  }
}
