import React from 'react'
import { displayValue, resultToColorType, VariableResult } from '@brickdoc/formula'
import './FormulaMenu.less'
import { FORMULA_COLORS } from '../../helpers'
import { css, cx } from '@brickdoc/design-system'

export interface FormulaValueProps {
  t: VariableResult
  border?: boolean
}

export const FormulaValue: React.FC<FormulaValueProps> = ({ border, t: { variableValue, type } }) => {
  const { color, rgb, backgroundColor, hoverBackgroundColor, pressedBackgroundColor } =
    FORMULA_COLORS[resultToColorType(variableValue.result)]
  const hasBorder = type === 'normal' && border
  const text = displayValue(variableValue.result)

  if (!hasBorder) {
    return (
      <span className="brickdoc-formula-borderless" style={{ color, fontFamily: 'Fira Code' }}>
        {text}
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
      className={cx(formulaStyle(), 'brickdoc-formula')}
      style={{
        color,
        fontFamily: 'Fira Code',
        borderColor: `rgb(${rgb.join(',')}, 0.3)`
      }}>
      {text}
    </span>
  )
}
