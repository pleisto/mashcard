export enum IconTab {
  Emoji = 'Emoji',
  UploadImage = 'Upload an Image',
  Link = 'Link'
}

export const ICON_SELECTOR = {
  emojiSearchInput: '.dashboard-emoji-search-input input',
  emojiItem: (index: number) => `button.dashboard-emoji-item >> nth=${index}`
}
