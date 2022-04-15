export enum CoverTab {
  Unsplash = 'Unsplash',
  Upload = 'Upload',
  Link = 'Link'
}

export const COVER_SELECTOR = {
  searchInput: '.dashboard-unsplash-search-input',
  unsplashImage: (index: number) => `.dashboard-unsplash-image-list button >> nth=${index}`
}
