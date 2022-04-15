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
  emojiSearchInput: '.dashboard-emoji-search-input',
  emojiByGroup: (group: EmojiGroup, index: number = 0) =>
    `.dashboard-emoji-group:has-text("${group}") .dashboard-emoji-list .dashboard-emoji-item >> nth=${index}`
}
