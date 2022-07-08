import { FC, ReactElement } from 'react'
import { resultToColorType, VariableDisplayData } from '@mashcard/formula'
import { cx, Icon, Tooltip } from '@mashcard/design-system'
import { SelectedType } from '../../blockViews/FormulaView'
import { FORMULA_COLOR_METAS, FORMULA_ICONS, FORMULA_STYLES } from './color'
import * as Root from './Formula.style'

export interface FormulaValueProps {
  displayData: VariableDisplayData
  border?: boolean
  name?: string
  disablePopover?: boolean
  selected?: SelectedType
}

export const FormulaValue: FC<FormulaValueProps> = ({
  name,
  border,
  selected,
  disablePopover,
  displayData: { result: result, display, type }
}) => {
  const colorType = resultToColorType(result)
  const { colorCode } = FORMULA_COLOR_METAS[colorType]
  const icon = FORMULA_ICONS[colorType]
  const hasBorder = type === 'normal' && border

  if (!hasBorder) {
    return (
      <span className="mashcard-formula-borderless" style={{ color: colorCode }}>
        {display.result}
      </span>
    )
  }

  const formulaStyle = FORMULA_STYLES[colorType]({ selected: !!selected })

  // eslint-disable-next-line no-nested-ternary
  const finalDisplay = result.type === 'boolean' ? (result.result ? '✓' : '✗') : display.result

  let data: ReactElement

  switch (result.type) {
    case 'Error':
      data = (
        <span className={cx(formulaStyle, Root.MashcardFormulaError)}>
          <Icon.Formula className="mashcard-formula-error-icon" />
        </span>
      )
      break
    case 'Waiting':
    case 'Pending':
      data = (
        <span className={cx(formulaStyle, Root.MashcardFormulaPending)}>
          <Icon.Formula className="mashcard-formula-pending-icon" />
        </span>
      )
      break
    default:
      data = (
        <span className={cx(formulaStyle, Root.MashcardFormulaNormal)}>
          <span className="mashcard-formula-normal-icon">{icon}</span>
          <span className="mashcard-formula-normal-display">{finalDisplay}</span>
        </span>
      )
      break
  }

  if (disablePopover ?? !name) {
    return data
  }

  const title = result.type === 'Error' ? `${name}: ${result.result}` : name

  return (
    <Tooltip title={title} destroyTooltipOnHide={true}>
      {data}
    </Tooltip>
  )
}
