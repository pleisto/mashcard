import { PageTreeNode } from '@/pages/sidebar/PageListPage'

export const FIVE_LAYER_PAGE_TREES: PageTreeNode[] = [
  { pageName: 'page 1' },
  { pageName: 'page 1.1', parentNode: 'page 1' },
  { pageName: 'page 1.1.1', parentNode: 'page 1.1' },
  { pageName: 'page 1.1.1.1', parentNode: 'page 1.1.1' },
  { pageName: 'page 1.1.1.1.1', parentNode: 'page 1.1.1.1' }
]
