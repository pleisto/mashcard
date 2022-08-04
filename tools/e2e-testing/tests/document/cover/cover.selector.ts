import { TEST_ID_ENUM } from '@mashcard/test-helper'

export const COVER_TAB = {
  unsplashTab: 'unsplashTab',
  uploadTab: 'uploadTab',
  linkTab: 'linkTab'
}

export const COVER_SELECTOR = {
  searchInput: `div[data-testid=${TEST_ID_ENUM.uploader.Dashboard.tabs.Unsplash.search.id}] input`,
  unsplashImages: '.dashboard-unsplash-image-list button'
}
