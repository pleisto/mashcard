export enum EmojiGroup {
  Recent = 'RECENT',
  SmileysAndEmotion = 'Smileys & Emotion',
  PeopleAndBody = 'People & Body',
  AnimalsAndNature = 'Animals & Nature',
  FoodAndDrink = 'Food & Drink',
  TravelAndPlaces = 'Travel & Places',
  Activities = 'Activities',
  Objects = 'Objects',
  Symbols = 'Symbols',
  Flags = 'Flags'
}

export enum IconTab {
  Emoji = 'Emoji',
  UploadImage = 'Upload an Image',
  Link = 'Link'
}

export const ICON_SELECTOR = {
  emoji: (emoji: string) => `.dashboard-emoji:has-text("${emoji}")`,
  emojiSearchInput: '.dashboard-emoji-search-input',
  emojiByGroup: (group: EmojiGroup, index: number = 0) =>
    `.dashboard-emoji-group:has-text("${group}") .dashboard-emoji-list .dashboard-emoji-item >> nth=${index}`,
  iconTab: (tab: IconTab) => `.uploader-dashboard-navbar button:has-text("${tab}")`,
  removeButton: '.uploader-dashboard-action-buttons button:has-text("Remove")',
  uploadImageButton: '.dashboard-upload-file-input',
  linkInput: '[data-testid=uploader-dashboard-modules-link-input]',
  linkSubmitButton: '[data-testid=uploader-dashboard-modules-link-button]',
  invalidUrlTooltip: 'span:has-text("Invalid image url")'
}
