import { CreateBlockInput } from '@/helpers/api/types'
import { PageBlock } from '../types'

export function createBlockConverter(page: PageBlock, parentId?: string): CreateBlockInput {
  return {
    input: {
      parentId,
      title: page.title
    }
  }
}
