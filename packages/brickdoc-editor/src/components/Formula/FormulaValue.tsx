import React from 'react'
import { resultToColorType, VariableDisplayData } from '@brickdoc/formula'
import './Formula.less'
import { FORMULA_COLORS, FORMULA_ICONS } from '../../helpers'
import { css, cx, Icon, Tooltip } from '@brickdoc/design-system'
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
  displayData: { result, type }
}) => {
  const colorType = resultToColorType(result)
  const { colorMain, colorSecond, color1, color2, color3 } = FORMULA_COLORS[colorType]
  const icon = FORMULA_ICONS[colorType]
  const hasBorder = type === 'normal' && border

  if (!hasBorder) {
    return (
      <span className="brickdoc-formula-borderless" style={{ color: colorMain, fontFamily: 'Fira Code' }}>
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

  let data: React.ReactElement

  switch (result.type) {
    case 'Error':
      data = (
        <span className={cx(formulaStyle(), 'brickdoc-formula-error')}>
          <Icon.Formula className="brickdoc-formula-error-icon" />
        </span>
      )
      break
    case 'Pending':
      data = (
        <span className={cx(formulaStyle(), 'brickdoc-formula-pending')}>
          <Icon.Formula className="brickdoc-formula-pending-icon" />
        </span>
      )
      break
    default:
      data = (
        <span className={cx(formulaStyle(), 'brickdoc-formula-normal')}>
          <span className="brickdoc-formula-normal-icon">{icon}</span>
          <span className="brickdoc-formula-normal-display">{finalDisplay}</span>
        </span>
      )
      break
  }

  if (disablePopover ?? !name) {
    return data
  }

  return (
    <Tooltip title={name} destroyTooltipOnHide={true}>
      {data}
    </Tooltip>
  )
}
