import { colorShadeMixinString } from '@brickdoc/design-colors/src'
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
  'cyan-1': colorShadeMixinString(Cyan, '1', 'false'),
  'cyan-2': colorShadeMixinString(Cyan, '2'),
  'cyan-3': colorShadeMixinString(Cyan, '3'),
  'cyan-4': colorShadeMixinString(Cyan, '4'),
  'cyan-5': colorShadeMixinString(Cyan, '5'),
  'cyan-6': Cyan,
  'cyan-7': colorShadeMixinString(Cyan, '7'),
  'cyan-8': colorShadeMixinString(Cyan, '8'),
  'cyan-9': '#2c89b0',

  'red-base': Red,
  'red-1': colorShadeMixinString(Red, '1'),
  'red-2': colorShadeMixinString(Red, '2'),
  'red-3': colorShadeMixinString(Red, '3'),
  'red-4': colorShadeMixinString(Red, '4'),
  'red-5': colorShadeMixinString(Red, '5'),
  'red-6': Red,
  'red-7': colorShadeMixinString(Red, '7'),
  'red-8': colorShadeMixinString(Red, '8'),
  'red-9': colorShadeMixinString(Red, '9'),

  'scarlet-base': Scarlet,
  'scarlet-1': colorShadeMixinString(Scarlet, '1'),
  'scarlet-2': colorShadeMixinString(Scarlet, '2'),
  'scarlet-3': colorShadeMixinString(Scarlet, '3'),
  'scarlet-4': colorShadeMixinString(Scarlet, '4'),
  'scarlet-5': colorShadeMixinString(Scarlet, '5'),
  'scarlet-6': Scarlet,
  'scarlet-7': colorShadeMixinString(Scarlet, '6'),
  'scarlet-8': colorShadeMixinString(Scarlet, '7'),
  'scarlet-9': colorShadeMixinString(Scarlet, '8'),

  'orange-base': Orange,
  'orange-1': colorShadeMixinString(Orange, '1'),
  'orange-2': colorShadeMixinString(Orange, '2'),
  'orange-3': colorShadeMixinString(Orange, '3'),
  'orange-4': colorShadeMixinString(Orange, '4'),
  'orange-5': colorShadeMixinString(Orange, '5'),
  'orange-6': Orange,
  'orange-7': colorShadeMixinString(Orange, '6'),
  'orange-8': colorShadeMixinString(Orange, '7'),
  'orange-9': colorShadeMixinString(Orange, '8'),

  'yellow-base': Yellow,
  'yellow-1': colorShadeMixinString(Yellow, '1'),
  'yellow-2': colorShadeMixinString(Yellow, '2'),
  'yellow-3': colorShadeMixinString(Yellow, '3'),
  'yellow-4': colorShadeMixinString(Yellow, '4'),
  'yellow-5': colorShadeMixinString(Yellow, '5'),
  'yellow-6': Yellow,
  'yellow-7': colorShadeMixinString(Yellow, '6'),
  'yellow-8': colorShadeMixinString(Yellow, '7'),
  'yellow-9': colorShadeMixinString(Yellow, '8'),

  'green-base': Green,
  'green-1': colorShadeMixinString(Green, '1'),
  'green-2': colorShadeMixinString(Green, '2'),
  'green-3': colorShadeMixinString(Green, '3'),
  'green-4': colorShadeMixinString(Green, '4'),
  'green-5': colorShadeMixinString(Green, '5'),
  'green-6': Green,
  'green-7': colorShadeMixinString(Green, '6'),
  'green-8': colorShadeMixinString(Green, '7'),
  'green-9': colorShadeMixinString(Green, '8'),

  'blue-base': Blue,
  'blue-1': colorShadeMixinString(Blue, '1'),
  'blue-2': colorShadeMixinString(Blue, '2'),
  'blue-3': colorShadeMixinString(Blue, '3'),
  'blue-4': colorShadeMixinString(Blue, '4'),
  'blue-5': colorShadeMixinString(Blue, '5'),
  'blue-6': Blue,
  'blue-7': colorShadeMixinString(Blue, '6'),
  'blue-8': colorShadeMixinString(Blue, '7'),
  'blue-9': colorShadeMixinString(Blue, '8'),

  'purple-base': Purple,
  'purple-1': colorShadeMixinString(Purple, '1'),
  'purple-2': colorShadeMixinString(Purple, '2'),
  'purple-3': colorShadeMixinString(Purple, '3'),
  'purple-4': colorShadeMixinString(Purple, '4'),
  'purple-5': colorShadeMixinString(Purple, '5'),
  'purple-6': Purple,
  'purple-7': colorShadeMixinString(Purple, '6'),
  'purple-8': colorShadeMixinString(Purple, '7'),
  'purple-9': colorShadeMixinString(Purple, '8'),

  'deep-purple-base': DeepPurple,
  'deep-purple-1': colorShadeMixinString(DeepPurple, '1'),
  'deep-purple-2': colorShadeMixinString(DeepPurple, '2'),
  'deep-purple-3': colorShadeMixinString(DeepPurple, '3'),
  'deep-purple-4': colorShadeMixinString(DeepPurple, '4'),
  'deep-purple-5': colorShadeMixinString(DeepPurple, '5'),
  'deep-purple-6': DeepPurple,
  'deep-purple-7': colorShadeMixinString(DeepPurple, '6'),
  'deep-purple-8': colorShadeMixinString(DeepPurple, '7'),
  'deep-purple-9': colorShadeMixinString(DeepPurple, '8'),

  'pink-base': Pink,
  'pink-1': colorShadeMixinString(Pink, '1'),
  'pink-2': colorShadeMixinString(Pink, '2'),
  'pink-3': colorShadeMixinString(Pink, '3'),
  'pink-4': colorShadeMixinString(Pink, '4'),
  'pink-5': colorShadeMixinString(Pink, '5'),
  'pink-6': Pink,
  'pink-7': colorShadeMixinString(Pink, '6'),
  'pink-8': colorShadeMixinString(Pink, '7'),
  'pink-9': colorShadeMixinString(Pink, '8'),

  // "preset-colors": ["cyan", "red", "orange", "orange", "yellow", "green", "blue", "purple", "deep-purple", "pink"]

  ...ColorToken
}
