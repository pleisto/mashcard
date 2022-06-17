import { PageBlock } from '@/helpers/types/data.types'

export const NESTED_LAYER_PAGE_TREE: PageBlock[] = [
  {
    title: 'page 1',
    children: [
      {
        title: 'page 1-2-3',
        children: [
          {
            title: 'page 1-2-3-4',
            children: [
              {
                title: 'page 1-2-3-4-5',
                children: [
                  {
                    title: 'page 1-2-3-4-5-6',
                    children: [
                      {
                        title: 'page 1-2-3-4-5-6-7',
                        icon: { name: 'face with tongue', emoji: '😛' }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

export const PAGE_LIST = (): PageBlock[] => {
  const list: PageBlock[] = []
  for (let index = 0; index < 20; index++) {
    list.push({ title: 'page 1' })
  }
  return list
}
