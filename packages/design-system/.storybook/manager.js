import { addons } from '@storybook/addons'
import { MashcardTheme } from './MashcardTheme'
import { globalStyle } from '../src/themes'

globalStyle()
addons.setConfig({
  theme: MashcardTheme
})
