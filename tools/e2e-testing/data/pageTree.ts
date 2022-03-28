import { PageTreeNode } from '@/components/sidebar/PageList'

export const pageTrees: PageTreeNode[] = [
  { pageName: '1' },
  { pageName: '1-1', parentNode: '1' },
  { pageName: '1-1-1', parentNode: '1-1' },
  { pageName: '2' },
  { pageName: '2-1', parentNode: '2' }
]
