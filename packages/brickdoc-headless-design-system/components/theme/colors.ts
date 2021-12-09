import { colorShadeMixinString, Shade } from '@brickdoc/design-colors/src'
import { ColorToken } from './colorToken'

const Cyan = '#39b3e8'
const Red = '#d43730'
const Scarlet = '#f75f48'
const Orange = '#fb8c00'
const Yellow = '#fb8c00'
const Green = '#2cad94'
const Blue = '#2c5bff'
const Purple = '#5e35b1'
const DeepPurple = '#3a3642'
const Pink = '#ad1457'

export const Colors = {
  white: '#fff',
  black: '#000',
  'grey-1': '#f5f5f5',
  'grey-2': '#eee',
  'grey-3': '#e0e0e0',
  'grey-4': '#bdbdbd',
  'grey-5': '#9e9e9e',
  'grey-6': '#757575',
  'grey-7': '#616161',
  'grey-8': '#424242',
  'grey-9': '#1c1c1e',

  'cyan-base': Cyan,
  'cyan-1': colorShadeMixinString(Cyan, Shade.Shade1, 'false'),
  'cyan-2': colorShadeMixinString(Cyan, Shade.Shade2),
  'cyan-3': colorShadeMixinString(Cyan, Shade.Shade3),
  'cyan-4': colorShadeMixinString(Cyan, Shade.Shade4),
  'cyan-5': colorShadeMixinString(Cyan, Shade.Shade5),
  'cyan-6': Cyan,
  'cyan-7': colorShadeMixinString(Cyan, Shade.Shade6),
  'cyan-8': colorShadeMixinString(Cyan, Shade.Shade7),
  'cyan-9': '#2c89b0',

  'red-base': Red,
  'red-1': colorShadeMixinString(Red, Shade.Shade1),
  'red-2': colorShadeMixinString(Red, Shade.Shade2),
  'red-3': colorShadeMixinString(Red, Shade.Shade3),
  'red-4': colorShadeMixinString(Red, Shade.Shade4),
  'red-5': colorShadeMixinString(Red, Shade.Shade5),
  'red-6': Red,
  'red-7': colorShadeMixinString(Red, Shade.Shade6),
  'red-8': colorShadeMixinString(Red, Shade.Shade7),
  'red-9': colorShadeMixinString(Red, Shade.Shade8),

  'scarlet-base': Scarlet,
  'scarlet-1': colorShadeMixinString(Scarlet, Shade.Shade1),
  'scarlet-2': colorShadeMixinString(Scarlet, Shade.Shade2),
  'scarlet-3': colorShadeMixinString(Scarlet, Shade.Shade3),
  'scarlet-4': colorShadeMixinString(Scarlet, Shade.Shade4),
  'scarlet-5': colorShadeMixinString(Scarlet, Shade.Shade5),
  'scarlet-6': Scarlet,
  'scarlet-7': colorShadeMixinString(Scarlet, Shade.Shade6),
  'scarlet-8': colorShadeMixinString(Scarlet, Shade.Shade7),
  'scarlet-9': colorShadeMixinString(Scarlet, Shade.Shade8),

  'orange-base': Orange,
  'orange-1': colorShadeMixinString(Orange, Shade.Shade1),
  'orange-2': colorShadeMixinString(Orange, Shade.Shade2),
  'orange-3': colorShadeMixinString(Orange, Shade.Shade3),
  'orange-4': colorShadeMixinString(Orange, Shade.Shade4),
  'orange-5': colorShadeMixinString(Orange, Shade.Shade5),
  'orange-6': Orange,
  'orange-7': colorShadeMixinString(Orange, Shade.Shade6),
  'orange-8': colorShadeMixinString(Orange, Shade.Shade7),
  'orange-9': colorShadeMixinString(Orange, Shade.Shade8),

  'yellow-base': Yellow,
  'yellow-1': colorShadeMixinString(Yellow, Shade.Shade1),
  'yellow-2': colorShadeMixinString(Yellow, Shade.Shade2),
  'yellow-3': colorShadeMixinString(Yellow, Shade.Shade3),
  'yellow-4': colorShadeMixinString(Yellow, Shade.Shade4),
  'yellow-5': colorShadeMixinString(Yellow, Shade.Shade5),
  'yellow-6': Yellow,
  'yellow-7': colorShadeMixinString(Yellow, Shade.Shade6),
  'yellow-8': colorShadeMixinString(Yellow, Shade.Shade7),
  'yellow-9': colorShadeMixinString(Yellow, Shade.Shade8),

  'green-base': Green,
  'green-1': colorShadeMixinString(Green, Shade.Shade1),
  'green-2': colorShadeMixinString(Green, Shade.Shade2),
  'green-3': colorShadeMixinString(Green, Shade.Shade3),
  'green-4': colorShadeMixinString(Green, Shade.Shade4),
  'green-5': colorShadeMixinString(Green, Shade.Shade5),
  'green-6': Green,
  'green-7': colorShadeMixinString(Green, Shade.Shade6),
  'green-8': colorShadeMixinString(Green, Shade.Shade7),
  'green-9': colorShadeMixinString(Green, Shade.Shade8),

  'blue-base': Blue,
  'blue-1': colorShadeMixinString(Blue, Shade.Shade1),
  'blue-2': colorShadeMixinString(Blue, Shade.Shade2),
  'blue-3': colorShadeMixinString(Blue, Shade.Shade3),
  'blue-4': colorShadeMixinString(Blue, Shade.Shade4),
  'blue-5': colorShadeMixinString(Blue, Shade.Shade5),
  'blue-6': Blue,
  'blue-7': colorShadeMixinString(Blue, Shade.Shade6),
  'blue-8': colorShadeMixinString(Blue, Shade.Shade7),
  'blue-9': colorShadeMixinString(Blue, Shade.Shade8),

  'purple-base': Purple,
  'purple-1': colorShadeMixinString(Purple, Shade.Shade1),
  'purple-2': colorShadeMixinString(Purple, Shade.Shade2),
  'purple-3': colorShadeMixinString(Purple, Shade.Shade3),
  'purple-4': colorShadeMixinString(Purple, Shade.Shade4),
  'purple-5': colorShadeMixinString(Purple, Shade.Shade5),
  'purple-6': Purple,
  'purple-7': colorShadeMixinString(Purple, Shade.Shade6),
  'purple-8': colorShadeMixinString(Purple, Shade.Shade7),
  'purple-9': colorShadeMixinString(Purple, Shade.Shade8),

  'deep-purple-base': DeepPurple,
  'deep-purple-1': colorShadeMixinString(DeepPurple, Shade.Shade1),
  'deep-purple-2': colorShadeMixinString(DeepPurple, Shade.Shade2),
  'deep-purple-3': colorShadeMixinString(DeepPurple, Shade.Shade3),
  'deep-purple-4': colorShadeMixinString(DeepPurple, Shade.Shade4),
  'deep-purple-5': colorShadeMixinString(DeepPurple, Shade.Shade5),
  'deep-purple-6': DeepPurple,
  'deep-purple-7': colorShadeMixinString(DeepPurple, Shade.Shade6),
  'deep-purple-8': colorShadeMixinString(DeepPurple, Shade.Shade7),
  'deep-purple-9': colorShadeMixinString(DeepPurple, Shade.Shade8),

  'pink-base': Pink,
  'pink-1': colorShadeMixinString(Pink, Shade.Shade1),
  'pink-2': colorShadeMixinString(Pink, Shade.Shade2),
  'pink-3': colorShadeMixinString(Pink, Shade.Shade3),
  'pink-4': colorShadeMixinString(Pink, Shade.Shade4),
  'pink-5': colorShadeMixinString(Pink, Shade.Shade5),
  'pink-6': Pink,
  'pink-7': colorShadeMixinString(Pink, Shade.Shade6),
  'pink-8': colorShadeMixinString(Pink, Shade.Shade7),
  'pink-9': colorShadeMixinString(Pink, Shade.Shade8),

  ...ColorToken
}
