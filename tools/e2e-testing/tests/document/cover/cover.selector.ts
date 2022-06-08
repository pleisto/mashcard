export enum CoverTab {
  Unsplash = 'Unsplash',
  Upload = 'Upload',
  Link = 'Link'
}

export const COVER_SELECTOR = {
  searchInput: 'div[data-testid=uploader-dashboard-tabs-unsplash-search] input',
  unsplashImage: (index: number) => `.dashboard-unsplash-image-list button >> nth=${index}`
}
