import { FC, ReactElement } from 'react'
import { resultToColorType, VariableDisplayData, display } from '@mashcard/formula'
import { cx, Icon, Tooltip } from '@mashcard/design-system'
import { getFormulaContext, SelectedType } from '../../blockViews/FormulaView'
import { FORMULA_BORDERLESS_STYPES, FORMULA_ICONS, FORMULA_STYLES } from './color'
import * as Root from './Formula.style'
import { useEditorContext } from '../../../hooks'

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
  displayData: { result, type }
}) => {
  const { editor } = useEditorContext()
  const formulaContext = getFormulaContext(editor)

  const colorType = resultToColorType(result)
  const icon = FORMULA_ICONS[colorType]
  const hasBorder = type === 'normal' && border
  const displayResult = display(result, formulaContext!).result

  const formulaBorderlessStype = FORMULA_BORDERLESS_STYPES[colorType]()

  if (!hasBorder) {
    return <span className={cx(formulaBorderlessStype, 'mashcard-formula-borderless')}>{displayResult}</span>
  }

  const formulaStyle = FORMULA_STYLES[colorType]({ selected: !!selected })

  // eslint-disable-next-line no-nested-ternary
  const finalDisplay = result.type === 'boolean' ? (result.result ? '✓' : '✗') : displayResult

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

  const title = result.type === 'Error' ? `${name}: ${result.result.message}` : name

  return (
    <Tooltip title={title} destroyTooltipOnHide={true}>
      {data}
    </Tooltip>
  )
}
