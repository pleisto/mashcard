import { generatePalette } from '../../../utilities'

export const Palettes = {
  white: '#fff',
  black: '#000',

  grey1: '#fcfcfa',
  grey2: '#f0f0f0',
  grey3: '#e0e0e0',
  grey4: '#d3d3d3',
  grey5: '#bdbdbd',
  grey6: '#8e8e8e',
  grey7: '#757575',
  grey8: '#3d3d3d',
  grey9: '#1c1c1e',

  /**
   * Red
   */
  ...generatePalette('red', '#e6222d'),
  red1: '#ffefeb',
  red2: '#ffe0e2',

  /**
   * Orange
   */
  ...generatePalette('orange', '#ff6d00'),
  orange1: '#fff1e4',
  orange2: '#ffe0c8',

  /**
   * Yellow
   */
  ...generatePalette('yellow', '#ffd84e'),
  yellow1: '#fffbe4',
  yellow2: '#fff6d7',
  yellow3: '#fff0b9',
  yellow9: '#8e710a',

  /**
   * Green
   */
  ...generatePalette('green', '#2cad94'),
  green1: '#e3fff9',
  green2: '#cbfaf0',

  /**
   * Cyan
   */
  ...generatePalette('cyan', '#39b3e8'),
  cyan2: '#e7f8ff',
  cyan3: '#cdf0ff',
  cyan4: '#bdebff',

  /**
   * Blue
   */
  ...generatePalette('blue', '#4089d8'),
  blue1: '#e8f2fe',
  blue2: '#d7e9ff',
  blue7: '#3476bc',

  /**
   * Deep Purple
   */
  ...generatePalette('deepPurple', '#3a3642'),
  deepPurple4: '#adaab6',
  deepPurple5: '#84818e',

  /**
   * Purple
   */
  ...generatePalette('purple', '#7890db'),
  purple1: '#e8e9ff',
  purple2: '#dbdffe',
  purple3: '#cfdaff',

  /**
   * Pink
   */
  ...generatePalette('pink', '#d81b60'),
  pink1: '#ffeef4',
  pink2: '#ffdfeb',
  pink3: '#ffc0d7',
}
