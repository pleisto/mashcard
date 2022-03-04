import { Icon } from '@brickdoc/design-system'
import { Palettes } from '@brickdoc/design-system/src/themes/ceramic-light/colors/palettes'
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
export interface FormulaColorMeta {
  color: string
  rgb: [number, number, number]
  label: string
  backgroundColor: string
  hoverBackgroundColor: string
  pressedBackgroundColor: string
}

const defaultColorMeta: FormulaColorMeta = {
  color: '#908B9C',
  rgb: [249, 249, 249],
  label: 'palette/bg/primary',
  backgroundColor: '#F9F9F9',
  hoverBackgroundColor: '#F0F0F0',
  pressedBackgroundColor: '#F0F0F0'
}

const blueColorMeta: FormulaColorMeta = {
  color: '#356CF9',
  rgb: [53, 108, 249],
  label: 'palette/hue/blue/6',
  backgroundColor: Palettes.blue1,
  hoverBackgroundColor: Palettes.blue2,
  pressedBackgroundColor: Palettes.blue3
}

const cyanColorMeta: FormulaColorMeta = {
  color: Palettes.cyan6,
  rgb: [57, 179, 232],
  label: 'palette/hue/cyan/6',
  backgroundColor: Palettes.cyan1,
  hoverBackgroundColor: Palettes.cyan2,
  pressedBackgroundColor: Palettes.cyan3
}

const greenColorMeta: FormulaColorMeta = {
  color: Palettes.green8,
  rgb: [33, 132, 112],
  label: 'palette/hue/green/8',
  backgroundColor: Palettes.green1,
  hoverBackgroundColor: Palettes.green2,
  pressedBackgroundColor: Palettes.green3
}

const pinkColorMeta: FormulaColorMeta = {
  color: Palettes.pink6,
  rgb: [216, 27, 96],
  label: 'palette/hue/pink/6',
  backgroundColor: Palettes.pink1,
  hoverBackgroundColor: Palettes.pink2,
  pressedBackgroundColor: Palettes.pink3
}

const redColorMeta: FormulaColorMeta = {
  color: Palettes.red7,
  rgb: [207, 31, 40],
  label: 'palette/hue/red/7',
  backgroundColor: Palettes.red1,
  hoverBackgroundColor: Palettes.red2,
  pressedBackgroundColor: Palettes.red3
}

const purpleColorMeta: FormulaColorMeta = {
  color: Palettes.purple6,
  rgb: [109, 71, 185],
  label: 'palette/hue/purple/5',
  backgroundColor: Palettes.purple1,
  hoverBackgroundColor: Palettes.purple2,
  pressedBackgroundColor: Palettes.purple3
}

const orangeColorMeta: FormulaColorMeta = {
  color: Palettes.orange8,
  rgb: [200, 65, 22],
  label: 'palette/hue/orange/8',
  backgroundColor: Palettes.orange1,
  hoverBackgroundColor: Palettes.orange2,
  pressedBackgroundColor: Palettes.orange3
}

export const FORMULA_COLORS: Record<FormulaColorType, FormulaColorMeta> = {
  null: purpleColorMeta,
  number: cyanColorMeta,
  string: pinkColorMeta,
  Record: blueColorMeta,
  Array: blueColorMeta,
  Date: cyanColorMeta,
  Error: redColorMeta,
  Column: greenColorMeta,
  Block: blueColorMeta,
  Spreadsheet: blueColorMeta,
  Function: orangeColorMeta,
  Blank: greenColorMeta,
  Predicate: cyanColorMeta,
  Button: blueColorMeta,

  // Unknown
  Switch: defaultColorMeta,
  Select: defaultColorMeta,
  Slider: defaultColorMeta,
  Input: defaultColorMeta,
  Radio: defaultColorMeta,
  Rate: defaultColorMeta,
  void: defaultColorMeta,
  Cst: defaultColorMeta,
  Reference: pinkColorMeta,
  any: defaultColorMeta,
  // Other
  TRUE: greenColorMeta,
  FALSE: redColorMeta,
  FunctionName: pinkColorMeta,
  Variable: pinkColorMeta
}

const defaultIcon = <Icon.Function />
export const FORMULA_ICONS: Record<FormulaColorType, JSX.Element> = {
  null: defaultIcon,
  number: <Icon.Number />,
  string: <Icon.String />,
  Record: <Icon.Copy />,
  Array: defaultIcon,
  Date: <Icon.Calendar />,
  Error: defaultIcon,
  Column: <Icon.Column />,
  Block: defaultIcon,
  Spreadsheet: <Icon.Table />,
  Function: defaultIcon,
  Blank: defaultIcon,
  Predicate: defaultIcon,
  Button: defaultIcon,

  // Unknown
  Switch: defaultIcon,
  Select: defaultIcon,
  Slider: defaultIcon,
  Input: defaultIcon,
  Radio: defaultIcon,
  Rate: defaultIcon,
  void: defaultIcon,
  Cst: defaultIcon,
  Reference: defaultIcon,
  any: defaultIcon,
  // Other
  TRUE: defaultIcon,
  FALSE: defaultIcon,
  FunctionName: defaultIcon,
  Variable: defaultIcon
}
