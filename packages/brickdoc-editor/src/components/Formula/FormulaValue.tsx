import React from 'react'
import { resultToColorType, VariableDisplayData } from '@brickdoc/formula'
import './Formula.less'
import { FORMULA_COLORS, FORMULA_ICONS } from '../../helpers'
import { css, cx } from '@brickdoc/design-system'

export interface FormulaValueProps {
  displayData: VariableDisplayData
  display: string
  border?: boolean
}

export const FormulaValue: React.FC<FormulaValueProps> = ({
  border,
  display,
  displayData: { result, type },
  ...props
}) => {
  const colorType = resultToColorType(result)
  const { color, rgb, backgroundColor, hoverBackgroundColor, pressedBackgroundColor } = FORMULA_COLORS[colorType]
  const icon = FORMULA_ICONS[colorType]
  const hasBorder = type === 'normal' && border

  if (!hasBorder) {
    return (
      <span className="brickdoc-formula-borderless" style={{ color, fontFamily: 'Fira Code' }}>
        {display}
      </span>
    )
  }

  const formulaStyle = css({
    backgroundColor,
    '&:hover': {
      backgroundColor: hoverBackgroundColor
    },
    '&:focus, &:active': {
      backgroundColor: pressedBackgroundColor
    }
  })

  return (
    <span
      {...props}
      className={cx(formulaStyle(), 'brickdoc-formula-value')}
      style={{
        color,
        fontFamily: 'Fira Code',
        borderColor: `rgb(${rgb.join(',')}, 0.3)`
      }}>
      <span className="brickdoc-formula-value-icon">{icon}</span>
      <span className="brickdoc-formula-value-display">{display}</span>
    </span>
  )
}
