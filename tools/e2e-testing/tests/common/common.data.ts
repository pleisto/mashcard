import { PageBlock } from '@/helpers/types/data.types'

export const INITIAL_PAGE: PageBlock = {
  title: 'Untitled'
}

export const TWO_LAYER_PAGE_TREE: PageBlock[] = [
  {
    title: 'page 1',
    children: [
      {
        title: 'page 1-1'
      }
    ]
  }
]

export const COMMON_STYLE = {
  hoverBackground: 'rgba(64, 137, 216, 0.1)'
}
