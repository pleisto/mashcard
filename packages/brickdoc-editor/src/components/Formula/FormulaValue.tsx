import React from 'react'
import { resultToColorType, VariableDisplayData } from '@brickdoc/formula'
import './Formula.less'
import { FORMULA_COLORS, FORMULA_ICONS } from '../../helpers'
import { css, cx, Tooltip } from '@brickdoc/design-system'
import { SelectedType } from './useFormula'

export interface FormulaValueProps {
  displayData: VariableDisplayData
  display: string
  border?: boolean
  name?: string
  disablePopover?: boolean
  selected?: SelectedType
}

export const FormulaValue: React.FC<FormulaValueProps> = ({
  name,
  border,
  selected,
  display,
  disablePopover,
  displayData: { result, type },
  ...props
}) => {
  const colorType = resultToColorType(result)
  const { colorMain, colorSecond, color1, color2, color3 } = FORMULA_COLORS[colorType]
  const icon = FORMULA_ICONS[colorType]
  const hasBorder = type === 'normal' && border

  if (!hasBorder) {
    return (
      <span {...props} className="brickdoc-formula-borderless" style={{ color: colorMain, fontFamily: 'Fira Code' }}>
        {display}
      </span>
    )
  }

  const formulaStyle = css({
    color: colorMain,
    fontFamily: 'Fira Code',
    backgroundColor: color1,
    border: '1px solid',
    borderColor: selected ? colorSecond : color2,
    '&:hover': {
      color: colorSecond,
      borderColor: color3,
      backgroundColor: color2
    },
    '&:focus, &:active': {
      color: colorSecond,
      borderColor: color3,
      backgroundColor: color3
    }
  })

  // eslint-disable-next-line no-nested-ternary
  const finalDisplay = result.type === 'boolean' ? (result.result ? '✓' : '✗') : display

  const data = (
    <span {...props} className={cx(formulaStyle(), 'brickdoc-formula-value')}>
      <span className="brickdoc-formula-value-icon">{icon}</span>
      <span className="brickdoc-formula-value-display">{finalDisplay}</span>
    </span>
  )

  if (disablePopover ?? !name) {
    return data
  }

  return (
    <Tooltip title={name} destroyTooltipOnHide={true}>
      {data}
    </Tooltip>
  )
}
