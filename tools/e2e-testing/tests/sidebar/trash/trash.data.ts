import { PageBlock } from '@/helpers/types/data.types'

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

export const TRASH_PAGE_TREE_FOR_VIRTUAL: PageBlock[] = [
  {
    title: 'page 1 - This is a very long title used to test the omission of long titles without icon'
  },
  {
    title: 'page 2 - This is a very long title used to test the omission of long titles with icon',
    icon: {
      emoji: '😀',
      name: 'grinning face'
    }
  },
  {
    title: 'page 3'
  },
  {
    title: 'page 4'
  },
  {
    title: 'page 5'
  },
  {
    title: 'page 6'
  },
  {
    title: 'page 7'
  },
  {
    title: 'page 8'
  }
]
