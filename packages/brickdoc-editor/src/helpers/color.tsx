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
  colorMain: string
  colorSecond: string
  label: string
  color1: string
  color2: string
  color3: string
}

const defaultColorMeta: FormulaColorMeta = {
  colorMain: '#908B9C',
  colorSecond: '#908B9C',
  label: 'palette/bg/primary',
  color1: '#F9F9F9',
  color2: '#F0F0F0',
  color3: '#F0F0F0'
}

const blueColorMeta: FormulaColorMeta = {
  colorMain: Palettes.blue6,
  colorSecond: Palettes.blue8,
  label: 'palette/hue/blue/6',
  color1: Palettes.blue1,
  color2: Palettes.blue2,
  color3: Palettes.blue3
}

const cyanColorMeta: FormulaColorMeta = {
  colorMain: Palettes.cyan6,
  colorSecond: Palettes.cyan9,
  label: 'palette/hue/cyan/6',
  color1: Palettes.cyan1,
  color2: Palettes.cyan2,
  color3: Palettes.cyan3
}

const greenColorMeta: FormulaColorMeta = {
  colorMain: Palettes.green8,
  colorSecond: Palettes.green9,
  label: 'palette/hue/green/8',
  color1: Palettes.green1,
  color2: Palettes.green2,
  color3: Palettes.green3
}

const pinkColorMeta: FormulaColorMeta = {
  colorMain: Palettes.pink6,
  colorSecond: Palettes.pink9,
  label: 'palette/hue/pink/6',
  color1: Palettes.pink1,
  color2: Palettes.pink2,
  color3: Palettes.pink3
}

const redColorMeta: FormulaColorMeta = {
  colorMain: Palettes.red7,
  colorSecond: Palettes.red9,
  label: 'palette/hue/red/7',
  color1: Palettes.red1,
  color2: Palettes.red2,
  color3: Palettes.red3
}

const purpleColorMeta: FormulaColorMeta = {
  colorMain: Palettes.purple5,
  colorSecond: Palettes.purple8,
  label: 'palette/hue/purple/5',
  color1: Palettes.purple1,
  color2: Palettes.purple2,
  color3: Palettes.purple3
}

const orangeColorMeta: FormulaColorMeta = {
  colorMain: Palettes.orange8,
  colorSecond: Palettes.orange9,
  label: 'palette/hue/orange/8',
  color1: Palettes.orange1,
  color2: Palettes.orange2,
  color3: Palettes.orange3
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
  Range: redColorMeta,
  Row: blueColorMeta,
  Cell: purpleColorMeta,
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
  Cst: cyanColorMeta,
  Reference: pinkColorMeta,
  any: defaultColorMeta,
  // Other
  TRUE: greenColorMeta,
  FALSE: redColorMeta,
  FunctionName: pinkColorMeta,
  Variable: pinkColorMeta,
  Pending: defaultColorMeta,
  Waiting: defaultColorMeta,
  NoPersist: defaultColorMeta
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
  Row: <Icon.Row />,
  Range: <Icon.Range />,
  Cell: <Icon.Cell />,
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
  Variable: defaultIcon,
  Pending: defaultIcon,
  Waiting: defaultIcon,
  NoPersist: defaultIcon
}
