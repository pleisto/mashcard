import { Icon, css } from '@mashcard/design-system'
import { Palettes } from '@mashcard/design-system/src/themes/ceramic-light/colors/palettes'
import { FormulaColorType } from '@mashcard/formula'
import { mapValues } from 'lodash'

const primary = '#35313C' // palette/type/primary
const thirdary = '#908B9C' // palette/type/thirdary
export interface FormulaColorMeta {
  colorMain: string
  colorCode: string
  color1: string
  color2: string
  color3: string
}

const defaultColorMeta: FormulaColorMeta = {
  colorMain: primary,
  colorCode: '#908B9C',
  color1: '#F9F9F9',
  color2: '#F0F0F0',
  color3: '#F0F0F0'
}

const blueColorMeta: FormulaColorMeta = {
  colorMain: primary,
  colorCode: Palettes.blue6,
  color1: Palettes.blue1,
  color2: Palettes.blue2,
  color3: Palettes.blue3
}

const cyanColorMeta: FormulaColorMeta = {
  colorMain: primary,
  colorCode: Palettes.cyan6,
  color1: Palettes.cyan1,
  color2: Palettes.cyan2,
  color3: Palettes.cyan3
}

const greenColorMeta: FormulaColorMeta = {
  colorMain: primary,
  colorCode: Palettes.green6,
  color1: Palettes.green1,
  color2: Palettes.green2,
  color3: Palettes.green3
}

const pinkColorMeta: FormulaColorMeta = {
  colorMain: Palettes.pink6,
  colorCode: Palettes.pink6,
  color1: Palettes.pink1,
  color2: Palettes.pink2,
  color3: Palettes.pink3
}

const redColorMeta: FormulaColorMeta = {
  colorMain: primary,
  colorCode: Palettes.red7,
  color1: Palettes.red1,
  color2: Palettes.red2,
  color3: Palettes.red3
}

const purpleColorMeta: FormulaColorMeta = {
  colorMain: primary,
  colorCode: Palettes.purple5,
  color1: Palettes.purple1,
  color2: Palettes.purple2,
  color3: Palettes.purple3
}

const orangeColorMeta: FormulaColorMeta = {
  colorMain: primary,
  colorCode: Palettes.orange7,
  color1: Palettes.orange1,
  color2: Palettes.orange2,
  color3: Palettes.orange3
}

export const formulaCodeStyle = (colorType: string): string => {
  const colorMeta = FORMULA_COLOR_METAS[colorType as FormulaColorType]
  if (!colorMeta) return ''
  return `color: ${colorMeta.colorCode};`
}

export const FORMULA_CODE_ERROR_STYLE = `
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: ${Palettes.red7};
`

export const FORMULA_COLOR_METAS: Record<FormulaColorType, FormulaColorMeta> = {
  null: purpleColorMeta,
  number: cyanColorMeta,
  string: pinkColorMeta,
  literal: defaultColorMeta,
  Record: orangeColorMeta,
  Array: orangeColorMeta,
  Date: cyanColorMeta,
  Error: redColorMeta,
  Column: blueColorMeta,
  LogicColumn: greenColorMeta,
  Row: blueColorMeta,
  LogicRow: cyanColorMeta,
  Range: redColorMeta,
  Cell: purpleColorMeta,
  Block: blueColorMeta,
  Spreadsheet: blueColorMeta,
  Function: blueColorMeta,
  Blank: { ...greenColorMeta, colorCode: thirdary },
  Predicate: cyanColorMeta,
  Button: blueColorMeta,

  // Unknown
  Switch: defaultColorMeta,
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

export const FORMULA_STYLES = mapValues(FORMULA_COLOR_METAS, ({ colorMain, color1, color2, color3 }) => {
  return css({
    color: colorMain,
    // fontFamily: 'Fira Code',
    backgroundColor: color1,
    border: '1px solid',
    '&:hover': {
      color: colorMain,
      borderColor: color2,
      backgroundColor: color2
    },
    '&:focus, &:active': {
      color: colorMain,
      borderColor: color3,
      backgroundColor: color3
    },
    variants: {
      selected: {
        true: {
          borderColor: colorMain
        },
        false: {
          borderColor: color1
        }
      }
    }
  })
})

const defaultIcon = <Icon.Function />
export const FORMULA_ICONS: Record<FormulaColorType, JSX.Element> = {
  null: defaultIcon,
  number: <Icon.Number />,
  string: <Icon.String />,
  literal: <Icon.String />,
  Record: <Icon.Copy />,
  Array: defaultIcon,
  Date: <Icon.Calendar />,
  Error: defaultIcon,
  Column: <Icon.Column />,
  LogicColumn: <Icon.Column />,
  Row: <Icon.Row />,
  LogicRow: <Icon.Row />,
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
