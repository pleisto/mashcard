import { addons } from '@storybook/addons'
import { BrickdocTheme } from './BrickdocTheme'
import { globalStyle } from '../src/themes'

globalStyle()
addons.setConfig({
  theme: BrickdocTheme
})
