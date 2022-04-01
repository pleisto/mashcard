import { CreateBlockInput } from '@/helpers/api/type'
import { PageBlock } from '../type'

export function createBlockConverter(page: PageBlock, parentId?: string): CreateBlockInput {
  return {
    input: {
      parentId,
      title: page.title
    }
  }
}
