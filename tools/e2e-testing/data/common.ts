import { PageBlock } from './types'

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
