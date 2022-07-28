import { Icon, css, theme } from '@mashcard/design-system'
import { Palettes } from '@mashcard/design-system/src/themes/ceramic-light/colors/palettes'
import { FormulaColorType } from '@mashcard/formula'
import { mapValues } from 'lodash'

const primary = theme.colors.typePrimary

type ColorType = string | typeof theme.colors[keyof typeof theme.colors]
export interface FormulaColorMeta {
  // Page rest
  color: ColorType
  // Code
  codeColor: ColorType
  backgroundColor: ColorType
  selectedBorderColor: ColorType
  hoveredBackgroundColor: ColorType
  pressedBackgroundColor: ColorType
}

const defaultColorMeta: FormulaColorMeta = {
  color: primary,
  codeColor: theme.colors.typeSecondary,
  backgroundColor: theme.colors.backgroundSecondary,
  selectedBorderColor: theme.colors.backgroundThirdary,
  hoveredBackgroundColor: theme.colors.backgroundThirdary,
  pressedBackgroundColor: theme.colors.backgroundThirdary
}

const blueColorMeta: FormulaColorMeta = {
  color: primary,
  codeColor: Palettes.blue7,
  selectedBorderColor: Palettes.blue6,
  backgroundColor: Palettes.blue1,
  hoveredBackgroundColor: Palettes.blue2,
  pressedBackgroundColor: Palettes.blue3
}

const cyanColorMeta: FormulaColorMeta = {
  color: primary,
  codeColor: Palettes.cyan9,
  selectedBorderColor: Palettes.cyan6,
  backgroundColor: Palettes.cyan1,
  hoveredBackgroundColor: Palettes.cyan2,
  pressedBackgroundColor: Palettes.cyan3
}

const greenColorMeta: FormulaColorMeta = {
  color: primary,
  codeColor: Palettes.green8,
  selectedBorderColor: Palettes.green6,
  backgroundColor: Palettes.green1,
  hoveredBackgroundColor: Palettes.green2,
  pressedBackgroundColor: Palettes.green3
}

const redColorMeta: FormulaColorMeta = {
  color: primary,
  codeColor: Palettes.red6,
  selectedBorderColor: Palettes.red6,
  backgroundColor: Palettes.red1,
  hoveredBackgroundColor: Palettes.red2,
  pressedBackgroundColor: Palettes.red3
}

const purpleColorMeta: FormulaColorMeta = {
  color: primary,
  codeColor: Palettes.purple8,
  selectedBorderColor: Palettes.purple6,
  backgroundColor: Palettes.purple1,
  hoveredBackgroundColor: Palettes.purple2,
  pressedBackgroundColor: Palettes.purple3
}

const orangeColorMeta: FormulaColorMeta = {
  color: primary,
  codeColor: Palettes.orange8,
  selectedBorderColor: Palettes.orange6,
  backgroundColor: Palettes.orange1,
  hoveredBackgroundColor: Palettes.orange2,
  pressedBackgroundColor: Palettes.orange3
}

export const formulaCodeStyle = (colorType: string): string => {
  const colorMeta = FORMULA_COLOR_METAS[colorType as FormulaColorType]
  if (!colorMeta) return ''
  return `color: ${colorMeta.codeColor};`
}

export const FORMULA_CODE_ERROR_STYLE = `
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: ${Palettes.red7};
`

const FORMULA_COLOR_METAS: Record<FormulaColorType, FormulaColorMeta> = {
  Blank: { ...greenColorMeta, codeColor: theme.colors.typeSecondary },
  TRUE: greenColorMeta,
  FALSE: redColorMeta,
  Spreadsheet: blueColorMeta,

  LogicColumn: greenColorMeta,
  LogicRow: cyanColorMeta,

  Column: blueColorMeta,
  Row: blueColorMeta,

  Cell: purpleColorMeta,
  null: purpleColorMeta,

  Predicate: cyanColorMeta,
  Cst: cyanColorMeta,
  Date: cyanColorMeta,

  number: cyanColorMeta,

  Array: orangeColorMeta,
  Record: orangeColorMeta,

  Button: blueColorMeta,

  // TODO 1
  Variable: blueColorMeta,

  // TOOD 2
  Range: redColorMeta,
  Reference: redColorMeta,

  string: greenColorMeta,
  literal: defaultColorMeta,

  Function: blueColorMeta,
  FunctionName: blueColorMeta,

  Error: { ...redColorMeta, codeColor: theme.colors.errorDefault },

  Block: blueColorMeta,

  // Unknown
  Switch: defaultColorMeta,
  void: defaultColorMeta,
  any: defaultColorMeta,

  Pending: defaultColorMeta,
  Waiting: defaultColorMeta,
  NoPersist: defaultColorMeta
}

export const FORMULA_BORDERLESS_STYPES = mapValues(FORMULA_COLOR_METAS, ({ codeColor }) => css({ color: codeColor }))

export const FORMULA_STYLES = mapValues(
  FORMULA_COLOR_METAS,
  ({ color, selectedBorderColor, backgroundColor, hoveredBackgroundColor, pressedBackgroundColor }) =>
    css({
      color,
      backgroundColor,
      border: '1px solid',
      '&:hover': {
        color,
        borderColor: hoveredBackgroundColor,
        backgroundColor: hoveredBackgroundColor
      },
      '&:focus, &:active': {
        color,
        borderColor: pressedBackgroundColor,
        backgroundColor: pressedBackgroundColor
      },
      variants: {
        selected: {
          true: {
            borderColor: selectedBorderColor
          },
          false: {
            borderColor: backgroundColor
          }
        }
      }
    })
)

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
