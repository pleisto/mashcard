import { generatePalette } from '../../../utilities'

export const Palettes = {
  white: '#fff',
  black: '#000',

  grey1: '#fcfcfa',
  grey2: '#f0f0f0',
  grey3: '#e0e0e0',
  grey4: '#d3d3d3',
  grey5: '#cacaca',
  grey6: '#8e8e8e',
  grey7: '#757575',
  grey8: '#616161',
  grey9: '#1c1c1e',

  /**
   * Red
   */
  ...generatePalette<'red'>('red', '#d43730'),

  /**
   * Scarlet
   */
  ...generatePalette<'scarlet'>('scarlet', '#df5641'),
  scarlet2: '#fee5e1',
  scarlet3: '#fdcec7',
  scarlet8: '#bc4837',
  scarlet9: '#8b3528',

  /**
   * Orange
   */
  ...generatePalette<'orange'>('orange', '#fb8c00'),

  /**
   * Yellow
   */
  ...generatePalette<'yellow'>('yellow', '#ffd84e'),

  /**
   * Green
   */
  ...generatePalette<'green'>('green', '#2cad94'),

  /**
   * Cyan
   */
  ...generatePalette<'cyan'>('cyan', '#39b3e8'),
  cyan1: '#f8fbff',

  /**
   * Blue
   */
  ...generatePalette<'blue'>('blue', '#2c5bff'),

  /**
   * Deep Purple
   */
  ...generatePalette<'deepPurple'>('deepPurple', '#3a3642'),
  deepPurple9: '#292323',

  /**
   * Purple
   */
  ...generatePalette<'purple'>('purple', '#5e35b1'),

  /**
   * Pink
   */
  ...generatePalette<'pink'>('pink', '#ad1457'),
  pink2: '#efcde1',
  pink3: '#e2a4c8',
  pink4: '#c55998'
}
