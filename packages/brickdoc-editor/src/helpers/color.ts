import { FormulaColorType } from '@brickdoc/formula'

export interface ColorMeta {
  color: string
  rgb: [number, number, number]
  label: string
}

export const COLOR: ColorMeta[] = [
  {
    color: '#3E3E3E',
    rgb: [62, 62, 62],
    label: 'Default'
  },
  {
    color: '#A6A6A6',
    rgb: [51, 51, 51],
    label: 'Gray'
  },
  {
    color: '#2DC5E3',
    rgb: [93, 121, 228],
    label: 'Cyan'
  },
  {
    color: '#D43730',
    rgb: [212, 55, 48],
    label: 'Red'
  },
  {
    color: '#E47F2A',
    rgb: [228, 127, 42],
    label: 'Orange'
  },
  {
    color: '#FFE27D',
    rgb: [255, 216, 78],
    label: 'Yellow'
  },
  {
    color: '#2CAD94',
    rgb: [44, 173, 148],
    label: 'Green'
  },
  {
    color: '#55C6DF',
    rgb: [85, 198, 223],
    label: 'Blue'
  },
  {
    color: '#5423B9',
    rgb: [84, 35, 185],
    label: 'Purple'
  },
  {
    color: '#9F0F64',
    rgb: [159, 15, 100],
    label: 'Purplish Red'
  }
]

const defaultColorMeta: ColorMeta = COLOR[0]

const blockColorMeta: ColorMeta = {
  color: '#356CF9',
  rgb: [53, 108, 249],
  label: 'palette/hue/blue/6'
}

export const FORMULA_COLORS: Record<FormulaColorType, ColorMeta> = {
  null: {
    color: '#6D47B9',
    rgb: [109, 71, 185],
    label: 'palette/hue/purple/5'
  },
  number: {
    color: '#39B3E8',
    rgb: [57, 179, 232],
    label: 'palette/hue/cyan/6'
  },
  string: {
    color: '#D81B60',
    rgb: [216, 27, 96],
    label: 'palette/hue/pink/6'
  },
  Record: blockColorMeta,
  Array: blockColorMeta,
  Date: {
    color: '#39B3E8',
    rgb: [57, 179, 232],
    label: 'palette/hue/cyan/6'
  },
  Error: {
    color: '#CF1F28',
    rgb: [207, 31, 40],
    label: 'palette/hue/red/7'
  },
  Column: {
    color: '#218470',
    rgb: [33, 132, 112],
    label: 'palette/hue/green/8'
  },
  Block: blockColorMeta,
  Spreadsheet: blockColorMeta,
  Function: {
    color: '#C84116',
    rgb: [200, 65, 22],
    label: 'palette/hue/orange/8'
  },
  Blank: {
    color: '#218470',
    rgb: [33, 132, 112],
    label: 'palette/hue/green/8'
  },
  Predicate: {
    color: '#39B3E8',
    rgb: [57, 179, 232],
    label: 'palette/hue/cyan/6'
  },
  Button: {
    color: '#356CF9',
    rgb: [53, 108, 249],
    label: 'palette/hue/blue/6'
  },

  // Unknown
  Switch: defaultColorMeta,
  Select: defaultColorMeta,
  Slider: defaultColorMeta,
  Input: defaultColorMeta,
  Radio: defaultColorMeta,
  Rate: defaultColorMeta,
  void: defaultColorMeta,
  Cst: defaultColorMeta,
  Reference: {
    color: '#D81B60',
    rgb: [216, 27, 96],
    label: 'palette/hue/pink/6'
  },
  any: defaultColorMeta,
  // Other
  TRUE: {
    color: '#218470',
    rgb: [33, 132, 112],
    label: 'palette/hue/green/8'
  },
  FALSE: {
    color: '#CF1F28',
    rgb: [207, 31, 40],
    label: 'palette/hue/red/7'
  },
  Variable: {
    color: '#D81B60',
    rgb: [216, 27, 96],
    label: 'palette/hue/pink/6'
  }
}
