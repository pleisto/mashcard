import { PageBlock } from './types'

export const SINGLE_PAGE: PageBlock = {
  title: 'It is a breadcrumb which is more than 150px'
}

export const SINGLE_PAGE_WITH_ICON: PageBlock = {
  title: 'page 1',
  icon: { name: 'face with tongue', emoji: '😛' }
}

export const FIVE_LAYER_PAGE_TREE: PageBlock[] = [
  {
    title: 'page 1',
    children: [
      {
        title: 'page 1-1',
        children: [
          {
            title: 'page 1-1-1',
            children: [
              {
                title: 'page 1-1-1-1',
                children: [{ title: 'page 1-1-1-1-1' }]
              }
            ]
          }
        ]
      }
    ]
  }
]
