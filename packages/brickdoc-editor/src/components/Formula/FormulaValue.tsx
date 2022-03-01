import React from 'react'
import { resultToColorType, VariableDisplayData } from '@brickdoc/formula'
import './FormulaBlockRender.less'
import { FORMULA_COLORS } from '../../helpers'
import { css, cx } from '@brickdoc/design-system'

export interface FormulaValueProps {
  displayData: VariableDisplayData
  display: string
  border?: boolean
}

export const FormulaValue: React.FC<FormulaValueProps> = ({ border, display, displayData: { result, type } }) => {
  const { color, rgb, backgroundColor, hoverBackgroundColor, pressedBackgroundColor } =
    FORMULA_COLORS[resultToColorType(result)]
  const hasBorder = type === 'normal' && border
  // const text = displayValue(result, pageId)

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
      className={cx(formulaStyle(), 'brickdoc-formula')}
      style={{
        color,
        fontFamily: 'Fira Code',
        borderColor: `rgb(${rgb.join(',')}, 0.3)`
      }}>
      {display}
    </span>
  )
}
