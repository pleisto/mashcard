import { PageBlock } from './types.data'

export const TRASH_SINGLE_PAGE: PageBlock = {
  title: 'page 1',
  icon: {
    emoji: '😀',
    name: 'grinning face'
  },
  children: [
    {
      title: 'page 1-1'
    }
  ]
}

export const TRASH_PAGE_TREE: PageBlock[] = [
  {
    title: 'page 1',
    icon: {
      emoji: '😀',
      name: 'grinning face'
    }
  },
  {
    title: 'page 2 (for search)'
  },
  {
    title: 'page 3 (for search)'
  }
]
