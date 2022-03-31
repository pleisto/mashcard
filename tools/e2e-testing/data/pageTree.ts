import { PageTreeNode } from '@/pages/sidebar/PageListPage'

export const PAGE_TREES: PageTreeNode[] = [
  { pageName: '1' },
  { pageName: '1-1', parentNode: '1' },
  { pageName: '1-1-1', parentNode: '1-1' },
  { pageName: '2' },
  { pageName: '2-1', parentNode: '2' }
]
