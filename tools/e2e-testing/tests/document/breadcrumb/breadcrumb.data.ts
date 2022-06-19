import { PageBlock } from '@/helpers/types/data.types'

export const SUPER_LONG_TITLE_PAGE: PageBlock = {
  title: 'It is a Super Super Super Super Long breadcrumb which is more than 400px',
  icon: { name: 'face with tongue', emoji: '😛' }
}
export const FIVE_LAYER_PAGE_TREE: PageBlock[] = [
  {
    title: 'page 1',
    children: [
      {
        title: 'page 1-1',
        icon: { name: 'face with tongue', emoji: '😛' },
        children: [
          {
            title: 'page 1-1-1',
            children: [
              {
                title: 'page 1-1-1-1',
                icon: { name: 'face with tongue', emoji: '😛' },
                children: [{ title: 'page 1-1-1-1-1' }]
              }
            ]
          }
        ]
      }
    ]
  }
]
