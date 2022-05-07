import { CreateBlockInput } from '@/helpers/api/types'
import { PageBlock } from '../types.data'

export function createBlockConverter(page: PageBlock, parentId?: string): CreateBlockInput {
  return {
    input: {
      parentId,
      title: page.title
    }
  }
}
