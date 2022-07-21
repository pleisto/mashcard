import { CreateBlockInput } from '@/helpers/types/graphql.types'
import { PageBlock } from '@/helpers/types/data.types'

export function createBlockConverter(page: PageBlock, username: string, parentId?: string): CreateBlockInput {
  return {
    input: {
      parentId,
      title: page.title,
      username
    }
  }
}
