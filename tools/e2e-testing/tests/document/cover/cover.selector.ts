import { TEST_ID_ENUM } from '@/../../packages/test-helper/src'

export enum CoverTab {
  Unsplash = 'Unsplash',
  Upload = 'Upload',
  Link = 'Link'
}

export const COVER_SELECTOR = {
  searchInput: `div[data-testid=${TEST_ID_ENUM.uploader.Dashboard.tabs.Unsplash.search.id}] input`,
  unsplashImage: (index: number) => `.dashboard-unsplash-image-list button >> nth=${index}`
}
